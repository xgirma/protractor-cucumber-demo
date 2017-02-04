# Protractor and Cucumber Integration Demo

[Protractor](http://www.protractortest.org/#/) is a testing framework that enables interacting with an application on a web browser, in the same way a real user would interact.
 
[Cucumber](https://cucumber.io/) is a framework for writing high-level specifications of an application's functionality using plain text. 
It can be written and understood by non-technical people involved in a project. 
Cucumber’s language, [Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin), lets you describe software’s behaviour without detailing implementation details.

This demo shows how these frameworks can be tied together using the [protractor-cucumber-framework](https://www.npmjs.com/package/protractor-cucumber-framework).
The `protractor-cucumber-framework` was originally part of angular/protractor project and is now a separate npm module to decouple [cucumber.js](https://github.com/cucumber/cucumber-js).

## 0. Setup
Setup should be simple. If you do not have Nodejs installed in your machine, install it from [here](https://nodejs.org/en/). 
There is no need to install node modules globally for this demo. All modules configured to be accessed from the `/node_modules` folder under your project-root. 
The only requirement is to install required modules and update webdriver as shown below. And you can run the test. 

From your project-root directory enter

    $ npm install
    $ npm run wd
    $ npm run test

## 1. Configuration
The settings for a Protractor test is defined using a configuration file, `config/config.js`. 
The complete configuration options of Protractor for [AngularJS](https://angularjs.org/) is [here](https://github.com/angular/protractor/blob/fv1.3.0/docs/referenceConf.js) and for [Angular](https://angular.io/) 2 is [here](https://github.com/angular/protractor/blob/master/lib/config.ts).
In this demo, we will only focus on three options, that are required for the integration.
 
#### specs
The `Specs` option defines *spec patterns* relative to the location of the configuration script. Here, we define .feature files consists of features, for example `/features/home.feature`.

```js
exports.config = {
  // ...
  specs: ['./../features/*.feature']
  }
```

#### framework
The `framework` options defines which test framework to use, such as Jasmine, Cucumber, or Mocha.
```js
exports.config = {
  // ...
  framework: 'custom',
  frameworkPath : require.resolve('protractor-cucumber-framework')
}
```

#### cucumber options
Finally, the `cucumberOpts` defines the configuration of the Cucumber.js itself.
 
```js
exports.config = {
  // ...
  cucumberOpts: {
    require: '../step_definitions/*.steps.js',
    tags: '@search',
    format: 'pretty'
  }
}
```

## 2. Feature 
The next step is writing `.feature` file Gherkin's documentation. More on how to write a feature file is found [here](https://github.com/cucumber/cucumber/wiki/Feature-Introduction). 

```feature
Feature: Searching flight
  As a user of Expedia.com
  I should search for flight from the landing page

  @search
  Scenario: Landing at the Expedia.com home
    Given That I entered Expedia.com
    Then I should should see Expedia.com logo

  @search
  Scenario: Getting multiple search tabs
    Given That I am at the home page
    Then I should have search tabs
```

Once writing `.feature` is completed, run the test using `npm run test`. And you should get an output as shown below

````
1) Scenario: Landing at the Expedia.com home - features/home.feature:6
   Step: Given That I entered Expedia.com - features/home.feature:7
   Message:
     Undefined. Implement with the following snippet:

       this.Given(/^That I entered Expedia\.com$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });

2) Scenario: Landing at the Expedia.com home - features/home.feature:6
   Step: Then I should should see Expedia.com logo - features/home.feature:8
   Message:
     Undefined. Implement with the following snippet:

       this.Then(/^I should should see Expedia\.com logo$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });

3) Scenario: Getting multiple search tabs - features/home.feature:11
   Step: Given That I am at the home page - features/home.feature:12
   Message:
     Undefined. Implement with the following snippet:

       this.Given(/^That I am at the home page$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });

4) Scenario: Getting multiple search tabs - features/home.feature:11
   Step: Then I should have search tabs - features/home.feature:13
   Message:
     Undefined. Implement with the following snippet:

       this.Then(/^I should have search tabs$/, function (callback) {
         // Write code here that turns the phrase above into concrete actions
         callback(null, 'pending');
       });

2 scenarios (2 undefined)
4 steps (4 undefined)
````

## 3. Step Definitions
Step definitions is where Gherkin's *documentation* turned into an actual *automated tests*. 
Copy the four steps from the above output, and add it in to your step definition spec, `step_defination/home.steps.js`.

The rest of the modification should be done as any Protractor test would, as shown below. 
[chaijs](http://chaijs.com/api/assert/) is used for assertion in this demo. You can use any other assertion library of your choice.

```js
var chai = require('chai')
var expect = chai.expect
var chaiAsPromised = require('chai-as-promised')
var home = require('./../page_objects/home.page.js')

chai.use(chaiAsPromised)

module.exports = function () {
  this.Given(/^That I entered Expedia\.com$/, function (callback) {
    browser.get('https://www.expedia.com/')
    callback()
  })

  this.Then(/^I should should see Expedia\.com logo$/, function (callback) {
    expect(home.isLogoDisplayed()).to.eventually.equal(true)
    callback()
  })

  this.Given(/^That I am at the home page$/, function (callback) {
    expect(home.isHomeTabSelected()).to.eventually.equal('Currently selected')
    callback()
  })

  this.Then(/^I should have search tabs$/, function (callback) {
    expect(home.isSearchTabShown()).to.eventually.equal(true)
    callback()
  })
}
```
Now running the test using `npm run test`, should open Chrome browser load Expedia.com home page and test few things :) At the end of the output you should see this


```
[18:04:26] I/launcher - Running 1 instances of WebDriver
[18:04:26] I/direct - Using ChromeDriver directly...
Feature: Searching flight

  As a user of Expedia.com
  I should search for flight from the landing page

  @search
  Scenario: Landing at the Expedia.com home
    Given That I entered Expedia.com
    Then I should should see Expedia.com logo

  @search
  Scenario: Getting multiple search tabs
    Given That I am at the home page
    Then I should have search tabs

2 scenarios (2 passed)
4 steps (4 passed)
0m00.005s

```
