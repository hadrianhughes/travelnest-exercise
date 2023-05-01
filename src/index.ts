import { getPropertyInfo } from './dom';

const getAirbnbID = (): string => {
  const flagIdx = process.argv.indexOf('--id');
  const id = process.argv[flagIdx + 1];

  if (flagIdx === -1 || !id) {
    throw new Error('You must provide an Airbnb property ID.');
  }

  return id;
};

const run = async () => {
  const id = getAirbnbID();
  const info = await getPropertyInfo(id);
  console.log(info);
};

run();
