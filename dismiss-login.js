const { remote } = require('webdriverio');
const { execSync } = require('child_process');
const path = require('path');

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
            'appium:app': path.join(__dirname, 'apps', 'expedia.apk'),
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240,
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
            'appium:app': path.join(__dirname, 'apps', 'expedia.apk'),
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240
        };
    }
}

async function dismissLoginAndInspect() {
    console.log('🔗 Connecting to Appium with dynamic capabilities...');
    
    // Get dynamic capabilities
    const capabilities = await getDeviceCapabilities();
    
    const driver = await remote({
        protocol: 'http',
        hostname: '127.0.0.1',
        port: 4723,
        path: '/wd/hub/',
        capabilities
    });

    try {
        console.log('⏳ Waiting for app to load...');
        await driver.pause(10000);

        // Try to find and click the dismiss button
        try {
            console.log('🎯 Looking for dismiss button...');
            const dismissButton = await driver.$('//android.view.View[@content-desc="Dismiss"]');
            
            if (await dismissButton.isDisplayed()) {
                console.log('✅ Found dismiss button, clicking...');
                await dismissButton.click();
                console.log('✅ Dismiss button clicked');
                
                // Wait for transition
                await driver.pause(5000);
                
                // Get new page source after dismissing login
                console.log('📄 Getting page source after dismiss...');
                const pageSource = await driver.getPageSource();
                
                // Save to file
                const fs = require('fs');
                fs.writeFileSync('page-source-after-dismiss.xml', pageSource);
                console.log('✅ Page source saved to page-source-after-dismiss.xml');
                
                // Look for elements with text
                console.log('🏷️ Looking for elements with text...');
                const elementsWithText = await driver.$$('//*[@text]');
                console.log(`Found ${elementsWithText.length} elements with text`);
                
                let elementTexts = [];
                for (let i = 0; i < Math.min(elementsWithText.length, 20); i++) {
                    try {
                        const text = await elementsWithText[i].getAttribute('text');
                        if (text && text.trim()) {
                            elementTexts.push(`${i + 1}. "${text}"`);
                        }
                    } catch (error) {
                        // Skip elements that can't be accessed
                    }
                }
                
                console.log('\n📝 Element texts found:');
                elementTexts.forEach(text => console.log(text));
                
                // Check current activity
                const activity = await driver.getCurrentActivity();
                console.log(`🔍 Current activity: ${activity}`);
                
            } else {
                console.log('❌ Dismiss button not displayed');
            }
            
        } catch (error) {
            console.log('❌ Could not find or click dismiss button:', error.message);
            
            // Try alternative: use back button
            console.log('🔄 Trying device back button...');
            await driver.back();
            await driver.pause(3000);
            
            const activity = await driver.getCurrentActivity();
            console.log(`🔍 Current activity after back: ${activity}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        if (driver) {
            await driver.deleteSession();
            console.log('✅ Session closed');
        }
    }
}

dismissLoginAndInspect().catch(console.error);