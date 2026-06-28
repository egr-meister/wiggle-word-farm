# Wiggle Word Farm 🐮🌾

A calm, offline English vocabulary app for young children, built with React Native and Expo. Children visit a friendly little farm and learn simple farm words through word cards, picture matching, and gentle one-way pronunciation. A small mascot named **Wiggle** helps along the way.

This is **not** an ABC / alphabet app. It teaches practical farm vocabulary, not letters.

## Features

- Four farm vocabulary areas: **Animal Barn**, **Food Garden**, **Color Fence**, and **Tool Shed**.
- Large, colorful **word cards** with a picture and a short example sentence.
- Two mini-games — **Find the Word** and **Match Word and Picture** — plus an optional **Listen and Choose** mode when device speech is available.
- Three difficulty levels: **Easy** (2 choices), **Medium** (3 choices), **Hard** (4 choices, mixed areas, still child-friendly).
- Local progress tracking: words learned, correct/incorrect answers, progress by area and by game, and farm-sticker **achievements**.
- Gentle one-way pronunciation support (the app speaks, the child listens).
- Parent settings for word voice and default difficulty.
- Fully offline. No internet. No runtime permissions.

## Difference from ABC alphabet apps

Wiggle Word Farm focuses on **whole farm words** (cow, apple, red, shovel) paired with pictures. There is no A–Z ordering, no letter tracing, no letter sounds, and no "A is for Apple" screens. Children practice word recognition, word–picture matching, and category learning in a playful farm setting.

## Farm vocabulary learning rules

- Words are grouped into four farm areas (Animals, Food, Colors, Tools), each with at least six words.
- Opening a word card marks that word as **learned** locally.
- Games ask one calm question at a time and save correct/incorrect results locally.
- Answer choices always include the correct answer and never contain duplicates.
- Hard mode mixes areas but keeps choices simple and unconfusing.

## Child safety notes

Wiggle Word Farm is a calm offline English vocabulary app for children. It does **not** use ads, purchases, accounts, internet access, speech recognition, voice recording, social sharing, or personal data collection. There are **no coins, bonuses, jackpots, or real money rewards** and no gambling-style mechanics. Achievements are simple local learning markers and have **no money value**.

## Pronunciation / word voice note

Pronunciation uses local text-to-speech (`expo-speech`) only. It is **one-way**: the app speaks a word and the child listens. It can be turned on or off in Parent Settings (default: **On**). If word voice is unavailable on the device, the app continues with visual word cards and never crashes.

## No speech recognition / no voice recording

The app never listens to or records the child. There is no microphone use, no speech recognition, and no stored voice data.

## No timer / no pressure

There are no timers, countdowns, penalties, rankings, or leaderboards. Feedback is always gentle: "Great word!" for a correct answer and "Good try. The word was: …" otherwise.

## No internet / no permissions

The app requests **no** runtime permissions and has **no** `INTERNET` permission. It uses static local vocabulary data and AsyncStorage only.

## Airplane mode support

Because the app is fully offline, it works completely in airplane mode.

## Fullscreen sticky immersive mode

On Android the app uses an edge-to-edge, fullscreen sticky immersive layout (via `SystemBars` from `react-native-edge-to-edge`), hiding the status and navigation bars during use. System bars may reappear briefly after an edge swipe.

## Portrait only

Orientation is locked to **portrait**.

## Safe area

Safe-area handling keeps content clear of notches, camera cutouts, and rounded corners.

## Keep awake only on the game screen

The device is kept awake (via `expo-keep-awake`) **only** on the active `WordGameScreen`, and the keep-awake is released when leaving it. Settings, progress, word cards, and other static screens do not keep the device awake.

## No ads / no purchases / no accounts / no data collection

No ads, no in-app purchases, no account registration, no analytics, no Firebase, no external APIs, and no behavioral tracking. All data stays on the device.

## No coins / no bonus / no jackpot / no real money rewards

