
# Apps Directory

Place your Android APK files here for testing.

## Example:
- app.apk (your main application)
- app-debug.apk (debug version)
- test-app.apk (test application)

## Update Configuration:
After placing your APK file, update the app path in wdio.conf.js:

```javascript
'appium:app': join(process.cwd(), 'apps', 'your-app-name.apk')
```

## Note:
You can also use an absolute path or a URL for app installation.