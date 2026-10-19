# Publishing to the App Store and Google Play

In order. Steps marked **(owner)** need the store account owner — create both
accounts **in the client's company name**, since the client will own the app.

## 0. Decide before submitting to Apple

Apple reviews every app by hand. Three things in the dashboard today would get
the iPhone app rejected:

1. **Selling plans (Guideline 3.1.1).** Billing and `/start` sell Sidekick plans
   through BOG/TBC. Inside an iPhone app, digital subscriptions must use Apple's
   in-app purchase (Apple keeps 15–30%), or the app must not sell or link to
   buying them at all. Usual choice for business tools: hide buying in the iPhone
   app; customers subscribe on the website. Decide with the client.
2. **Account deletion (5.1.1(v)).** People can sign up in the app, so they must
   be able to delete their *account* in the app. Today only a business can be
   deleted.
3. **Privacy policy.** Both stores require a public link. Ours
   (`sidekick.ge/privacy`) is still a draft waiting for a lawyer.

Google Play has no rule like 1, but 2 and 3 apply there too.

## 1. Accounts (owner)

| Store | Cost | Notes |
| --- | --- | --- |
| Apple Developer Program — developer.apple.com/programs | $99 / year | A company needs a free **D-U-N-S number** first (takes days) |
| Google Play Console — play.google.com/console | $25 once | Choose **Organization**: personal accounts must run a 14-day test with 12 testers before going public |

## 2. Push notifications — one-time setup

**Apple (owner):** developer.apple.com → Certificates, IDs & Profiles → Keys →
**+** → name "Sidekick push" → tick *Apple Push Notifications service* →
Continue → **Download** the `.p8` file (one chance only). Note the Key ID and
the Team ID. Put them on Vercel as described in SideKick `docs/DEPLOYMENT.md`
→ "Mobile app", then redeploy.

**Google / Firebase (owner):**
1. console.firebase.google.com → **Add project** "Sidekick" (Analytics: off).
2. **Add app → Android**, package name `ge.sidekick.app` → download
   `google-services.json` → put it in `android/app/`. Then `npm run sync`.
3. ⚙ Project settings → **Service accounts** → *Generate new private key* →
   paste the whole file into Vercel as `FCM_SERVICE_ACCOUNT`, redeploy.

Without `google-services.json` the Android app builds, but asking for
notifications crashes it — add the file before testing push on Android.

## 3. iPhone

1. `npm run ios` opens Xcode. Click **App** (left) → **Signing & Capabilities**
   → **Team**: choose the company team. Leave "Automatically manage signing" on.
   *Push Notifications* is already listed there.
2. Pick an iPhone simulator at the top and press **▶** to try it.
3. Real phone: plug it in, choose it at the top, press ▶ (the phone must trust the Mac).
4. App Store Connect → **Apps → +** → New App: name "Sidekick", bundle id
   `ge.sidekick.app`, primary language Georgian.
5. In Xcode: top bar device → **Any iOS Device**, then **Product → Archive** →
   **Distribute App → App Store Connect → Upload**.
6. The build appears in **TestFlight** after ~15 minutes. Install it via the
   TestFlight app and check a notification arrives.
7. Fill in the listing (below) and **Submit for Review** (usually 1–3 days).

## 4. Android

1. `npm run android` opens Android Studio (first time: let it download the SDK).
2. Press **▶** with an emulator or a USB-connected phone to try it.
3. **Build → Generate Signed App Bundle** → Android App Bundle → **Create new**
   keystore. **Back up the keystore file and both passwords** with the owner —
   needed for every future update.
4. Play Console → **Create app** → upload the `.aab` under **Testing → Internal
   testing** first, then **Production**.
5. Fill in the listing, **Data safety** and **Content rating**, then send for
   review (hours to a few days).

## 5. Store listing — have these ready

- Name **Sidekick**; short and full description in Georgian and English.
- Screenshots: iPhone 6.9" (1320×2868) and Android phone. Take them from the
  simulator/emulator with the demo business open.
- Privacy policy URL and a support URL or e-mail.
- **A demo login for the reviewers** (Apple insists): a business with some
  conversations, leads and orders. Put it in the review notes, and explain that
  the app's value is instant notifications for new customer messages and orders.
- Privacy answers — data collected: name, e-mail, phone, messages from the
  business's customers; used for the app's function; not sold; not used to track.

## 6. Updating later

- **Dashboard changes** (`~/SideKick`): deploy the website as usual. The app
  shows them at once. No store update.
- **App changes** (this folder): raise the version — Xcode: App → General →
  Version/Build; Android: `versionCode` and `versionName` in
  `android/app/build.gradle` — then repeat steps 3.5–3.7 and 4.3–4.5.
