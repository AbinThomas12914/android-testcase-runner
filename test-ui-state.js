const { remote } = require('webdriverio');
const { getDeviceCapabilities } = require('./config/device-capabilities');

async function testUIState() {
    const capabilities = await getDeviceCapabilities();
    console.log('📱 Device capabilities:', capabilities);
    
    const driver = await remote({
        hostname: '127.0.0.1',
        port: 4723,
        path: '/wd/hub/',
        capabilities: capabilities
    });

    try {
        console.log('🚀 App launched, waiting for initial load...');
        await driver.pause(8000);
        
        // Take page source for analysis
        console.log('📄 Getting page source after initial load...');
        const pageSource = await driver.getPageSource();
        console.log('Page source length:', pageSource.length);
        
        // Check for common navigation elements
        const elementsToCheck = [
            '//android.widget.TextView[@text="Flights"]',
            '//android.widget.TextView[@text="Home"]', 
            '//android.widget.TextView[@text="Search"]',
            '//*[@content-desc="Flights"]',
            '//*[contains(@text, "Flight")]',
            '//*[contains(@text, "travel")]',
            '//*[contains(@text, "booking")]'
        ];
        
        console.log('🔍 Checking for available UI elements...');
        for (const selector of elementsToCheck) {
            try {
                const element = await driver.$(selector);
                const isDisplayed = await element.isDisplayed();
                console.log(`✅ Found: ${selector} - Displayed: ${isDisplayed}`);
            } catch (error) {
                console.log(`❌ Not found: ${selector}`);
            }
        }
        
        // Try to find any clickable elements
        console.log('🎯 Looking for clickable elements...');
        try {
            const clickableElements = await driver.$$('//*[@clickable="true"]');
            console.log(`📊 Found ${clickableElements.length} clickable elements`);
            
            for (let i = 0; i < Math.min(5, clickableElements.length); i++) {
                try {
                    const text = await clickableElements[i].getText();
                    const contentDesc = await clickableElements[i].getAttribute('content-desc');
                    console.log(`  ${i+1}. Text: "${text}" | Content-desc: "${contentDesc}"`);
                } catch (e) {
                    console.log(`  ${i+1}. (Unable to get text/content-desc)`);
                }
            }
        } catch (error) {
            console.log('❌ Error finding clickable elements:', error.message);
        }
        
    } catch (error) {
        console.error('❌ Error during test:', error.message);
    } finally {
        await driver.deleteSession();
        console.log('🏁 Test completed');
    }
}

testUIState().catch(console.error);