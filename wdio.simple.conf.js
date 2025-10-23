const { join } = require('path');

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './features/**/*.feature'
    ],
    
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '11.0',
        'appium:deviceName': 'sdk_gphone_arm64',
        'appium:automationName': 'UiAutomator2',
        'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,
        'appium:connectHardwareKeyboard': true
    }],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // WebdriverIO port for Appium
    port: 4723,
    path: '/',
    
    //
    // =====
    // Services - Simplified without auto-start
    // =====
    services: [],
    
    framework: 'cucumber',
    reporters: ['spec'],
    
    //
    // =====
    // Cucumber Options
    // =====
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./features/step-definitions/flight-booking.steps.js'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        format: ['pretty'],
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <string[]> (name) specify the profile to use
        profile: [],
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tagExpression: '',
        // <number> timeout for step definitions
        timeout: 120000, // Increased to 2 minutes
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },
    
    //
    // =====
    // Hooks
    // =====
    onPrepare: function (config, capabilities) {
        console.log('Starting WebdriverIO tests...');
        console.log('Make sure Appium server is running on port 4723');
    },
    
    beforeSession: function (config, capabilities, specs) {
        console.log('Before session started');
    },
    
    before: function (capabilities, specs) {
        // Set implicit timeout only (pageLoad not supported by Appium)
        browser.setTimeout({
            implicit: 10000
        });
    },
    
    beforeFeature: function (uri, feature, scenarios) {
        console.log('Starting feature:', feature.name);
    },
    
    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        if (scenario && scenario.name) {
            console.log('Starting scenario:', scenario.name);
        }
    },
    
    beforeStep: function (uri, feature, stepData, context) {
        // console.log('Executing step:', stepData.step.text);
    },
    
    afterStep: function (uri, feature, stepData, context) {
        if (stepData.step && stepData.step.status === 'failed') {
            try {
                browser.takeScreenshot();
            } catch (e) {
                console.log('Could not take screenshot');
            }
        }
    },
    
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
        if (scenario && scenario.name && result && result.status) {
            console.log('Scenario completed:', scenario.name, 'Status:', result.status);
        }
    },
    
    afterFeature: function (uri, feature, scenarios) {
        console.log('Feature completed:', feature.name);
    },
    
    after: function (result, capabilities, specs) {
        console.log('Test completed');
    },
    
    afterSession: function (config, capabilities, specs) {
        console.log('Session ended');
    },
    
    onComplete: function (exitCode, config, capabilities, results) {
        console.log('All tests completed. Exit code:', exitCode);
    }
};