// config/wdio.saucelabs.conf.ts
import { config as baseConfig } from './wdio.shared.local.appium.conf.js';
import path from 'node:path';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  specs: [path.join(process.cwd(), 'tests', 'specs', 'saucelabs', '**', '*.e2e.ts')],

  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

  framework: 'mocha',
  mochaOpts: { ui: 'bdd', timeout: 120000 },

   
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Pixel_8',
    'appium:platformVersion': '14',
    'appium:app': path.join(process.cwd(), 'apps', 'android', 'Android.SauceLabs.Mobile.Sample.app.2.7.1.apk'),
    'appium:autoGrantPermissions': true,
    // 'appium:appPackage': 'com.saucelabs.mydemoapp.rn',
    // 'appium:appActivity': '.MainActivity',
  }],
beforeTest: async () => {
  try { await driver.reset(); } catch {}
  try { await driver.switchContext('NATIVE_APP'); } catch {}
  try { await driver.setOrientation('PORTRAIT'); } catch {}
  try { await driver.hideKeyboard(); } catch {}
},
  


};
