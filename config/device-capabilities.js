const { execSync } = require('child_process');
const { join } = require('path');

async function getDeviceCapabilities() {
    try {
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
        const androidVersion = execSync(`adb -s ${deviceId} shell getprop ro.build.version.release`, { encoding: 'utf8' }).trim();
        const deviceModel = execSync(`adb -s ${deviceId} shell getprop ro.product.model`, { encoding: 'utf8' }).trim();
        const manufacturer = execSync(`adb -s ${deviceId} shell getprop ro.product.manufacturer`, { encoding: 'utf8' }).trim();
        
        console.log(`✅ Detected: ${manufacturer} ${deviceModel} - Android ${androidVersion}`);
        
        return {
            platformName: 'Android',
            'appium:platformVersion': androidVersion,
            'appium:deviceName': deviceModel,
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240,
            'appium:connectHardwareKeyboard': true,
            'appium:udid': deviceId
        };
        
    } catch (error) {
        console.warn('⚠️ Dynamic detection failed:', error.message);
        console.log('🔄 Using fallback capabilities...');
        
        return {
            platformName: 'Android',
            'appium:platformVersion': process.env.ANDROID_VERSION || '11.0',
            'appium:deviceName': process.env.DEVICE_NAME || 'sdk_gphone_arm64',
            'appium:automationName': 'UiAutomator2',
            'appium:app': join(process.cwd(), 'apps', 'expedia.apk'),
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240,
            'appium:connectHardwareKeyboard': true
        };
    }
}

module.exports = { getDeviceCapabilities };

// Run if called directly
if (require.main === module) {
    getDeviceCapabilities().then(capabilities => {
        console.log('\n🎉 Device detection complete!');
        console.log('📋 Capabilities:', JSON.stringify(capabilities, null, 2));
        process.exit(0);
    }).catch(error => {
        console.error('❌ Failed to get device capabilities:', error.message);
        process.exit(1);
    });
}