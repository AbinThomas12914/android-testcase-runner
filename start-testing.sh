#!/bin/bash

echo "🚀 Starting WebdriverIO Test Environment"
echo "======================================="

# Check if Appium server is already running
if lsof -Pi :4723 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Appium server is already running on port 4723"
else
    echo "🔄 Starting Appium server..."
    echo "Run this command in a separate terminal:"
    echo "appium --address 127.0.0.1 --port 4723"
    echo ""
    echo "Then come back and run tests with:"
    echo "npm run test:simple"
    echo ""
    echo "Or press Enter to continue if Appium is running..."
    read -p ""
fi

echo ""
echo "🏃‍♂️ Running WebdriverIO tests..."
npm run test:simple