const { Given, When, Then, Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");
const { Page } = require("playwright");
const locators = require('../locators/locators');
const testData = require('../data/testData')

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
    await page.locator(locators.instagramLink).waitFor()
    await page.locator(locators.instagramLink).click()
  });

  Given('User assert homepage title.', async function () {
    const pageTitle = await page.title();
    console.log(`Page title: ${pageTitle}`);
  });

// TC: 002

  Given('User navigates to the testautomationpractice form page', async function () {
    await page.goto('https://testautomationpractice.blogspot.com/'); // Replace with the actual URL
  });

  Given('User will enter name', async function () {
    // Fill in the name field
    await page.fill(locators.nameInput, testData.validUser.name);
  });

  Given('User will enter email', async function () {
    // Fill in the email field
    await page.fill(locators.emailInput, testData.validUser.email);
  });
After(async function () {

    await browser.close();

})