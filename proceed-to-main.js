const { remote } = require('webdriverio');
const { getDeviceCapabilities } = require('./config/device-capabilities');

async function proceedToMainApp() {
    console.log('🔗 Connecting to Appium with dynamic capabilities...');
    
    // Get dynamic capabilities
    const capabilities = await getDeviceCapabilities();
    console.log('📱 Using device:', capabilities['appium:deviceName'], 
                'Android', capabilities['appium:platformVersion']);
    
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

        // Step 1: Find and click the Dismiss button to close login screen
        console.log('� Looking for dismiss button...');
        const dismissButton = await driver.$('//*[@content-desc="Dismiss"]');
        
        if (await dismissButton.isDisplayed()) {
            console.log('🚫 Dismissing login screen...');
            await dismissButton.click();
            await driver.pause(3000);
            console.log('✅ Login screen dismissed successfully!');
        } else {
            console.log('ℹ️ No dismiss button found');
        }
    
        // Step 2: Check for "Do you love Expedia?" popup and dismiss it
        try {
            console.log('🔍 Looking for feedback popup...');
            const feedbackPopup = await driver.$('//android.widget.TextView[@text="Do you love Expedia?"]');
            
            if (await feedbackPopup.isDisplayed()) {
                console.log('📋 Found "Do you love Expedia?" popup');
                
                // Look for "No" button to dismiss quickly
                const noButton = await driver.$('//android.widget.TextView[@text="No"]');
                if (await noButton.isDisplayed()) {
                    console.log('❌ Clicking "No" to dismiss feedback popup...');
                    await noButton.click();
                    await driver.pause(2000);
                    console.log('✅ Feedback popup dismissed!');
                }
            }
        } catch (error) {
            console.log('ℹ️ No feedback popup found or already dismissed');
        }

        // Step 3: Check for any other popups or permissions
        try {
            console.log('🔍 Checking for location permission popup...');
            const allowButton = await driver.$('//android.widget.Button[@text="Allow"]');
            
            if (await allowButton.isDisplayed()) {
                console.log('✅ Found Allow button for permissions, clicking...');
                await allowButton.click();
                await driver.pause(3000);
            }
        } catch (error) {
            console.log('ℹ️ No permission popup found');
        }

        // Step 4: Get final page source
        console.log('📄 Getting final page source...');
        const pageSource = await driver.getPageSource();
        
        // Save to file
        const fs = require('fs');
        fs.writeFileSync('page-source-main-app.xml', pageSource);
        console.log('✅ Page source saved to page-source-main-app.xml');
        
        // Look for flight-related elements
        console.log('🔍 Looking for flight-related elements...');
        const flightElements = await driver.$$('//*[contains(@text, "Flight") or contains(@text, "flight") or contains(@content-desc, "Flight") or contains(@content-desc, "flight")]');
        console.log(`Found ${flightElements.length} flight-related elements`);
        
        for (let i = 0; i < flightElements.length; i++) {
            try {
                const text = await flightElements[i].getAttribute('text');
                const contentDesc = await flightElements[i].getAttribute('content-desc');
                console.log(`Flight element ${i + 1}: text="${text}", content-desc="${contentDesc}"`);
            } catch (error) {
                // Skip elements that can't be accessed
            }
        }
        
        // Look for all clickable elements with text
        console.log('🏷️ Looking for all clickable elements...');
        const clickableElements = await driver.$$('//*[@clickable="true" and @text]');
        console.log(`Found ${clickableElements.length} clickable elements with text`);
        
        let clickableTexts = [];
        for (let i = 0; i < Math.min(clickableElements.length, 20); i++) {
            try {
                const text = await clickableElements[i].getAttribute('text');
                const contentDesc = await clickableElements[i].getAttribute('content-desc');
                if (text && text.trim()) {
                    clickableTexts.push(`${i + 1}. "${text}" (${contentDesc || 'no desc'})`);
                }
            } catch (error) {
                // Skip elements that can't be accessed
            }
        }
        
        console.log('\n📝 Clickable elements found:');
        clickableTexts.forEach(text => console.log(text));
        
        // Check current activity
        const activity = await driver.getCurrentActivity();
        console.log(`\n🔍 Current activity: ${activity}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('✅ Session closed');
    }
}

proceedToMainApp().catch(console.error);