class PopupPage {
  // Element identifiers as constants
  get CLOSE_BUTTON() { 
    return driver.findElementByAccessibilityId('Close'); 
  }

  // Behaviours
  async closePopup() {
    await this.CLOSE_BUTTON.click();
  }
}