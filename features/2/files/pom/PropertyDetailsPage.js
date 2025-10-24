class PropertyDetailsPage {
  get selectARoomButton() {
    return driver.findElementByXPath("//android.widget.Button[contains(@content-desc, 'Select a room')]");
  }

  async submitSelectARoomButton() {
    await this.selectARoomButton.click();
  }
}