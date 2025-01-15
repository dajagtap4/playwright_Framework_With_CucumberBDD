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

//------------------------------------------------------------------

Given('User should handle popup window by selecting accep all', async function ( ) {
  await page.getByRole('button', { name: 'Accept all' }).waitFor();
 await page.getByRole('button', { name: 'Accept all' }).click();
});

Given("User navigates to the polestar Homepage", async () => {

  await page.goto("https://www.polestar.com/se/");

});
//------------------------------------------------------------------

// TC: 001

// User should select polestar2 option from top navigation bar
Given('User should select polestar2 option from top navigation bar', async function () {
  await page.getByRole('button', { name: 'Polestar 2' }).click();
});

// User should select design and order option
Given('User should select design and order option', async function () {
  await page.click("//*[@id='SXae3TdtSNq9AiI_PwMVAg']"); // Make sure this XPath is correct
});

// User should select Long_range_Dual option
Given('User should select Long_range_Dual option', async function () {
  await page.click("//*[@id='section-engine']/div[5]/button[3]/div/span[1]");
});

// User should select Exteriör
Given('User Should select Exteriör', async function () {
  await page.click("//*[@id='section-exterior']/div[4]/div/div/div[2]/div/div/button/div[1]/div[1]/div/img");
});

// User should select Interiör
Given('User Should select Interiör', async function () {
  await page.click("//*[@id='section-interior']/div[4]/div[3]/div[3]/div[2]/div/div/button/div[1]/div[1]/div/img");
});

// User should select Fälgar
Given('User Should select Fälgar', async function () {
  await page.click("//*[@id='section-wheels']/div[2]/div[2]/div[2]/div[1]/div[2]/div/button/div[1]");
});

// Select submit button
Given('Select submit button', async function () {
  await page.getByRole('button', { name: 'Fortsätt' }).click(); // Make sure this selector is correct
});

//------------------------------------------------------------------

// TC:003

  Given('User click on instagram link', async function () {
    await page.locator(locators.instagramLink).waitFor()
    await page.locator(locators.instagramLink).click()
  });

  Given('User assert homepage title.', async function () {
    const pageTitle = await page.title();
    //console.log(`Page title: ${pageTitle}`);
    
    await expect(page).toHaveTitle("Polestar – Elbilar | Polestar Sverige");
    
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