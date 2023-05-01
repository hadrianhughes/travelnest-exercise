import { getPropertyInfo, PropertyInfo } from './dom';
import { getAirbnbID, printInformation } from './io';

const run = async () => {
  const id = getAirbnbID();
  console.info(`Scraping information for Airbnb ID: ${id}...\n`);

  const info = await getPropertyInfo(id);
  printInformation(info);
};

run();
