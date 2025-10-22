#!/bin/bash

echo "🔍 Getting Expedia App Page Source"
echo "================================="

# Make sure Appium is running
if ! lsof -i :4723 > /dev/null; then
    echo "❌ Appium server not running. Start it with:"
    echo "appium --address 127.0.0.1 --port 4723"
    exit 1
fi

# Make sure emulator is running
if ! adb devices | grep -q "emulator"; then
    echo "❌ No emulator running. Start it first."
    exit 1
fi

echo "✅ Appium server: Running"
echo "✅ Emulator: Connected"
echo ""
echo "📱 Getting page source from Expedia app..."

# Create a simple script to get page source
node -e "
const { remote } = require('webdriverio');

(async () => {
    const opts = {
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
    };

    try {
        const client = await remote(opts);
        
        // Wait a bit for app to load
        await client.pause(5000);
        
        // Get page source
        const source = await client.getPageSource();
        
        // Save to file
        require('fs').writeFileSync('./page-source.xml', source);
        console.log('✅ Page source saved to page-source.xml');
        console.log('');
        console.log('🔍 Current activity:');
        const activity = await client.getCurrentActivity();
        console.log('Activity:', activity);
        
        // Get all elements with text
        console.log('');
        console.log('🏷️  Available elements with text:');
        const textElements = await client.$$('//*[@text]');
        for (let el of textElements.slice(0, 10)) {
            try {
                const text = await el.getAttribute('text');
                if (text && text.trim()) {
                    console.log('- Text:', text);
                }
            } catch (e) {}
        }
        
        await client.deleteSession();
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
})();
"