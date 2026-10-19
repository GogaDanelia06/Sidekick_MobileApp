import type { CapacitorConfig } from "@capacitor/cli";

/**
 * The app is a native shell around the live dashboard: it opens
 * SIDEKICK_URL (sidekick.ge by default) and adds what a website cannot have —
 * a home-screen icon, a store listing and real push notifications.
 *
 * For local testing against `pnpm dev` in ~/SideKick, see the `dev:*`
 * scripts in package.json (the Android emulator reaches this Mac as 10.0.2.2).
 */
const url = process.env.SIDEKICK_URL ?? "https://sidekick.ge/dashboard";

const config: CapacitorConfig = {
  // Permanent once published — the stores identify the app by it.
  appId: "ge.sidekick.app",
  appName: "Sidekick",
  webDir: "www",

  // The website reads this to know it is inside the app (hide Google sign-in,
  // ask for notification permission, …). See ~/SideKick docs/DEPLOYMENT.md → "Mobile app".
  appendUserAgent: "SidekickApp",
  backgroundColor: "#0d1117",

  server: {
    url,
    cleartext: url.startsWith("http://"),
    errorPath: "offline.html",
  },

  ios: {
    contentInset: "automatic",
    limitsNavigationsToAppBoundDomains: false,
  },

  android: {
    allowMixedContent: false,
  },

  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#0d1117",
      showSpinner: false,
    },
    PushNotifications: {
      // Show the banner even while the app is open on another screen.
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
};

export default config;
