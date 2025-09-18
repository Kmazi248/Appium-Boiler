// Scroll until a list item with given text is visible, then return it
export async function androidScrollToText(text: string) {
  // Option A (most explicit): pass a UiSelector to scrollIntoView(...)
  const uiSelector = `new UiSelector().text("${text}")`;
  const scrollable = 'new UiScrollable(new UiSelector().scrollable(true))';
  const selector = `android=${scrollable}.scrollIntoView(${uiSelector})`;
  return $(selector);

  // Option B (also valid): scrollTextIntoView("...")
  // return $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${text}")`);
}


type Direction = 'left' | 'right' | 'up' | 'down';

/** Swipe across the screen in a direction. */
export async function swipeOnScreen(direction: Direction, distance = 0.6, duration = 300): Promise<void> {
  const { width, height } = await driver.getWindowSize();
  const cx = Math.floor(width * 0.5);
  const cy = Math.floor(height * 0.5);
  const dx = Math.floor(width * distance * 0.5);
  const dy = Math.floor(height * distance * 0.5);

  let startX = cx, startY = cy, endX = cx, endY = cy;
  if (direction === 'left')  { startX = cx + dx; endX = cx - dx; }
  if (direction === 'right') { startX = cx - dx; endX = cx + dx; }
  if (direction === 'up')    { startY = cy + dy; endY = cy - dy; }
  if (direction === 'down')  { startY = cy - dy; endY = cy + dy; }

  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: startX, y: startY },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration },
      { type: 'pointerMove', duration, x: endX, y: endY },
      { type: 'pointerUp', button: 0 },
    ],
  }]);
  await driver.releaseActions();
  await driver.pause(100); // let UI settle
}

/** Swipe inside a specific element (e.g., tab bar / carousel). */
export async function swipeOnElement(
  el: WebdriverIO.Element,
  direction: Direction,
  distance = 0.8,
  duration = 300
): Promise<void> {
      const elem = await el;    
        const { x, y } = await elem.getLocation();
  const { width, height } = await elem.getSize();             // resolve ChainablePromiseElement if needed

  const location = await el.getLocation();
  const size = await el.getSize();
  const start = { x: Math.floor(location.x + size.width * 0.5), y: Math.floor(location.y + size.height * 0.5) };
  const dx = Math.floor(size.width * distance * 0.5);
  const dy = Math.floor(size.height * distance * 0.5);

  const end = { ...start };
  if (direction === 'left')  end.x = start.x - dx;
  if (direction === 'right') end.x = start.x + dx;
  if (direction === 'up')    end.y = start.y - dy;
  if (direction === 'down')  end.y = start.y + dy;

  await driver.performActions([{
    type: 'pointer',
    id: 'finger1',
    parameters: { pointerType: 'touch' },
    actions: [
      { type: 'pointerMove', duration: 0, x: start.x, y: start.y },
      { type: 'pointerDown', button: 0 },
      { type: 'pause', duration },
      { type: 'pointerMove', duration, x: end.x, y: end.y },
      { type: 'pointerUp', button: 0 },
    ],
  }]);
  await driver.releaseActions();
  await driver.pause(100);
}

type AnyEl = WebdriverIO.Element |
  WebdriverIO.ChainablePromiseElement<WebdriverIO.Element>;

/** Return element center (x,y) */
export async function elementCentre(el: AnyEl) {
  const elem = await el; // resolve if it's a ChainablePromiseElement
  const [loc, size] = await Promise.all([elem.getLocation(), elem.getSize()]);
  return {
    x: Math.floor(loc.x + size.width / 2),
    y: Math.floor(loc.y + size.height / 2),
  };
}

export async function dragAndDrop(
    source: WebdriverIO.Element,
    target: WebdriverIO.Element,
    holdMS = 600,
    moveDuration = 800
): Promise<void> {
    const start = await elementCentre(source);
    const end = await elementCentre(target);

    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            { type: 'pointerMove', duration: 0, x: start.x, y: start.y },
            {type: 'pointerDown', button: 0 },
            { type: 'pause', duration: holdMS },
            { type: 'pointerMove', duration: moveDuration, x: end.x, y: end.y },
            { type: 'pointerUp', button: 0},
        ]
}]);
    await driver.releaseActions();
    await driver.pause(100);
}

export async function dragByOffset(
    EL: WebdriverIO.Element,
    xOffset: number,
    yOffset: number,
    holdMS = 200,
    moveDuration = 600
): Promise<void> {
    const start = await elementCentre(EL);
  const end = {
    x: start.x + Math.floor(xOffset),
    y: start.y + Math.floor(yOffset),
    };

    await driver.performActions([{
        type: 'pointer',
        id: 'finger1',
        parameters: { pointerType: 'touch' },
        actions: [
            {type: 'pointerMove', duration: 0, x: start.x, y: start.y },
            {type: 'pointerDown', button: 0 },
            { type: 'pause', duration: holdMS },
            { type: 'pointerMove', duration: moveDuration, x: end.x, y: end.y },
            { type: 'pointerUp', button: 0},        
        ]
}]);
 await driver.releaseActions();
 await driver.pause(100);
}