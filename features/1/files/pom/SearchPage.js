class SearchPage {
  // Element identifiers as CONSTANTS
  LEAVING_FROM_FIELD_XPATH = "//*[@resource-id='SearchLocation']";
  LEAVING_FROM_INPUT_XPATH = "//*[@resource-id='SearchLocationInput']";

  // Attributes (getters for elements)
  leavingFromField() {
    return driver.findElement(By.xpath(this.LEAVING_FROM_FIELD_XPATH));
  }

  get leavingFromInput() {
    return driver.findElement(By.xpath(this.LEAVING_FROM_INPUT_XPATH));
  }

  // Behaviors (methods)
  tapLeavingFromField() {
    this.leavingFromField().click();
  }

  clearLeavingFrom() {
    this.leavingFromInput.clear();
  }

  enterLeavingFrom(location) {
    this.leavingFromInput.sendKeys(location);
  }
}