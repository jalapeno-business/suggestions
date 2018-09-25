const puppeteer = require('puppeteer');

const pageUrl = 'http://localhost:1170/';

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

  test('assert that a div named zagat-suggestions exists to render to', async () => {
    const suggestions = await page.$eval('#zagat-suggestions', el => (!!el));
    expect(suggestions).toBe(true);
  });
  test('assert that a div named Suggestions-Container exists', async () => {
    const suggestions = await page.$eval('#Suggestions-Container', el => (!!el));
    expect(suggestions).toBe(true);
  });
  test('assert that a div named suggestion-photo exists', async () => {
    const suggestions = await page.$eval('.suggestion-photo', el => (!!el));
    expect(suggestions).toBe(true);
  });
  test('assert that a div named suggestion-info exists', async () => {
    const suggestions = await page.$eval('.suggestion-info', el => (!!el));
    expect(suggestions).toBe(true);
  });
});

describe('check the buttons', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, { waitUntil: 'networkidle2' });
  });
})
