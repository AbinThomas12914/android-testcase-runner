const { join } = require('path');

// Get dynamic capabilities synchronously
function getDynamicCapabilities() {
    try {
        const { execSync } = require('child_process');
        
        console.log('📱 Detecting connected Android device...');
        
        // Get connected devices
        const devices = execSync('adb devices', { encoding: 'utf8' });
        const deviceLines = devices.split('\n').filter(line => line.includes('\tdevice'));
        
        if (deviceLines.length === 0) {
            throw new Error('No connected Android devices found');
        }
        
        const deviceId = deviceLines[0].split('\t')[0];
        console.log(`🎯 Using device: ${deviceId}`);
        
        // Get device information
        let androidVersion = execSync(`adb -s ${deviceId} shell getprop ro.build.version.release`, { encoding: 'utf8' }).trim();
        // Ensure androidVersion is in the format '11.0', '12.0', etc.
        if (/^\d+$/.test(androidVersion)) {
            androidVersion = androidVersion + '.0';
        }
        const deviceModel = execSync(`adb -s ${deviceId} shell getprop ro.product.model`, { encoding: 'utf8' }).trim();
        const manufacturer = execSync(`adb -s ${deviceId} shell getprop ro.product.manufacturer`, { encoding: 'utf8' }).trim();
        
        console.log(`✅ Detected: ${manufacturer} ${deviceModel} - Android ${androidVersion}`);
        
        return {
            platformName: 'Android',
            'appium:platformVersion': androidVersion,
            'appium:deviceName': deviceModel,
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
            'appium:appPackage': 'com.expedia.bookings',
            'appium:appActivity': 'com.expedia.bookings.activity.SearchActivity',
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240,
            'appium:connectHardwareKeyboard': true,
            'appium:udid': deviceId,
            'appium:skipServerInstallation': false,
            'appium:skipDeviceInitialization': false,
            'appium:systemPort': 8200,
            'appium:chromeDriverPort': 8000
        };
        
    } catch (error) {
        console.error('❌ Dynamic detection failed:', error.message);
        console.error('❌ Cannot proceed without device capabilities');

        // return {
        //     platformName: 'Android',
        //     'appium:platformVersion': '11.0',
        //     'appium:deviceName': 'sdk_gphone_arm64',
        //     'appium:automationName': 'UiAutomator2',
        //     'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
        //     'appium:noReset': true,
        //     'appium:fullReset': false,
        //     'appium:newCommandTimeout': 240,
        //     'appium:connectHardwareKeyboard': true
        // }
        
        // Stop execution if dynamic detection fails or uncomment above return to use fallback
        process.exit(1);
    }
}

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
    // Dynamic capabilities detected at startup
    capabilities: [getDynamicCapabilities()],
    
    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 1, // Stop after first failure
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // Add autoCompileOpts to handle module loading
    autoCompileOpts: {
        autoCompile: false,
        tsNodeOpts: {
            transpileOnly: true,
            project: false
        }
    },
    
    //
    // =====
    // Hooks
    // =====
    services: [
        ['appium', {
            args: {
                address: 'localhost',
                port: 4723,
                basePath: '/'
            },
            logPath: './logs',
            command: 'appium'
        }]
    ],
    
    framework: 'cucumber',
    reporters: ['spec'],
    
    //
    // =====
    // Cucumber Options
    // =====
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
          require: [
    './features/step-definitions/*.js',
    './features/step-definitions/**/*.js'
  ],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: true, // Stop on first scenario failure
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
        console.log('🚀 WebdriverIO session preparation...');
        config.capabilities = capabilities;
        
        // Validate capabilities
        if (!capabilities || capabilities.length === 0 || !capabilities[0]) {
            console.error('❌ No valid capabilities found');
            process.exit(1);
        }
        
        const caps = config.capabilities[0];
        if (!caps['appium:platformVersion'] || !caps['appium:deviceName']) {
            console.error('❌ Invalid capabilities - missing required device information');
            process.exit(1);
        }
        
        console.log('✅ Capabilities validation passed');
        console.log('📱 Final capabilities:', JSON.stringify(caps, null, 2));
    },
    
    beforeSession: function (config, capabilities, specs) {
        console.log('🔗 Starting session with device:', capabilities['appium:deviceName']);
        console.log('📱 Android version:', capabilities['appium:platformVersion']);
        console.log('🆔 Device ID:', capabilities['appium:udid'] || 'Not specified');
    },
    
    before: function (capabilities, specs) {
        // Set implicit timeout
        // browser.setTimeout({
        //     implicit: 10000,
        //     pageLoad: 10000
        // });
    },
    
    beforeFeature: function (uri, feature, scenarios) {
        // console.log('Starting feature:', feature.name);
    },
    
    beforeScenario: function (uri, feature, scenario, sourceLocation) {
        // console.log('Starting scenario:', scenario.name);
    },
    
    beforeStep: function (uri, feature, stepData, context) {
        // console.log('Executing step:', stepData.step.text);
    },
    
    afterStep: function (uri, feature, stepData, context) {
        // if (stepData.step.status === 'failed') {
        //     browser.takeScreenshot();
        // }
    },
    
    afterScenario: function (uri, feature, scenario, result, sourceLocation) {
        // console.log('Scenario completed:', scenario.name, 'Status:', result.status);
    },
    
    afterFeature: function (uri, feature, scenarios) {
        // console.log('Feature completed:', feature.name);
    },
    
    after: function (result, capabilities, specs) {
        // console.log('Test completed');
    },
    
    afterSession: function (config, capabilities, specs) {
        // console.log('Session ended');
    },
    
    onComplete: function (exitCode, config, capabilities, results) {
        // console.log('All tests completed. Exit code:', exitCode);
    }
};