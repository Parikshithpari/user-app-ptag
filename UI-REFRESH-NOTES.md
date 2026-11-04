# PTag Admin UI refresh

This update changes only CSS presentation for the Super Admin login and dashboard. It keeps the existing React components, login + email OTP flow, API URLs, token keys, dashboard actions, and backend contract unchanged.

## Visual direction
- Graphite / midnight surfaces with electric mint accents
- Higher contrast and touch-friendly form controls
- Responsive login card and compact mobile header
- Mobile tab grid and scrollable wide vehicle-log table
- Dark, readable panels and modals
- Reduced-motion accessibility preference

## Build
Upload the contents of this `anpr` project to the same frontend repository, then run the existing GitHub Actions workflow `Build PTag Admin Android APK`. This source ZIP is not a prebuilt APK. Test the APK on the phone after the workflow finishes.
