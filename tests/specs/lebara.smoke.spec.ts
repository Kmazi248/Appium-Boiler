describe('Lebara App Smoke Test', () => {
  it('should launch the app successfully', async () => {
    // Give the app a moment to launch (splash/loading screen)
    await driver.pause(5000);

    // Try to fetch the current activity (Android only)
    const activity = await driver.getCurrentActivity?.().catch(() => 'unknown');
    console.log('✅ Current Activity:', activity);

    // Quick sanity check: session should be alive
    const contexts = await driver.getContexts();
    console.log('✅ Available contexts:', contexts);

    // Assert that we got something back (means app is running)
    expect(contexts.length).toBeGreaterThan(0);
  });
});
