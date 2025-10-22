#!/bin/bash

echo "🚀 WebdriverIO Project Setup Validation"
echo "======================================"

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found"
fi

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found"
fi

# Check Java
echo "☕ Checking Java..."
if command -v java &> /dev/null; then
    echo "✅ Java: $(java -version 2>&1 | head -n 1)"
else
    echo "❌ Java not found"
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

# Check project dependencies
echo "📦 Checking project dependencies..."
if [ -f "package.json" ] && [ -d "node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed - run: npm install"
fi

# Check configuration files
echo "⚙️ Checking configuration..."
if [ -f "wdio.conf.js" ]; then
    echo "✅ WebdriverIO config found"
else
    echo "❌ wdio.conf.js not found"
fi

# Check feature files
echo "🥒 Checking Cucumber features..."
if [ -d "features" ] && [ -f "features/flight-booking.feature" ]; then
    echo "✅ Feature files found"
else
    echo "❌ Feature files not found"
fi

# Check page objects
echo "🏛️ Checking Page Objects..."
if [ -d "page-objects" ] && [ -f "page-objects/HomePage.js" ]; then
    echo "✅ Page Object files found"
else
    echo "❌ Page Object files not found"
fi

echo ""
echo "======================================"
echo "📋 Next Steps:"
echo "1. Update app path in wdio.conf.js"
echo "2. Start Android emulator"
echo "3. Start Appium server: appium --address 127.0.0.1 --port 4723"
echo "4. Run tests: npm test"
echo "======================================"