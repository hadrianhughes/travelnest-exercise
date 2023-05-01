import axios, { AxiosError } from 'axios';

const AIRBNB_URL = 'https://www.airbnb.co.uk/rooms/';

export const getAirbnbID = (): string => {
  const flagIdx = process.argv.indexOf('--id');
  const id = process.argv[flagIdx + 1];

  if (flagIdx === -1 || !id) {
    throw new Error('You must provide an Airbnb property ID.');
  }

  return id;
};