The app contains no money-style mechanics of any kind. Achievements are learning markers only.

## Achievements and progress

Progress and achievements are stored locally with AsyncStorage:

1. **First Farm Word Badge** — learn 1 word
2. **Animal Barn Badge** — learn 5 animal words
3. **Food Garden Badge** — learn 5 food words
4. **Color Fence Badge** — learn 5 color words
5. **Tool Shed Badge** — learn 5 tool words
6. **Farm Word Star** — answer 25 questions correctly

These have no monetary value and can be reset at any time in My Progress or cleared entirely in Parent Settings.

## App icon and splash screen concept

- **App icon:** Wiggle the worm smiling in front of a small barn, with a "cow" word card and a soft farm hill on a warm cream / soft-green background.
- **Splash screen:** a calm pastel farm scene with Wiggle near a barn sign, floating word cards (cow, apple, red, hat), a color fence, the app name **Wiggle Word Farm**, and the subtitle "Learn farm words and match pictures."

Custom assets live in `assets/icon.png`, `assets/adaptive-icon.png`, and `assets/splash.png`. The default Expo icon and splash are **not** used.

## Wiggle Farm Words visual style

Bright but calm. Pure React Native Views and emoji-style symbols draw the mascot, farm cards, word cards, picture cards, and progress badges. No external art packs, no heavy SVG libraries, no stressful animation.

---

## Project structure

```
App.js
app.json
package.json
package-lock.json
babel.config.js

assets/
  icon.png
  adaptive-icon.png
  splash.png

src/
  navigation/AppNavigator.js
  screens/        (7 screens)
  components/      (13 components)
  data/           (categoryItems, vocabularyItems, gameModeItems, achievementItems)
  utils/          (vocabulary, word game, question builder, stats, progress,
                   speech, sound, animation, immersive, date helpers)
  storage/appStorage.js
  theme/colors.js

android/app/proguard-rules.pro    (release rules reference)
scripts/apply-android-signing.js  (CI signing injection)
.github/workflows/android-build.yml
```

---

## How to scaffold with the official Expo template

This project follows the standard Expo layout. To create an equivalent fresh project base:

```bash
npx create-expo-app wiggle-word-farm --template blank
```

Then copy the `App.js`, `app.json`, `assets/`, and `src/` files from this repository into the new project.

## How to install dependencies

Always install/align packages with Expo so versions match the SDK:

```bash
npm install
npx expo install --fix
```

If you add a package, install it with `npx expo install <package-name>` rather than editing versions by hand.

## How to run locally

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo install --check
npx expo start
```

Press `a` to open on an Android device/emulator, or run:

```bash
npx expo run:android
```

## How to build Android

This project uses Expo's native generation (`expo prebuild`) plus Gradle. Android targets **API 35** with **Build Tools 35.0.0** via `expo-build-properties` in `app.json` (`compileSdkVersion 35`, `targetSdkVersion 35`, `minSdkVersion 24`).

```bash
# Generate the native android/ project
npx expo prebuild --platform android --no-install

# Inject the release signing config (reads Gradle properties)
node scripts/apply-android-signing.js

# Build release artifacts
cd android
./gradlew assembleRelease   # APK
./gradlew bundleRelease     # AAB
```

Signed builds pass the keystore details as Gradle properties, e.g.:

```bash
./gradlew assembleRelease \
  -PWIGGLE_UPLOAD_STORE_FILE=release.keystore \
  -PWIGGLE_UPLOAD_STORE_PASSWORD="$ANDROID_KEYSTORE_PASSWORD" \
  -PWIGGLE_UPLOAD_KEY_ALIAS="$ANDROID_KEY_ALIAS" \
  -PWIGGLE_UPLOAD_KEY_PASSWORD="$ANDROID_KEY_PASSWORD"
