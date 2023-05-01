import { getPropertyInfo } from './dom';

type PropertyInfo = {
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

const getAirbnbID = (): string => {
  const flagIdx = process.argv.indexOf('--id');
  const id = process.argv[flagIdx + 1];

  if (flagIdx === -1 || !id) {
    throw new Error('You must provide an Airbnb property ID.');
  }

  return id;
};

const id = getAirbnbID();
getPropertyInfo(id);
