#!/bin/bash

echo "🚀 WebdriverIO Project Setup Validation"
echo "======================================"

# Check APK file
echo "📱 Checking APK file..."
APK_PATH="./apps/expedia.apk"
if [ -f "$APK_PATH" ]; then
    echo "✅ APK found: $APK_PATH"
    echo "📊 APK size: $(ls -lh $APK_PATH | awk '{print $5}')"
else
    echo "❌ APK not found at: $APK_PATH"
fi

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
fi

# Check Appium
echo "📱 Checking Appium..."
if command -v appium &> /dev/null; then
    echo "✅ Appium: $(appium --version)"
else
    echo "❌ Appium not found - install with: npm install -g appium@1.22.3"
fi

# Check ANDROID_HOME
echo "🤖 Checking Android SDK..."
if [ -n "$ANDROID_HOME" ]; then
    echo "✅ ANDROID_HOME: $ANDROID_HOME"
else
    echo "❌ ANDROID_HOME not set"
fi

# Check if emulator is running
echo "📱 Checking Android emulator..."
if adb devices | grep -q "emulator"; then
    echo "✅ Android emulator is running"
    echo "📋 Connected devices:"
    adb devices | grep -v "List"
else
    echo "❌ No Android emulator running"
    echo "💡 Start emulator with: emulator -avd Pixel_API_30"
fi

# Check project dependencies
echo "📦 Checking project dependencies..."
if [ -f "package.json" ] && [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed - run: npm install"
fi

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo "1. ✅ APK is in place"
echo "2. Start Android emulator (if not running)"
echo "3. Start Appium server: appium --address 127.0.0.1 --port 4723"
echo "4. Run tests: npm run test:simple"
echo "======================================"