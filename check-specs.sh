#!/bin/bash

echo "🔍 WebdriverIO Specs Diagnostic"
echo "================================"

# Check current directory
echo "📁 Current directory: $(pwd)"

# Check if features directory exists
if [ -d "features" ]; then
    echo "✅ Features directory exists"
    echo "📄 Contents:"
    find features -name "*.feature" -type f
else
    echo "❌ Features directory not found"
fi

# Check if step definitions exist
if [ -d "features/step-definitions" ]; then
    echo "✅ Step definitions directory exists"
    echo "📝 Contents:"
    find features/step-definitions -name "*.js" -type f
else
    echo "❌ Step definitions directory not found"
fi

# Test WebdriverIO config detection
echo ""
echo "🧪 Testing WebdriverIO spec detection..."

# Simple test with debug output
echo "Running: npx wdio run wdio.simple.conf.js --logLevel debug --dry-run"
npx wdio run wdio.simple.conf.js --logLevel debug --dry-run

echo ""
echo "✅ Diagnostic complete"