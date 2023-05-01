import { getAirbnbID } from './io';

type PropertyInfo = {
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};


const id = getAirbnbID();
