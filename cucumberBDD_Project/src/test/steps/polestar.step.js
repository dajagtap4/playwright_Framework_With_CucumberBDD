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

  await page.goto(testData.testURL);

});
//------------------------------------------------------------------

// TC: 001

// User should select polestar2 option from top navigation bar
Given('User should select polestar2 option from top navigation bar', async function () {
  await page.getByRole('button', { name: 'Polestar 2' }).click();
});

// User should select design and order option
Given('User should select design and order option', async function () {
  await page.click(locators.designandOrder); // Make sure this XPath is correct
});

// User should select Long_range_Dual option
Given('User should select Long_range_Dual option', async function () {
  await page.click(locators.longRangeDuelOption);
});

// User should select Exteriör
Given('User Should select Exteriör', async function () {
  await page.click(locators.exteriors);
});

// User should select Interiör
Given('User Should select Interiör', async function () {
  await page.click(locators.interiors);
});

// User should select Fälgar
Given('User Should select Fälgar', async function () {
  await page.click(locators.falgar);
});

// Select submit button
Given('Select submit button', async function () {
  await page.getByRole('button', { name: 'Fortsätt' }).click(); // Make sure this selector is correct
});

//------------------------------------------------------------------

// TC:002

Given('User should click on discover button', async function () {
  await page.locator(locators.discover).waitFor();
  await page.click(locators.discover);
});

Given('User should click on book test drive button', async function () {
  await page.locator(locators.booktestdrive).waitFor();
  await page.click(locators.booktestdrive);
});

Given('User should click on subscribe button', async function () {
  await page.locator(locators.Prenumerera).waitFor();
  await page.click(locators.Prenumerera);
});

Given('User should eneter firstname in form', async function () {
  await page.locator(locators.firstname).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator(locators.firstname).fill(testData.yourDetailsForm.firstname);
});

Given('User should eneter lastname in form', async function () {
  await page.locator(locators.lastname).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator(locators.lastname).fill(testData.yourDetailsForm.lastname);
});

Given('User should eneter email in form', async function () {
  await page.locator(locators.lastname).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator(locators.lastname).fill(testData.yourDetailsForm.lastname);
});

Given('User should eneter pincode in form', async function () {
  await page.locator(locators.pincode).waitFor({ state: 'visible', timeout: 30000 });
  await page.locator(locators.pincode).fill(testData.yourDetailsForm.pincode);
});

Given('User should select car option from dropDownCarsYouAreInterestedIn', async function () {  

   Given('User should select car option from dropDownCarsYouAreInterestedIn', async function () {
    // Wait for the dropdown to be visible (ensure it's open before interacting)
    const dropdownLocator = await page.locator(locators.dropDownCarsYouAreInterestedIn);
    await dropdownLocator.waitFor({ state: 'visible', timeout: 30000 });
  
    // Click to open the dropdown
    await dropdownLocator.click();
  
    // Now wait for the "Polestar 2" option to be visible
    const polestar2Option = page.locator(locators.polestar2DropdownOption); // Using text selector to identify the option
    await polestar2Option.waitFor({ state: 'visible', timeout: 30000 });  // Ensure the option is visible before clicking
  
    // Click the "Polestar 2" option
    await polestar2Option.click();
  
    await dropdownLocator.click();
   });

});

Given('User should select checkbox', async function () {
  await page.locator(locators.checkbox).waitFor({ state: 'visible', timeout: 30000 });
  await page.click(locators.checkbox);
});

Given('User should select submit form', async function () {
  await page.locator(locators.submit).waitFor({ state: 'visible', timeout: 30000 });
  await page.click(locators.submit);
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

After(async function () {
  await browser.close(); 
})