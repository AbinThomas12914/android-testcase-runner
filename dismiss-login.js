const { remote } = require('webdriverio');

async function dismissLoginAndInspect() {
    console.log('🔗 Connecting to Appium...');
    
    const driver = await remote({
        protocol: 'http',
        hostname: '127.0.0.1',
        port: 4723,
        path: '/wd/hub/',
        capabilities: {
            platformName: 'Android',
            'appium:platformVersion': '11.0',
            'appium:deviceName': 'sdk_gphone_arm64',
            'appium:automationName': 'UiAutomator2',
            'appium:app': '/Users/A-10710/Documents/IBS/AI/android-testcase-runner/apps/expedia.apk',
            'appium:noReset': true,
            'appium:fullReset': false,
            'appium:newCommandTimeout': 240
        }
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
        await driver.deleteSession();
        console.log('✅ Session closed');
    }
}

dismissLoginAndInspect().catch(console.error);