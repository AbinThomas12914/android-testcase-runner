const { remote } = require('webdriverio');
const { getDeviceCapabilities } = require('./config/device-capabilities');

async function exploreFlightSearchPage() {
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

        // Step 1: Dismiss login popup
        try {
            const dismissButton = await driver.$('//*[@content-desc="Dismiss"]');
            if (await dismissButton.isDisplayed()) {
                console.log('✅ Dismissing login screen...');
                await dismissButton.click();
                await driver.pause(3000);
            }
        } catch (error) {
            console.log('ℹ️ No login dismiss button found');
        }

        // Step 2: Dismiss feedback popup
        try {
            const noButton = await driver.$('//android.widget.TextView[@text="No"]');
            if (await noButton.isDisplayed()) {
                console.log('✅ Dismissing feedback popup...');
                await noButton.click();
                await driver.pause(3000);
            }
        } catch (error) {
            console.log('ℹ️ No feedback popup found');
        }

        // Step 3: Click on Flights
        console.log('🎯 Looking for Flights button...');
        const flightsButton = await driver.$('//android.widget.TextView[@text="Flights"]');
        await flightsButton.waitForDisplayed({ timeout: 10000 });
        console.log('✅ Found Flights button, clicking...');
        await flightsButton.click();
        await driver.pause(5000);

        // Step 4: Get flight search page source
        console.log('📄 Getting flight search page source...');
        const pageSource = await driver.getPageSource();
        require('fs').writeFileSync('flight-search-page.xml', pageSource);
        console.log('✅ Flight search page source saved to flight-search-page.xml');

        // Step 5: Look for common flight search elements
        console.log('🔍 Looking for flight search elements...');
        
        // Look for input fields and buttons
        const inputElements = await driver.$$('//android.widget.EditText');
        console.log(`Found ${inputElements.length} input fields`);
        
        const buttonElements = await driver.$$('//android.widget.Button');
        console.log(`Found ${buttonElements.length} buttons`);
        
        // Look for text elements
        const textElements = await driver.$$('//*[@text and @clickable="true"]');
        console.log(`Found ${textElements.length} clickable text elements`);
        
        console.log('\n📝 Clickable text elements found:');
        for (let i = 0; i < Math.min(textElements.length, 15); i++) {
            try {
                const text = await textElements[i].getAttribute('text');
                const bounds = await textElements[i].getAttribute('bounds');
                if (text && text.trim()) {
                    console.log(`${i + 1}. "${text}" - ${bounds}`);
                }
            } catch (error) {
                // Skip elements that can't be accessed
            }
        }
        
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

exploreFlightSearchPage().catch(console.error);