```

## How to generate a PKCS12 keystore

Use the **same password** for the store and the key (different passwords can break PKCS12 signing):

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore wiggle-word-farm-release-key.p12 \
  -alias wiggle_word_farm_key \
  -keyalg RSA -keysize 2048 -validity 10000
```

Convert it to base64 for GitHub Secrets:

```bash
# macOS / Linux
base64 -i wiggle-word-farm-release-key.p12 -o keystore-base64.txt
# or
base64 wiggle-word-farm-release-key.p12 > keystore-base64.txt
```

## How to add GitHub Secrets

In your repository: **Settings → Secrets and variables → Actions → New repository secret**, and add:

- `ANDROID_KEYSTORE_BASE64` — contents of `keystore-base64.txt`
- `ANDROID_KEYSTORE_PASSWORD` — the keystore/key password
- `ANDROID_KEY_ALIAS` — `wiggle_word_farm_key`
- `ANDROID_KEY_PASSWORD` — the same password as the keystore

**Never commit a real keystore or password to the repository.**

## GitHub Actions build explanation

`.github/workflows/android-build.yml` runs on push to `main` and:

1. Installs Node.js and JDK 17.
2. Runs `npm install`, then `npx expo install --fix`, `npx expo-doctor`, and `npx expo install --check`.
3. Installs Android SDK Platform 35 and Build Tools 35.0.0 (`sdkmanager "platforms;android-35" "build-tools;35.0.0"`).
4. Runs `expo prebuild` and injects the release signing config.
5. Builds a signed release **APK** and **AAB**.
6. Uploads `wiggle-word-farm-release.apk` and `wiggle-word-farm-release.aab` as artifacts.

The CI does **not** run an emulator smoke-test; launch verification is a local step (below).

## Google Play compatibility notes

- Targets **API level 35** (`targetSdkVersion 35`, `compileSdkVersion 35`) — satisfies the "must target at least API level 35" requirement.
- Expo SDK 53 / React Native 0.79 produce 16 KB-page-size compatible native libraries, satisfying the "must support 16 KB memory page sizes" requirement for Android 15+.
- No Firebase, ads, analytics, payment, or external native SDKs.
- The release **AAB** (`bundleRelease`) is the file to upload to Google Play.

## Release optimization (staged)

Minification is staged for stability:

1. Build and verify a **non-minified** release first. `app.json` ships with
   `enableProguardInReleaseBuilds: false` and `enableShrinkResourcesInReleaseBuilds: false`.
2. After the non-minified release launches successfully on a device, enable
   minification by setting both to `true` in `app.json` and re-running prebuild + build:

   ```json
   "enableProguardInReleaseBuilds": true,
   "enableShrinkResourcesInReleaseBuilds": true
   ```

   The R8/ProGuard keep-rules in `android/app/proguard-rules.pro` (also injected via
   `extraProguardRules`) keep the React Native + Expo runtime working.
3. Re-test the app launch locally after enabling minify and resource shrinking.

## Local launch verification checklist

A green CI build is **not** proof the app launches. Before release:

1. Build the release APK.
2. Install it on a physical Android device or local emulator:
   ```bash
   adb install android/app/build/outputs/apk/release/app-release.apk
   ```
3. Launch the app and watch logs:
   ```bash
   adb logcat | grep -i "ReactNative\|Expo\|AndroidRuntime"
   ```
4. Confirm there are **no** errors such as:
   - "Cannot find native module"
   - "Module has not been registered"
   - "Invariant Violation"
   - "theme.fonts.regular is undefined"
5. Confirm: portrait lock, fullscreen immersive, safe-area spacing, keep-awake only in the game, gentle feedback, working offline in airplane mode.

## Privacy note

Wiggle Word Farm does not collect, store, or share personal information. The app works offline without internet access. Vocabulary progress, statistics, achievements, and settings are stored only on the device.

## Common commands

```bash
npm install
npx expo install --fix
npx expo-doctor
npx expo install --check
npx expo start
npx expo run:android
```
