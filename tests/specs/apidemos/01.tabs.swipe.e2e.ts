import { androidScrollToText, swipeOnElement } from '../../helpers/gestures.js';

describe('@gestures Swipe - Tabs • Scrollable', () => {
  it('Swipes the tab bar until TAB 10 is visible and selects it', async () => {
    await $('android=new UiSelector().text("Views")').click();

    (await androidScrollToText('Tabs')).click();
    (await androidScrollToText('5. Scrollable')).click();

    // Tab bar container on this screen
    const tabBar = await $('android=new UiSelector().resourceId("android:id/tabs")');

    let found = false;
    for (let i = 0; i < 8; i++) {
      const tab10 = await $('android=new UiSelector().text("TAB 10")');
      if (await tab10.isDisplayed()) {
        await tab10.click();
        found = true;
        break;
      }
      await swipeOnElement(tabBar as unknown as WebdriverIO.Element, 'left', 0.8);
 // swipe the tab strip
    }

    if (!found) throw new Error('TAB 10 not found after 8 swipes');

    await $('android=new UiSelector().textContains("10")').waitForDisplayed({ timeout: 5000 });
  });
});
