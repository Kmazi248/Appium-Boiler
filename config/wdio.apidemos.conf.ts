
import { config as baseConfig } from './wdio.shared.local.appium.conf.js';
import path from 'node:path';

export const config = {
  ...baseConfig,

  // ensure specs are included
  specs: [path.join(process.cwd(), 'tests', 'specs', 'apidemos', '**', '*.e2e.ts')],

  // make sure we're pointed at a local Appium server
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',             // Appium v2 default

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    // no "require" needed in ESM
  },

  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Pixel_8',
    'appium:platformVersion': '14',
    'appium:app': path.join(process.cwd(), 'apps', 'android', 'ApiDemos-debug.apk'),
    'appium:autoGrantPermissions': true,
    // optional: auto-boot the emulator if you want
     'appium:avd': 'Pixel_8',
  }],

  // default full run (absolute glob)
  suites: {
    gestures_all: [path.join(process.cwd(), 'tests', 'specs', 'apidemos', '**', '*.e2e.ts')],
    scroll_webview: [path.join(process.cwd(), 'tests', 'specs', 'apidemos', '00.scroll.webview.e2e.ts')],
    tabs_swipe:     [path.join(process.cwd(), 'tests', 'specs', 'apidemos', '01.tabs.swipe.e2e.ts')],
    saucelabs_all:  [path.join(process.cwd(), 'tests', 'specs', 'saucelabs', '**', '*.e2e.ts')],
    specs: [path.join(process.cwd(), 'tests', 'specs', 'apidemos', '**', '*.e2e.ts')],

  },
};
