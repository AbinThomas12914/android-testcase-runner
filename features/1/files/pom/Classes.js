
class PopupPage {
  closePopup() {
    driver.findElementByAccessibilityId('Close').click();
  }
}

class LocationPromptPage {
  get notNowButton() { return driver.findElement(By.xpath("//*[@text='Not now']")); }

  closePrompt() {
    this.notNowButton.click();
  }
}

class HomePage {
  get flightsTab() {
    return driver.findElementByXPath("//*[@text='Flights']");
  }

  clickFlightsTab() {
    this.flightsTab.click();
  }
}

class FlightSearchPage {
  async clickOneWayTab() {
    await element(by.text('One-way')).tap();
  }

  leavingFromButton() {
    return driver.findElementByXPath("//android.view.View[@content-desc='Leaving from Button Bengaluru (BLR-Kempegowda Intl.)']");
  }

  clickLeavingFromButton() {
    this.leavingFromButton().click();
  }

  async tapGoingToField() {
    await element(by.id('GoingToButton')).tap();
  }

  get searchButton() {
    return driver.findElementByXPath("//android.widget.TextView[@resource-id='buttonLabel' and @text='Search']");
  }

  clickSearchButton() {
    this.searchButton.click();
  }
}

class SearchPage {
  leavingFromField() {
    return driver.findElement(By.xpath("//*[@resource-id='SearchLocation']"));
  }

  tapLeavingFromField() {
    this.leavingFromField().click();
  }

  get leavingFromInput() { return driver.findElement(By.xpath("//*[@resource-id='SearchLocationInput']")); }

  clearLeavingFrom() {
    this.leavingFromInput.clear();
  }

  enterLeavingFrom(location) {
    this.leavingFromInput.sendKeys(location);
  }
}

class SearchLocationPage {
  getCochinLocationElement() {
    return driver.findElement(By.xpath("//*[@text='Cochin (COK - Cochin Intl.)' and @focusable='false']"));
  }

  async clickCochinLocation() {
    const element = await this.getCochinLocationElement();
    await element.click();
  }

  get goingToInput() { return driver.findElement(By.xpath("//android.widget.EditText[@resource-id='SearchLocationInput']")); }

  clearGoingToInput() {
    this.goingToInput.clear();
  }

  enterGoingToLocation(location) {
    this.goingToInput.sendKeys(location);
  }

  selectBengaluruLocation() {
    const bengaluruElement = element(by.xpath("//*[@text='Bengaluru (BLR - Kempegowda Intl.)' and @focusable='false']"));
    return bengaluruElement.click();
  }
}

class SearchScreen {
  get goingToLabel() {
    return driver.findElementByXPath("//*[@text='Going to']");
  }

  tapGoingToLabel() {
    this.goingToLabel.click();
  }
}

class FlightSelectionPage {
  selectFirstFlightWithAirIndia() {
    const flightElement = element(by.xpath("//androidx.cardview.widget.CardView[contains(@content-desc, 'Air India')]"));
    return flightElement.click();
  }

  selectFirstFlight() {
    element(by.text('Select')).click();
  }
}

class TripReviewPage {
  get checkoutButton() {
    return driver.findElementByXPath("//android.widget.FrameLayout[@resource-id='com.expedia.bookings:id/check_out_button']");
  }

  clickCheckoutButton() {
    this.checkoutButton.click();
  }
}
