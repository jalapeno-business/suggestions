const puppeteer = require('puppeteer');

const pageUrl = 'http://localhost:1177/';

let page;
let browser;
const width = 1280;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});


describe('Check the divs', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });
  });

  test('assert that a div named container exists', async () => {
    const suggestions = await page.$eval('.Suggestions-Container', el => (!!el));
    expect(suggestions).toBe(true);
  });
});
