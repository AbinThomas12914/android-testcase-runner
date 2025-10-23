class PaymentPage {
  get payNowButton() {
    return driver.findElementByXPath("//*[@text='Pay now']");
  }

  async completeBooking() {
    await this.payNowButton.click();
  }
}