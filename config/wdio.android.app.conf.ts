import { join } from "node:path";
import { config as baseConfig } from "./wdio.shared.local.appium.conf.js";

const appPath = process.env.APP_PATH || join(__dirname, "..", "apps", "android", "tes10.apk");
const avdName = process.env.AVD_NAME || "Pixel_8";
const deviceName = process.env.DEVICE_NAME || "Pixel_8";
const platformVersion = process.env.PLATFORM_VERSION || "16";
const appWaitActivity = process.env.APP_WAIT_ACTIVITY || "*";

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs: ["../tests/specs/**/*.spec.ts"],
  capabilities: [
    {
      platformName: "Android",
      "wdio:maxInstances": 1,
      "appium:deviceName": deviceName,
      "appium:avd": avdName,
      "appium:platformVersion": platformVersion,
      "appium:orientation": "PORTRAIT",
      "appium:automationName": "UiAutomator2",
      "appium:app": appPath,
      "appium:appWaitActivity": appWaitActivity,
      "appium:autoGrantPermissions": true,
      "appium:newCommandTimeout": 240
    }
  ]
};
