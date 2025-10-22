class SearchScreen {
  // Element identifiers as constants
  static LEAVING_FROM_FIELD_XPATH = "//android.widget.EditText[@resource-id='SearchLocationInput']";

  // Attributes (Element getters)
  get leavingFromField() { 
    return driver.findElement(By.xpath(SearchScreen.LEAVING_FROM_FIELD_XPATH)); 
  }

  // Behaviors (Methods)
  async activateLeavingFromField() {
    await this.leavingFromField.click();
  }
}