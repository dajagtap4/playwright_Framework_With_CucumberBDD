const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");

const { chromium, expect } = require("@playwright/test");

const { Page } = require("playwright");

setDefaultTimeout(60 * 1000);

let page, browser;
Before(async function () {

    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();

    page = await context.newPage();

});

Given("User navigates to the polestar Homepage", async () => {

    await page.goto("https://www.polestar.com/se/");

});

Given('User will accep all', async function () {
 
    await page.getByRole('button', { name: 'Accept all' }).waitFor();
    await page.getByRole('button', { name: 'Accept all' }).click();

  });

  Given('User click on instagram link', async function () {
    await page.locator("//a[text()='Instagram']").waitFor()
    await page.locator("//a[text()='Instagram']").click()
  });

  Given('User assert homepage title', async function () {
    const pageTitle = await page.title();
    console.log(`Page title: ${pageTitle}`);
  });

After(async function () {

    await browser.close();

})
