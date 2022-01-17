// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-junit-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    junitReporter: {
      outputDir: "dist/junit",
      useBrowserName: false,
    },
    reporters: ["progress", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    restartOnFileChange: true,
  });
};
