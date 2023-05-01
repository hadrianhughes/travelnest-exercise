# Airbnb Scraper

A Typescript command line tool for scraping key information from properties on Airbnb.

This is for a pre-interview exercise for Travelnest.


## Usage

To run this, you must be using Node.js **lts-gallium or above**.

1. Install dependencies: `npm i`
2. Build from source: `npm run build`
3. Run the bundled output: `node ./build/index.js --id {airbnb id}`

**Example:** `node ./build/index.js --id 20669368`


## Still to do

- [x] Scrape web page of static URLs
- [x] Pretty print information into the terminal
- [x] Enable passing an Airbnb ID as an argument
- [x] Handle cases where the page is not a property
- [ ] Add unit tests
- [ ] Improve dev experience (set up a watch task using nodemon)
- [ ] Add validation for the format of the ID argument
- [ ] Incorporate the caolan/async library for better clarity
