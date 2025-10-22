const { execSync } = require('child_process');

// Get device capabilities dynamically
const { getDeviceCapabilities } = require('./config/device-capabilities');

async function basicTest() {
    console.log('🚀 Starting basic app launch test...');
    
    try {
        // Get dynamic device capabilities
        const capabilities = getDeviceCapabilities();
        console.log('📱 Device capabilities:', capabilities);
        
        // Import WebdriverIO modules
        const { remote } = require('webdriverio');
        
        // Create WebDriver instance
        const driver = await remote({
            logLevel: 'info',
            hostname: '127.0.0.1',
            port: 4723,
            capabilities: {
                platformName: 'Android',
                ...capabilities,
                'appium:automationName': 'UiAutomator2',
                'appium:app': __dirname + '/apps/expedia.apk',
                'appium:noReset': true,
                'appium:fullReset': false,
                'appium:newCommandTimeout': 240,
                'appium:connectHardwareKeyboard': true
            }
        });
        
        console.log('✅ WebDriver session created successfully');
        
        // Wait for app to load
        console.log('⏳ Waiting for app to initialize...');
        await driver.pause(10000);
        
        // Check for dismiss button and click if found
        try {
            const dismissButton = await driver.$('//*[@content-desc="Dismiss"]');
            const isDisplayed = await dismissButton.isDisplayed();
            if (isDisplayed) {
                console.log('✅ Found dismiss button - clicking...');
                await dismissButton.click();
                await driver.pause(3000);
                console.log('✅ Dismiss button clicked');
            }
        } catch (error) {
            console.log('ℹ️ No dismiss button found or already dismissed');
        }
        
        // Wait for main UI
        await driver.pause(5000);
        
        // Try to find Flights tab
        try {
            const flightsTab = await driver.$('//android.widget.TextView[@text="Flights"]');
            const isFlightsDisplayed = await flightsTab.isDisplayed();
            if (isFlightsDisplayed) {
                console.log('✅ Flights tab found and displayed');
                
                // Click on flights tab
                await flightsTab.click();
                console.log('✅ Flights tab clicked');
                
                await driver.pause(3000);
                console.log('✅ Basic test completed successfully!');
            } else {
                console.log('⚠️ Flights tab found but not displayed');
            }
        } catch (error) {
            console.log('⚠️ Flights tab not found:', error.message);
            
            // Get page source for debugging
            const pageSource = await driver.getPageSource();
            console.log('📄 Page source length:', pageSource.length);
            
            // Look for any text elements to verify app loaded
            const textElements = await driver.$$('//android.widget.TextView');
            console.log('📝 Found', textElements.length, 'text elements');
            
            // Log first few text elements
            for (let i = 0; i < Math.min(5, textElements.length); i++) {
                try {
                    const text = await textElements[i].getText();
                    if (text && text.trim()) {
                        console.log(`📝 Text element ${i}: "${text}"`);
                    }
                } catch (e) {
                    // Ignore errors getting text
                }
            }
        }
        
        // Close session
        await driver.deleteSession();
        console.log('🏁 Test completed');
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
        process.exit(1);
    }
}

// Run the test
basicTest();