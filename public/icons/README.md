# PWA Icons

This directory should contain the following icon files for the Progressive Web App functionality:

1. `icon-192x192.png` - 192x192 pixel icon for Android and other platforms
2. `icon-512x512.png` - 512x512 pixel icon for Android and other platforms

You can generate these icons from your application logo using tools like:
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [Favicon Generator](https://realfavicongenerator.net/)
- [App Icon Generator](https://appicon.co/)

These icons are referenced in:
- The web app manifest file (`/public/manifest.json`)
- The Vite PWA plugin configuration (`/vite.config.js`)
- The HTML file for Apple touch icons (`/index.html`)

Please ensure these files are created before building the application for production.