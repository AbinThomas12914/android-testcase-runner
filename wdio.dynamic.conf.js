const { getDeviceCapabilities } = require('./config/device-capabilities');

// Function to get capabilities
async function getCapabilities() {
    try {
        console.log('🔍 Detecting device capabilities dynamically...');
        const dynamicCaps = await getDeviceCapabilities();
        console.log('✅ Dynamic capabilities detected:', {
            platformVersion: dynamicCaps['appium:platformVersion'],
            deviceName: dynamicCaps['appium:deviceName'],
            udid: dynamicCaps['appium:udid']
        });
        return [dynamicCaps];
    } catch (error) {
        console.warn('⚠️ Dynamic detection failed, using static capabilities:', error.message);
        const { join } = require('path');
        return [{
            platformName: 'Android',
            'appium:platformVersion': '11.0',
            'appium:deviceName': 'sdk_gphone_arm64',
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240
        }];
    }
}

exports.config = {
    runner: 'local',
    specs: ['./features/**/*.feature'],
    exclude: [],
    maxInstances: 1,
    
    // Start with a default capability that will be replaced in onPrepare
    capabilities: [{
        platformName: 'Android',
        'appium:platformVersion': '11.0',
        'appium:deviceName': 'placeholder',
        'appium:automationName': 'UiAutomator2',
        'appium:app': require('path').join(__dirname, '/apps/expedia.apk'),
        'appium:noReset': true,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 240,
        'appium:connectHardwareKeyboard': true
    }],
    
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    autoCompileOpts: {
        autoCompile: false,
        tsNodeOpts: {
            transpileOnly: true,
            project: false
        }
    },
    
    // No automatic Appium service - assuming it's already running
    services: [],
    
    framework: 'cucumber',
    reporters: ['spec'],
    
    cucumberOpts: {
        require: ['./features/step-definitions/flight-booking.steps.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: true,
        profile: [],
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    },
    
    // Dynamic capabilities setup
    onPrepare: async function (config, capabilities) {
        console.log('🚀 Preparing WebdriverIO with dynamic capabilities...');
        
        // Get dynamic capabilities
        const dynamicCapabilities = await getCapabilities();
        const dynamicCap = dynamicCapabilities[0];
        
        // Update the existing capabilities in place
        Object.assign(config.capabilities[0], dynamicCap);
        
        console.log('📱 Using capabilities:', JSON.stringify(config.capabilities[0], null, 2));
    },
    
    beforeSession: function (config, capabilities, specs) {
        console.log('🔗 Starting session with device:', capabilities['appium:deviceName']);
        console.log('📱 Android version:', capabilities['appium:platformVersion']);
        console.log('🆔 Device ID:', capabilities['appium:udid'] || 'Not specified');
    },
    
    before: function (capabilities, specs) {
        browser.setTimeout({
            implicit: 10000,
            pageLoad: 10000
        });
    },
    
    beforeFeature: function (uri, feature, scenarios) {
        console.log('🎬 Starting feature:', feature.name);
    },
    
    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        console.log('📝 Starting scenario:', scenario.name);
    },
    
    afterStep: function (uri, feature, stepData, context) {
        if (stepData.step && stepData.step.status === 'failed') {
            try {
                browser.takeScreenshot();
                console.log('📸 Screenshot taken for failed step');
            } catch (error) {
                console.log('⚠️ Could not take screenshot:', error.message);
            }
        }
    },
    
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
        console.log('✅ Scenario completed:', scenario.name, 'Status:', result.status);
    },
    
    onComplete: function (exitCode, config, capabilities, results) {
        console.log('🏁 All tests completed. Exit code:', exitCode);
    }
};