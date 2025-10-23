
# WebdriverIO Mobile Test Automation with Cucumber

This project provides a complete mobile test automation framework using WebdriverIO, Cucumber BDD, and Appium for Android app testing.

## 📋 Prerequisites

Ensure you have the following installed:

- **Java Development Kit (JDK)** - version 8 or higher
- **Node.js** - version 16 or higher
- **npm** - comes with Node.js
- **Android SDK** - with emulator setup
- **Appium Server** - installed globally

## 🚀 Quick Setup

### 1. Environment Setup

```bash
# Install Appium globally (if not already installed)
npm install -g appium@1.22.3

# Install Appium UiAutomator2 driver
appium driver install uiautomator2
```

### 2. Android Setup

Ensure you have:
- Android SDK installed
- `ANDROID_HOME` environment variable set
- Android emulator created and running
- Your target app's APK file

### 3. Project Setup

```bash
# Clone or navigate to project directory
cd android-testcase-runner

# Install dependencies
npm install

# Update app path in wdio.conf.js
# Edit the 'appium:app' capability with your APK path
```

## 📁 Project Structure

```
android-testcase-runner/
├── features/                      # Cucumber feature files
│   ├── flight-booking.feature     # BDD scenarios
│   └── step-definitions/          # Step implementations
│       └── flight-booking.steps.js
├── page-objects/                  # Page Object Model classes
│   ├── HomePage.js
│   ├── FlightSearchPage.js
│   ├── SearchLocationPage.js
│   ├── FlightSelectionPage.js
│   ├── TripReviewPage.js
│   ├── PopupPage.js
│   ├── LocationAccessPage.js
│   └── PermissionPopupPage.js
├── test/                          # Test utilities and helpers
│   └── TestRun.js                 # Legacy test functions
├── config/                        # Configuration files
├── wdio.conf.js                   # WebdriverIO configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## ⚙️ Configuration

### Update WebdriverIO Configuration (`wdio.conf.js`)

1. **Set your app path:**
```javascript
'appium:app': join(process.cwd(), 'apps', 'your-app.apk'),
```

2. **Configure device capabilities:**
```javascript
'appium:platformVersion': '11.0',      // Your Android version
'appium:deviceName': 'Android Emulator', // Your device name
```

3. **Adjust timeouts if needed:**
```javascript
waitforTimeout: 10000,
connectionRetryTimeout: 120000,
```

## 🎯 Running Tests

### Prerequisites for Test Execution

1. **Start Android Emulator:**
```bash
# List available AVDs
emulator -list-avds

# Start emulator (replace with your AVD name)
emulator -avd Pixel_API_30
```

2. **Start Appium Server:**
```bash
# Start Appium on default port 4723
appium --address 127.0.0.1 --port 4723
```

### Execute Tests

```bash
# Run all tests
npm test

# Run specific test suite
npm run test:android

# Run with specific feature file
npx wdio run wdio.conf.js --spec ./features/flight-booking.feature
```

## 📱 Test Scenarios

The project includes the following test scenarios:

### Flight Booking Flow
- Navigate to Flights tab
- Select One-way trip
- Choose departure location (Cochin)
- Choose destination (Bengaluru)
- Search for flights
- Select flight and proceed to checkout

### Popup Handling
- Close location access popups
- Handle permission dialogs
- Navigate through app onboarding

## 🔧 Page Object Model

Each page class Follows this pattern:

```javascript
class HomePage {
  // Element selectors
  get FLIGHTS_TAB() { return $("//*[@text='Flights']"); }

  // Actions
  async clickFlightsTab() {
    await this.FLIGHTS_TAB.click();
  }
}

module.exports = HomePage;
```

## 📝 Writing New Tests

### 1. Create Feature File
```gherkin
Feature: New Feature
  Scenario: Test scenario
    Given I am on the app
    When I perform an action
    Then I should see expected result
```

### 2. Implement Step Definitions
```javascript
const { Given, When, Then } = require('@wdio/cucumber-framework');

Given(/^I am on the app$/, async () => {
  // Implementation
});
```

### 3. Add Page Objects
```javascript
class NewPage {
  get ELEMENT() { return $("selector"); }
  
  async performAction() {
    await this.ELEMENT.click();
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **Appium Connection Failed**
   - Ensure Appium server is running on port 4723
   - Check if emulator is running and accessible

2. **Element Not Found**
   - Verify selectors using Appium Inspector
   - Add appropriate wait conditions
   - Check if app UI has changed

3. **Test Timeouts**
   - Increase timeout values in wdio.conf.js
   - Add explicit waits for slow-loading elements

4. **App Installation Issues**
   - Verify APK path is correct
   - Ensure emulator has sufficient storage
   - Check app permissions

### Debug Mode

```bash
# Run tests with debug logging
npx wdio run wdio.conf.js --logLevel debug
```

## 📊 Reporting

Test results are displayed in the console with detailed step-by-step execution. For enhanced reporting:

```bash
# Generate Allure reports (if configured)
npm run report
```

## 🛠️ Development Tips

1. **Use Appium Inspector** to identify element selectors
2. **Add explicit waits** for better test stability
3. **Keep page objects focused** on single page functionality
4. **Use descriptive test names** for better reporting
5. **Handle popups gracefully** with try-catch blocks

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review WebdriverIO and Appium documentation
3. Verify Android SDK and emulator setup

---

**Happy Testing! 🚀**