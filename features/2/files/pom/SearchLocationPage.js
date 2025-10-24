class SearchLocationPage {
  // Element identifiers as constants
  SEARCH_INPUT_FIELD_XPATH = "//android.widget.EditText[@resource-id='SearchLocationInput']";

  get searchInputField() {
    return driver.findElement(By.xpath(this.SEARCH_INPUT_FIELD_XPATH));
  }

  async activateSearchInput() {
    await this.searchInputField.click();
  }

  async clearAndEnterLocation(location) {
    await this.searchInputField.clear();
    await this.searchInputField.sendKeys(location);
  }

  async selectCochin() {
    const cochinElement = element(by.text('Cochin (COK - Cochin Intl.)'));
    await cochinElement.click();
  }
}