
// tests/specs/apidemos/00.scroll.webview.e2e.ts
import { androidScrollToText } from '../../helpers/gestures.js';

describe('@gestures Scroll - find webview in Views list', () => {
  it('should scroll to WebView item', async () => {
    // open Views menu
    await $('android=new UiSelector().text("Views")').click();

    // scroll to the list row and tap it
    const row = await androidScrollToText('WebView');
    await row.click();

    // assert we’re on the WebView demo screen
    await $('android=new UiSelector().className("android.webkit.WebView")')
      .waitForDisplayed({ timeout: 8000 });
  });
});
