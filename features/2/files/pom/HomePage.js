class HomePage {
  // Element identifiers as constants
  get STAYS_TAB() { 
    return driver.findElementByXPath("//*[@text='Stays']"); 
  }

  // Behaviors
  async clickStaysTab() {
    await this.STAYS_TAB.click();
  }
}