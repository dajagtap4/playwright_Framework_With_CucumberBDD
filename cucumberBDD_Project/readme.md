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

  Scenario: "Verify Product We"b Testing
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


run `all tests` with below command
```
 npm test
 ```
We can run a ***particular scenario*** by providing a ___substring___ of the scenario's name. For example, to run the `"Verify Product We"` scenario:

```
npx cucumber-js --name "Verify Product We"
```

 #### Running a Scenario by Tag
 Tags are defined by using @ before a keyword.

 ```
 @Login
Scenario: Valid login with correct credentials
  Given I have entered valid credentials
  When I press login
  Then I should see the dashboard

@Login
Scenario: Invalid login with incorrect credentials
  Given I have entered invalid credentials
  When I press login
  Then I should see an error message

@ForgotPassword
Scenario: User requests a password reset
  Given I click on "Forgot Password"
  Then I should be redirected to the password reset page
```

To run scenarios with a specific tag

```
npx cucumber-js --tags "@Login"
```

Running a Scenario with Multiple Tags
You can also use logical operators (and, or, not) to combine multiple tags
```
npx cucumber-js --tags "@Login" and "@ForgotPassword"
```

To exclude scenarios with a specific tag (e.g., excluding @ForgotPassword):

```
npx cucumber-js --tags "not @ForgotPassword"
```


---


> ### 1. Install java 

To Install java [Click Here](https://www.oracle.com/in/java/technologies/downloads/#jdk22-windows)


```
select windows as OS 

click link behind x64 Installer

open downloaded file > double click on it > Next > Close
```
`Now we have to set path in env variable.`
```
select path from file location upto bin as below
C:\Program Files\Java\jdk-22\bin

Goto env variable > system variable > path > add path.
```
`Check java is installed or not`
```
Open cmd > java --version 
         > javac --version
```
---
>### 2. Vs Code 

[Click here](https://code.visualstudio.com/download) for vs code installation

---
>### 3. node js

[click here](https://nodejs.org/en/download) for node js installation

Playwright requires Node.js version 12 or above.
To check your Node.js version
```
node -v
npm -v
```

---

We have installed all Pre Requisites, we can start with playwright framework, 


1. Create folder `Playwright Framework` at any place lets say desktop,

2. Open Vs code, 

    - File > Open folder > select `Playwright Framework`

    - click `extensions` (side vertical bar) >  
    install `Playwright Test for VSCode`,

    - Terminal > New Terminal > Hit below first command to create project
    ```
   npm init playwright@latest


   ```
---
## API Testing Playwright setup

#### Create `backend/tests/api.spec.ts` in project

`api.spec.ts`

```
import {expect, test} from '@playwright/test'

var userid;

test.describe('REST API Tests with ReqRes', () => {

test('apiGet',async ({request}) => {
    const response = await request.get('https://reqres.in/api/users?page=2')
    console.log(await response.json())
    expect(response.status()).toBe(200)
});

test('apiPost',async ({request}) => {
    const response = await request.post('https://reqres.in/api/users',

                                         {
                                            data:{"name":"Deepak","job":"QA" },
                                            headers:{"Accept":"application/json "}
                                        });
    console.log(await response.json())
    expect(response.status()).toBe(201)   
    
    var ser = await response.json();
    userid=ser.id
})

test('apiPut',async ({request}) => {
    const response = await request.put('https://reqres.in/api/users/'+userid,

        {
            data:{"name":"Deepak","job":"Billionaire" },
            headers:{"Accept":"application/json "}
        });

    console.log(await response.json())
    expect(response.status()).toBe(200)   

})

    test('apiDelete',async ({request}) => {
     await request.delete('https://reqres.in/api/users/'+userid)

    })

});
```

### make below chnages in `playwright.config.js` file

```
module.exports = defineConfig({
  testDir: '.',
```

Run api test with below command 

Below command will ***excecute all tests*** within `api.spec.ts` file

```
npx playwright test ./backend/tests/api.spec.ts
``` 

Excecute specific test within file

```
 npx playwright test -g "apiGet"
```

Excecute all tests within project( `api`,`UI` )

```
npx playwright tests
```
---

### Load Testing Using k6

k6 is a modern load-testing tool designed for API and performance testing.

**Key Features:**

Written in JavaScript.
Highly performant and optimized for scalability.
Easy integration with CI/CD pipelines.
Supports complex scenarios (e.g., user authentication, data-driven testing).

> ### Install k6

Official website: [K6 Website](https://k6.io/)

Install K6 Using Chocolatey, open cmd and hit below coomand 

```
 choco install k6 
```
if they are asking to install chocolatey, Run the following command to install Chocolatey

```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

```

Verify Installation: 

```
k6 version
```
create seperate folder name k6, in k6 create file k6get.js

` k6get.js `

```
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 }, // Ramp-up to 10 users
    { duration: '1m', target: 10 },  // Stay at 10 users
    { duration: '10s', target: 0 },  // Ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}

```

to run above code use below command 

```
k6 run k6get.js
```
