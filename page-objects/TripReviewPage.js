class TripReviewPage {
  // Element identifiers as constants
  get checkoutButton() { return $('~Check out Button'); }

  // Behaviors
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}

module.exports = TripReviewPage;