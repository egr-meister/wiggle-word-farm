# Wiggle Word Farm - ProGuard / R8 rules.
# Conservative rules that keep the React Native + Expo runtime working in
# minified release builds. Do not add risky third-party obfuscation libraries.
#
# This file is used by android/app/build.gradle:
#   release {
#       minifyEnabled true
#       shrinkResources true
#       proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
#   }

# --- React Native core ---
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }
-dontwarn com.facebook.react.**
-dontwarn com.facebook.hermes.**

# Keep JavaScript-callable native modules and their annotations.
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod *;
}
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
}
-keep @com.facebook.proguard.annotations.DoNotStrip class * { *; }
-keepclasseswithmembernames class * {
    native <methods>;
}

# --- Expo modules ---
-keep class expo.modules.** { *; }
-dontwarn expo.modules.**

# --- expo-speech (one-way pronunciation) ---
-keep class expo.modules.speech.** { *; }

# --- AsyncStorage ---
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# --- react-native-screens / safe-area-context ---
-keep class com.swmansion.** { *; }
-keep class com.th3rdwave.safeareacontext.** { *; }

# Keep enum values used by some native modules.
-keepclassmembers enum * {
    public static **[] values();
    public static ** valueOf(java.lang.String);
}

# Keep Parcelable implementations.
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}
