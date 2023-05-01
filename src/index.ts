import { getPropertyInfo, PropertyInfo } from './dom';

const getAirbnbID = (): string => {
  const flagIdx = process.argv.indexOf('--id');
  const id = process.argv[flagIdx + 1];

  if (flagIdx === -1 || !id) {
    throw new Error('You must provide an Airbnb property ID.');
  }

  return id;
};

const printInformation = (info: PropertyInfo) => {
  const name = `Name:\t\t${info.name}`;
  const type = `Type:\t\t${info.type}`;
  const bedrooms = `Bedrooms:\t${info.bedrooms}`;
  const bathrooms = `Bathrooms:\t${info.bathrooms}`;
  const amenities = `Amenities:\t${info.amenities.map(a => `${a}`).join('\n\t\t')}`;

  const output = [name, type, bedrooms, bathrooms, amenities].join('\n');
  console.info(output);
};

const run = async () => {
  const id = getAirbnbID();
  console.info(`Scraping information for Airbnb ID: ${id}...\n`);

  const info = await getPropertyInfo(id);
  printInformation(info);
};

run();
