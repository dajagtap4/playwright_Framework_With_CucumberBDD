# Step-by-Step Guide to Set up Playwright with Cucumber BDD

> This guide will help you set up `Playwright with Cucumber` to run automated browser tests.

## Video Link
[Playwright Cucumber Guide](https://www.browserstack.com/guide/playwright-cucumber)

## Prerequisites
Ensure that you have `Node.js` installed on your system.

## Step 1: Initialize Playwright Project

Run the following command to initialize the Playwright project:

`npm init playwright@latest`

#### Install Cucumber-
`npm i @cucumber/cucumber`

Create a `cucumber.json` file in the root of your Project folder,

```

{
    "default": {
        "formatOptions":{
            "snippetInterface":"async-await"
        },

        "paths":[
            "src/test/feature/*.feature"
        ],
      
        "dryRun":false,
        "require":[
                "src/test/steps/*.js"
            ]
        }
    }

```
`package.json`
```
{
  "name": "cucumber-bdd",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "build": "tsc",
    "test": "cucumber-js --import src/test/steps/**/*.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "description": "",
  "devDependencies": {
    "@playwright/test": "^1.49.1",
    "@types/node": "^22.10.2"
  },
  "dependencies": {
    "@cucumber/cucumber": "^11.1.1",
    "ts-node": "^10.9.2",
    "typescript": "^5.7.2"
  }
}

```
`tsconfig.json` this is for typescript 
```
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "strict": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}

```
```
src/test
>feature
	> homepage.feature
>steps
	> homepage.step.js

```

`homepage.feature`
```
Feature: Homepage Functionality

  Scenario: Verify Product Web Testing
    Given User navigates to the Browserstack Homepage
    When User clicks on Product Menu
    Then It should show Web Testing Product

  Scenario: Verify Pricing Product Lists
    Given User Navigates to Browserstack Homepage
    When User clicks on Pricing Menu

```
`homepage.step.js`
```
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

Given("User navigates to the Browserstack Homepage", async () => {

    await page.goto("https://www.browserstack.com/");

});

When('User clicks on Product Menu', async function () {

    await page.locator('button[aria-label="Products"]').waitFor();

    await page.locator('button[aria-label="Products"]').click();

});

Then('It should show Web Testing Product', async function () {

    await page.locator('div[aria-label="Products"] button[title="Web Testing"]').waitFor();

    expect(await page.locator('div[aria-label="Products"] button[title="Web Testing"] span').isVisible()).toBeTruthy()

});

Given('User Navigates to Browserstack Homepage', async function () {

    await page.goto("https://www.browserstack.com/");

});

When('User clicks on Pricing Menu', async function () {

    await page.locator('a[title="Pricing"]').click();

});


After(async function () {

    await browser.close();

})

```


run test with below command
```
 npm test
 ```
