class LocationAccessPage {
  // Element identifiers as constants
  get enableLocationAccessButton() { return $("//*[@text='Enable location access']"); }

  // Behaviours
  async closePopup() {
    await this.enableLocationAccessButton.click();
  }
}

module.exports = LocationAccessPage;