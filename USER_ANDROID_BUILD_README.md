# PTag User Android APK source

This is a separate Android app source package for regular users, distinct from the PTag Super Admin app.

- App name: PTag User
- Android application ID: `com.ptag.user`
- Native startup route: `/userLogin`
- API base URL remains `https://anpr-api.gconnectt.com` in the existing user components.
- User login, password reset, registration, user dashboard, and payment-return routes are retained.
- Responsive overrides are tailored for phone screens: safe-area padding, touch-sized controls, smaller-screen layouts, and scrollable transaction tables. Existing functionality and API logic were not intentionally rewritten.

## Build
1. Upload the contents of this `anpr` folder to a **separate frontend GitHub repository** (recommended so the Super Admin app's source/workflow is untouched).
2. Open GitHub Actions and run **Build PTag User Android APK**.
3. Download the `PTag-User-APK` artifact.

This ZIP contains source code, not a prebuilt APK. The Android build and live device login have not been tested as part of creating this package.
