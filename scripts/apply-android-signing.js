#!/usr/bin/env node
/*
 * Wiggle Word Farm - inject release signing config into the generated
 * android/app/build.gradle after `expo prebuild`.
 *
 * Reads credentials from Gradle project properties (passed by CI):
 *   WIGGLE_UPLOAD_STORE_FILE
 *   WIGGLE_UPLOAD_STORE_PASSWORD
 *   WIGGLE_UPLOAD_KEY_ALIAS
 *   WIGGLE_UPLOAD_KEY_PASSWORD
 *
 * This keeps real passwords / keystores OUT of the repository. It also makes
 * the release build use the release signing config instead of debug signing.
 *
 * Run AFTER `expo prebuild --platform android` and BEFORE `gradlew assembleRelease`.
 */

const fs = require("fs");
const path = require("path");

const gradlePath = path.join(process.cwd(), "android", "app", "build.gradle");

if (!fs.existsSync(gradlePath)) {
  console.error("[signing] android/app/build.gradle not found. Run expo prebuild first.");
  process.exit(1);
}

let gradle = fs.readFileSync(gradlePath, "utf8");

if (gradle.indexOf("WIGGLE_UPLOAD_STORE_FILE") !== -1) {
  console.log("[signing] Release signing config already present. Skipping.");
  process.exit(0);
}

// 1) Add a `release` signingConfig that reads from project properties.
const signingBlock = `
        release {
            if (project.hasProperty('WIGGLE_UPLOAD_STORE_FILE')) {
                storeFile file(WIGGLE_UPLOAD_STORE_FILE)
                storePassword WIGGLE_UPLOAD_STORE_PASSWORD
                keyAlias WIGGLE_UPLOAD_KEY_ALIAS
                keyPassword WIGGLE_UPLOAD_KEY_PASSWORD
            }
        }
`;

// Insert just after the opening of `signingConfigs {`.
const signingConfigsRegex = /signingConfigs\s*\{/;
if (signingConfigsRegex.test(gradle)) {
  gradle = gradle.replace(signingConfigsRegex, (m) => m + "\n" + signingBlock);
} else {
  // Fallback: create a signingConfigs block inside android { ... }.
  gradle = gradle.replace(/android\s*\{/, (m) => `${m}\n    signingConfigs {\n${signingBlock}    }\n`);
}

// 2) Point the release buildType at the release signing config.
//    Replace the default `signingConfig signingConfigs.debug` inside release.
gradle = gradle.replace(
  /(buildTypes\s*\{[\s\S]*?release\s*\{[\s\S]*?)signingConfig\s+signingConfigs\.debug/,
  (full, head) => {
    return head + "signingConfig project.hasProperty('WIGGLE_UPLOAD_STORE_FILE') ? signingConfigs.release : signingConfigs.debug";
  }
);

fs.writeFileSync(gradlePath, gradle, "utf8");
console.log("[signing] Release signing config injected into android/app/build.gradle.");
