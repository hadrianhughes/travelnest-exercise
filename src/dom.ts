import puppeteer, { ElementHandle, Page } from 'puppeteer';

const AIRBNB_URL = 'https://www.airbnb.co.uk/rooms/';

const getName = async (node: ElementHandle): Promise<string> => node.evaluate(el => el.textContent);

const getType = async (node: ElementHandle): Promise<string | null> => {
  const typeNode = await node.waitForSelector('h2');
  const text = await typeNode?.evaluate(el => el.textContent);

  return text;
};

const getBedrooms = async (node: ElementHandle): Promise<number | null> => {
  const detailsNode =  await node.waitForSelector('ol');
  const detailsText = await detailsNode?.evaluate(el => el.textContent);

  const match = detailsText.match(/(\d+) bedrooms?/);
  if (!match) {
    return null;
  }

  return parseInt(match[1]);
};

export const getPropertyInfo = async (id: string) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(AIRBNB_URL + id);
  await page.setViewport({ width: 1080, height: 1024 });

  const [nameNode, overviewNode, amenitiesNode] = await Promise.all([
    page.waitForSelector('[data-section-id="TITLE_DEFAULT"] h1'),
    page.waitForSelector('[data-section-id="OVERVIEW_DEFAULT"]'),
    page.waitForSelector('[data-section-id="AMENITIES_DEFAULT"]'),
  ]);

  if (!(nameNode && overviewNode && amenitiesNode)) {
    throw new Error(`could not find complete details for property: ${id}`);
  }

  const [name, type, bedrooms] = await Promise.all([getName(nameNode), getType(overviewNode), getBedrooms(overviewNode)]);

  console.log(name, type, bedrooms);
};
