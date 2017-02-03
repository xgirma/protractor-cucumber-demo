module.exports = {
  imgLogo: element(by.id('header-logo')),
  lblHome: element(by.css('#primary-header-home > span')),
  btnTabs: element(by.css('.tabs.cf.col')),

  isLogoDisplayed: function () {
    var e = this.imgLogo
    return e.isDisplayed()
  },

  isHomeTabSelected: function () {
    var e = this.lblHome
    return e.getText()
  },

  isSearchTabShown: function () {
    var e = this.btnTabs
    return e.isDisplayed()
  }
}
