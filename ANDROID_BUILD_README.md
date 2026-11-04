# PTag Admin Android source package

This package includes the React frontend, the Super Admin login/dashboard screens, Capacitor configuration, and a GitHub Actions workflow that builds a debug Android APK.

## Backend connection
The Super Admin screens use `https://anpr-api.gconnectt.com`.

`capacitor.config.json` enables Capacitor's native HTTP patch (`CapacitorHttp.enabled: true`) for Android requests. The backend CORS configuration should include the Capacitor WebView origin `https://localhost` for browser-style requests.

## Build APK with GitHub Actions
1. Upload/push the contents of the `anpr` folder to the intended frontend GitHub repository.
2. In GitHub, open **Actions** and run **Build PTag Admin Android APK** (or push to `main`/`master`).
3. Open the completed workflow run and download the `PTag-Admin-APK` artifact.
4. Install the downloaded debug APK on your Android device.

## Notes
- This is the app source ZIP, not a prebuilt APK.
- The APK build and live Android login have not been verified from this environment. After building, test username/password, OTP verification, and dashboard loading on the device.
- The login screen now surfaces the fetch/network error text to make connection failures easier to diagnose.
