# Dynamic Device Detection

This project supports automatic detection of connected Android devices and emulators, eliminating the need to manually configure device capabilities.

## 🔄 How It Works

The system automatically detects:
- **Android Version** (e.g., "13.0", "12.0", "11.0")
- **Device Model** (e.g., "Pixel_7", "Galaxy_S22", "sdk_gphone_arm64")
- **Device ID** (UDID for targeting specific devices)
- **Manufacturer** (e.g., "Google", "Samsung")

## 🚀 Usage Options

### 1. Interactive Script
```bash
./start-testing.sh
```
Choose from:
- Simple test (static config)
- Dynamic device detection
- Manual configuration

### 2. Direct Commands

**Dynamic Detection:**
```bash
npm run test:dynamic
```

**Static Configuration:**
```bash
npm run test:simple
```

**Device Detection Only:**
```bash
npm run detect:device
```

## 📱 Supported Devices

- **Android Emulators** (AVD)
- **Real Android Devices** (connected via USB/WiFi)
- **Multiple Device Types** (automatically adapts)

## 🛡️ Fallback System

If dynamic detection fails, the system automatically falls back to:
1. **Environment Variables** (`ANDROID_VERSION`, `DEVICE_NAME`)
2. **Default Values** (Android 11.0, sdk_gphone_arm64)
3. **Configuration Files** (app.config)

## 🔧 Configuration

### Environment Variables
```bash
export ANDROID_VERSION="13.0"
export DEVICE_NAME="Pixel_7"
```

### App Config File
Edit `config/app.config`:
```
ANDROID_VERSION=13.0
DEVICE_NAME=Pixel_7
ENABLE_DYNAMIC_DETECTION=true
```

## 📋 Example Output

```
🔍 Detecting device capabilities dynamically...
📱 Detecting connected Android device...
🎯 Using device: emulator-5554
✅ Detected: Google sdk_gphone_arm64 - Android 11.0
✅ Dynamic capabilities detected: {
  platformVersion: "11.0",
  deviceName: "sdk_gphone_arm64",
  udid: "emulator-5554"
}
```

## 🚨 Prerequisites

1. **ADB** must be in your PATH
2. **Android device/emulator** connected and authorized
3. **Appium server** running on port 4723

## 📝 Files Updated for Dynamic Detection

- `wdio.conf.js` - Main configuration with dynamic capabilities
- `wdio.dynamic.conf.js` - Dedicated dynamic configuration
- `config/device-capabilities.js` - Device detection logic
- `dismiss-login.js` - Login dismissal with dynamic detection
- `proceed-to-main.js` - App navigation with dynamic detection
- `explore-flight-search.js` - Flight search exploration
- `start-testing.sh` - Interactive test launcher

All inspection and testing scripts now automatically adapt to your connected device! 🎯