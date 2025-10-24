class SearchLocationPage {
  // Element identifiers as CONSTANTS
  COCHIN_LOCATION_XPATH = "//*[@text='Cochin (COK - Cochin Intl.)' and @focusable='false']";
  GOING_TO_INPUT_XPATH = "//android.widget.EditText[@resource-id='SearchLocationInput']";
  BENGALURU_LOCATION_XPATH = "//*[@text='Bengaluru (BLR - Kempegowda Intl.)' and @focusable='false']";

  getCochinLocationElement() {
    return driver.findElement(By.xpath(this.COCHIN_LOCATION_XPATH));
  }

  async clickCochinLocation() {
    const element = await this.getCochinLocationElement();
    await element.click();
  }

  get goingToInput() { 
    return driver.findElement(By.xpath(this.GOING_TO_INPUT_XPATH)); 
  }

  clearGoingToInput() {
    this.goingToInput.clear();
  }

  enterGoingToLocation(location) {
    this.goingToInput.sendKeys(location);
  }

  selectBengaluruLocation() {
    const bengaluruElement = element(by.xpath(this.BENGALURU_LOCATION_XPATH));
    return bengaluruElement.click();
  }
}