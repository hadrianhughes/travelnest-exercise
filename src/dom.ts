import puppeteer, { ElementHandle, Page } from 'puppeteer';

export type PropertyInfo = {
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

const AIRBNB_URL = 'https://www.airbnb.co.uk/rooms/';

const getName = async (node: ElementHandle): Promise<string> => node.evaluate(el => el.textContent);

const getType = async (node: ElementHandle): Promise<string | null> => {
  const typeNode = await node.waitForSelector('h2');
  const text = await typeNode?.evaluate(el => el.textContent);
  if (!text) {
    return null;
  }

  const type = text.match(/^(.+)[\s\t]hosted[\s\t]by[\s\t].+$/);
  return type ? type[1] : text;
};

const getBedroomsAndBathrooms = async (node: ElementHandle): Promise<{
  bedrooms: number | null;
  bathrooms: number | null;
}> => {
  const detailsNode =  await node.waitForSelector('ol');
  const detailsText = await detailsNode?.evaluate(el => el.textContent);

  const bedrooms = detailsText.match(/(\d+) bedrooms?/);
  const bathrooms = detailsText.match(/(\d+) bathrooms?/);

  return {
    bedrooms: bedrooms ? parseInt(bedrooms[1]) : null,
    bathrooms: bathrooms ? parseInt(bathrooms[1]) : null,
  };
};

const getAmenities = async (page: Page): Promise<string[] | null> => {
  const amenitiesNode = await page.waitForSelector('[data-section-id="AMENITIES_DEFAULT"]');
  if (!amenitiesNode) {
    return null;
  }

  const showAllButton = await amenitiesNode?.waitForSelector('button');
  if (!showAllButton) {
    return null;
  }

  await showAllButton.click();

  const dialogNode = await page.waitForSelector('[data-testid="modal-container"] section div:last-child');
  const dialogDivs = await dialogNode?.$$('& > div:not(:last-child)');
  const amenitiesEls = dialogDivs ? await Promise.all(dialogDivs?.flatMap(div => div.$$('& > div:not(:first-child)'))) : null;
  const amenities = amenitiesEls ? await Promise.all(amenitiesEls.flat().map(a => a.evaluate(el => el.textContent))) : null;

  return amenities;
};

export const getPropertyInfo = async (id: string): Promise<PropertyInfo> => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(AIRBNB_URL + id);
  await page.setViewport({ width: 1080, height: 1024 });

  const [nameNode, overviewNode] = await Promise.all([
    page.waitForSelector('[data-section-id="TITLE_DEFAULT"] h1'),
    page.waitForSelector('[data-section-id="OVERVIEW_DEFAULT"]'),
  ]);

  if (!(nameNode && overviewNode)) {
    throw new Error(`could not find complete details for property: ${id}`);
  }

  const [name, type, { bedrooms, bathrooms }, amenities] = await Promise.all([
    getName(nameNode),
    getType(overviewNode),
    getBedroomsAndBathrooms(overviewNode),
    getAmenities(page),
  ]);

  if (!(type && bedrooms && bathrooms && amenities)) {
    throw new Error(`could not find complete details for property: ${id}`);
  }

  await browser.close();

  return {
    name,
    type,
    bedrooms,
    bathrooms,
    amenities,
  };
};
