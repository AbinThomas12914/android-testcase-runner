class StaysPage {
  // Element identifiers as constants
  get STAYS_SCREEN_IDENTIFIER() {
    return driver.findElementByXPath("//*[@text='Stays Screen Identifier']"); 
  }

  // Behaviours
  async isStaysScreenDisplayed() {
    return await this.STAYS_SCREEN_IDENTIFIER.isDisplayed();
  }
}

module.exports = StaysPage;