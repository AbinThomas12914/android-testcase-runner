
<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# WebdriverIO Mobile Test Automation Project

This project uses WebdriverIO with Cucumber BDD for mobile app testing using Appium.

## Project Structure
- `/features/` - Cucumber feature files
- `/step-definitions/` - Cucumber step definitions
- `/page-objects/` - Page Object Model classes
- `/test/` - Test utilities and helpers
- `/config/` - Configuration files
- `wdio.conf.js` - WebdriverIO configuration

## Development Guidelines
- Use Page Object Model pattern for element interactions
- Write BDD scenarios in Gherkin syntax
- Follow async/await patterns for WebdriverIO commands
- Use AppiumBy for mobile element locators
- Implement proper wait strategies for mobile elements

## Mobile Testing Specifics
- Target platform: Android
- Use UiAutomator2 automation engine
- Configure proper device capabilities
- Handle mobile-specific scenarios (permissions, popups)