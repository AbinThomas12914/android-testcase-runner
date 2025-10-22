#!/bin/bash

echo "🚀 Starting WebdriverIO Test Environment"
echo "======================================="

# Check if user wants dynamic detection
echo "Choose test mode:"
echo "1) Simple test (static config)"
echo "2) Dynamic device detection"
echo "3) Manual configuration"
echo ""
read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "📱 Using simple static configuration..."
        
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
        ;;
    2)
        echo "🔄 Using dynamic device detection..."
        
        # Check if adb is available
        if ! command -v adb &> /dev/null; then
            echo "❌ ADB not found. Please ensure Android SDK is installed and in PATH."
            exit 1
        fi

        # Check for connected devices
        echo "🔍 Checking for connected Android devices..."
        DEVICES=$(adb devices | grep -v "List of devices" | grep -v "^$" | wc -l)

        if [ $DEVICES -eq 0 ]; then
            echo "❌ No Android devices/emulators found."
            echo "💡 Please start an emulator or connect a device."
            exit 1
        fi

        echo "✅ Found $DEVICES connected device(s)"
        
        # Check if Appium server is already running
        if lsof -Pi :4723 -sTCP:LISTEN -t >/dev/null ; then
            echo "✅ Appium server is already running on port 4723"
        else
            echo "🚀 Starting Appium server..."
            appium --address 127.0.0.1 --port 4723 > /dev/null 2>&1 &
            APPIUM_PID=$!
            sleep 5
            
            if lsof -Pi :4723 -sTCP:LISTEN -t >/dev/null ; then
                echo "✅ Appium server started successfully"
            else
                echo "❌ Failed to start Appium server"
                exit 1
            fi
        fi

        echo "🧪 Running tests with dynamic capabilities..."
        npm run test:dynamic
        
        # Clean up Appium if we started it
        if [ ! -z "$APPIUM_PID" ]; then
            echo "🧹 Stopping Appium server..."
            kill $APPIUM_PID 2>/dev/null
        fi
        ;;
    3)
        echo "🔧 Manual configuration mode..."
        echo ""
        echo "Available commands:"
        echo "  npm run test:simple   - Run with static config"
        echo "  npm run test:dynamic  - Run with dynamic config"
        echo "  npm run detect:device - Just detect device info"
        echo ""
        echo "Make sure Appium is running:"
        echo "  appium --address 127.0.0.1 --port 4723"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac