import { androidScrollToText, dragAndDrop } from '../../helpers/gestures.js';

describe('@gestures Drag and Drop', () => {
  it('should drag and drop an item', async () => {
    await $('android=new UiSelector().text("Views")').click();
    await (await androidScrollToText('Drag and Drop')).click();

    const dot1 = await $('android=new UiSelector().resourceId("io.appium.android.apis:id/drag_dot_1")');
    const dot2 = await $('android=new UiSelector().resourceId("io.appium.android.apis:id/drag_dot_2")');

    await dragAndDrop( dot1,  dot2);

    const result = await $(
      'android=new UiSelector().resourceId("io.appium.android.apis:id/drag_result_text")'
    );
    await expect(result).toHaveText('Dropped!');
  });
});
