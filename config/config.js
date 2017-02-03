exports.config = {

  directConnect: true,

  specs: [
    './../features/*.feature'
  ],

  capabilities: {
    browserName: 'chrome'
  },

  maxSessions: 1,

  onPrepare: function () {
    browser.ignoreSynchronization = true
  },

  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: '../step_definitions/*.steps.js',
    tags: '@search',
    format: 'pretty'
  }
}
