class TripReviewPage {
  // Element identifiers as CONSTANTS
  CHECKOUT_BUTTON_ID = 'com.expedia.bookings:id/check_out_button';

  // Attributes (getters for elements)
  get checkoutButton() {
    return driver.findElementByXPath(`//android.widget.FrameLayout[@resource-id='${this.CHECKOUT_BUTTON_ID}']`);
  }

  // Behaviors (methods to interact with elements)
  clickCheckoutButton() {
    this.checkoutButton.click();
  }
}