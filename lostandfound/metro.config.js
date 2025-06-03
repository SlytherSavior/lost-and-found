const { getDefaultConfig } = require("@expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const updatedConfig = withNativeWind(config, {
  input: "./app/globals.css",
});

updatedConfig.resolver.sourceExts.push("cjs");
updatedConfig.resolver.unstable_enablePackageExports = false;

module.exports = updatedConfig;
