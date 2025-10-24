class PopupPage {
  // Element identifiers as constants
  static CLOSE_BUTTON_ACCESSIBILITY_ID = 'Close';

  // Behaviours
  closePopup() {
    driver.findElementByAccessibilityId(PopupPage.CLOSE_BUTTON_ACCESSIBILITY_ID).click();
  }
}