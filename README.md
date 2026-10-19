# Sidekick — iPhone and Android app

The Sidekick dashboard (sidekick.ge) as a real app in the App Store and Google
Play, with push notifications for new messages, leads and orders.

It is a **Capacitor** app: a native shell that opens `https://sidekick.ge/dashboard`
in a built-in browser view and adds what a website cannot have. All screens
come from the website, so **a change to the website is in the app at once**,
with no store update. A new store version is only needed when something in
this folder changes (icon, name, plugins, native settings).

| Part | Where |
| --- | --- |
| App settings (id, name, URL) | `capacitor.config.ts` |
| iPhone project (open in Xcode) | `ios/` |
| Android project (open in Android Studio) | `android/` |
| No-internet screen | `www/offline.html` |
| Icon and splash sources | `assets/src/*.svg` → `npm run icons` |
| Push — website side | `~/SideKick`: `lib/app/`, `lib/push/`, `components/dashboard/AppBridge.tsx` |
| Push — server keys | `~/SideKick` `docs/DEPLOYMENT.md` → "Mobile app" |
| Publishing | [docs/STORES.md](docs/STORES.md) |

## What you need on the Mac

- **Xcode** (Mac App Store) — builds the iPhone app.
- **Android Studio** (developer.android.com/studio) — builds the Android app.
- Node.js 22 or newer, and `npm install` once in this folder.

## Everyday commands

```bash
npm run sync        # after any change in this folder: copies settings into ios/ and android/
npm run ios         # opens the iPhone project in Xcode — press ▶ to run on a simulator
npm run android     # opens the Android project in Android Studio — press ▶
npm run icons       # re-renders the icon and splash screen from assets/src
```

**Testing against your local SideKick** (`pnpm dev` running in `~/SideKick`):

```bash
npm run dev:ios       # iPhone simulator → http://localhost:3000
npm run dev:android   # Android emulator → the emulator's localhost:3000 is forwarded to this Mac
```

Use `localhost`, not the emulator's usual `10.0.2.2` address: sign-in sends you
back to `AUTH_URL` (`http://localhost:3000`), so the address must match.

Run `npm run sync` afterwards so the next normal build points at sidekick.ge again.

## How push notifications work

1. On first launch the dashboard asks "Allow notifications?" (only inside the app).
2. The phone gets a push address from Apple or Google; the dashboard sends it
   to the server (`registerAppDevice`), tied to the person and business signed in.
3. When a customer writes, or the AI records a lead or an order, the server
   sends a notification to every team member's phone for that business.
4. A tap opens that conversation, the leads page or the orders page.
5. Signing out removes the phone, so it stops getting notifications.

Push needs one-time setup that only the account owner can do — Apple key,
Firebase project. Step by step in [docs/STORES.md](docs/STORES.md).

## Things to know

- **Android builds use Java 21.** Android Studio comes with Java 25, which this
  Gradle version cannot run on; `android/gradle/gradle-daemon-jvm.properties`
  makes it pick Java 21. A Mac without it: install Temurin 21 (adoptium.net).
  The first Android build downloads a lot and can take 20 minutes.
- **`www/dashboard/` must stay.** It is never shown, but Capacitor on iPhone
  refuses to start unless a local folder matches `appStartPath`.

- **The app id `ge.sidekick.app` is permanent** once published. Change it in
  `capacitor.config.ts`, `ios/App/App.xcodeproj` and `android/app/build.gradle`
  before the first upload if the client wants a different one.
- **iPhone only on Apple** (no iPad layout to review); iPads can still run the
  iPhone version.
- **Google sign-in is hidden in the app** — Google refuses sign-in inside
  apps. Email and password work.
- **Updating Capacitor:** keep `@capacitor/core` and
  `@capacitor/push-notifications` at the same versions here and in SideKick's
  `package.json`.
