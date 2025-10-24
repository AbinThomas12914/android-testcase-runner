class SearchFormPage {
  get searchButton() {
    return driver.findElementByXPath("//android.widget.TextView[@text='Search']");
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}