# PTag Admin Android package

This package uses the included local React source files; it does not fetch the Super Admin screens from GitHub.

## Super Admin screen files
- `src/components/SuperAdminLogin.jsx`
- `src/components/SuperAdminLogin.css`
- `src/components/SuperAdminDashboard.jsx`
- `src/components/SuperAdminDashboard.css`

The API base URL in the Super Admin screens is `https://anpr-api.gconnectt.com`. The backend is not modified. Capacitor native HTTP is enabled in `capacitor.config.json` to avoid WebView browser CORS restrictions for native HTTP requests.

## Build APK without Android Studio
1. Upload this project to a GitHub repository (or replace the files in your existing frontend repo).
2. Ensure `.github/workflows/android-apk.yml` is present.
3. Open the repository's **Actions** tab.
4. Choose **Build PTag Admin Android APK** and click **Run workflow**.
5. When it completes, open the workflow run and download the **PTag-Admin-APK** artifact.

## Login behavior
The included login retains the username/password plus email OTP flow because the deployed backend may require OTP. If the server is configured to require OTP, removing the OTP step only in the frontend cannot make it issue a token; that would require a backend authentication change.
