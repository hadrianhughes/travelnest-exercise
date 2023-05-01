import axios from 'axios';

type PropertyInfo = {
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
};

const scrape = async () => {
  try {
    const response = await axios.get('https://www.airbnb.co.uk/rooms/50633275');
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};

const getAirbnbID = (): string => {
  const flagIdx = process.argv.indexOf('--id');
  const id = process.argv[flagIdx + 1];

  if (flagIdx === -1 || !id) {
    throw new Error('You must provide an Airbnb property ID.');
  }

  return id;
};

console.log(getAirbnbID());
