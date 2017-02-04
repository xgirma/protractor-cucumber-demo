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
