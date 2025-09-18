import path from 'node:path';
import { config as baseConfig } from './wdio.shared.local.appium.conf.js';

// ----- App under test & emulator settings (envs override these) -----
const appPath =
  process.env.APP_PATH ||
  path.join(process.cwd(), 'apps', 'android', 'tes10.apk');

const avdName = process.env.AVD_NAME || 'Pixel_8';
const deviceName = process.env.DEVICE_NAME || 'Pixel_8';
// Use your emulator Android version; can be overridden via env
const platformVersion = process.env.PLATFORM_VERSION || '14';
// Wildcard is fine for simple demos; tighten if your app needs it
const appWaitActivity = process.env.APP_WAIT_ACTIVITY || '*';

export const config: WebdriverIO.Config = {
  // Keep anything you already have in the shared config
  ...baseConfig,

  // ------------------------------------------------------------------
  // Tell WDIO where to connect, and also start Appium on that address
  // ------------------------------------------------------------------
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  // IMPORTANT: This launches Appium us. Remove if baseConfig already
  // starts Appium to avoid running 2 servers on the same port.
  services: [
    ...(baseConfig.services ?? []),
    [
      'appium',
      {
        // Service options
        logPath: path.join(process.cwd(), 'logs', 'appium'),
        // Process args passed to the Appium server
        args: {
          address: '127.0.0.1',
          port: 4723,
          basePath: '/', // Appium 2 default
          // relaxedSecurity: true, // uncomment if you need non-W3C endpoints
        },
      },
    ],
  ],

  // While stabilising, run a single worker so specs don’t overlap sessions
  maxInstances: 1,

  // Match both *.e2e.ts and *.spec.ts in your tests folder
  specs: [path.join(process.cwd(), 'tests', 'specs', '**', '*.{e2e,spec}.ts')],

  // Your Android capabilities
  capabilities: [
    {
      platformName: 'Android',
      // Per-cap concurrency limit (keep 1 while debugging)
      'wdio:maxInstances': 1,

      // Emulator / device settings
      'appium:deviceName': deviceName,
      'appium:avd': avdName,
      'appium:platformVersion': platformVersion,
      'appium:orientation': 'PORTRAIT',

      // Automation + app
      'appium:automationName': 'UiAutomator2',
      'appium:app': appPath,
      'appium:appWaitActivity': appWaitActivity,
      'appium:autoGrantPermissions': true,

      // Keep the server from killing idle sessions too quickly
      'appium:newCommandTimeout': 240,
    },
  ],

  // Optional: quick per-test clean slate (kept minimal)
  // beforeTest: async () => {
  //   try { await driver.reset(); } catch {}
  //   try { await driver.switchContext('NATIVE_APP'); } catch {}
  //   try { await driver.setOrientation('PORTRAIT'); } catch {}
  //   try { await driver.hideKeyboard(); } catch {}
  // },
};