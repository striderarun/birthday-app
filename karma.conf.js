// Karma configuration
// Generated on Thu Sep 29 2016 16:09:27 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-bootstrap/ui-bootstrap.js',
        'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower_components/moment/moment.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
        'bower_components/angularjs-datetime-picker/angularjs-datetime-picker.js',
        'app/scripts/**/*.js',
        'app/scripts/components/*.html',
        'app/views/pages/*.html',
        'app/tests/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    ngHtml2JsPreprocessor: {
        stripPrefix: 'app/scripts/',
        prependPrefix: 'scripts/',
        // the name of the Angular module to create
        moduleName: "jasmine.templates"
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'app/scripts/**/*.js': ['coverage'],
        'app/scripts/components/*.html': ["ng-html2js"]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
          type : 'html',
          dir : 'app/tests/coverage/'
    },


    // web server port
    port: 9900,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
