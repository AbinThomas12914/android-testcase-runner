class PopupPage {
  get closeButton() { return driver.findElementByAccessibilityId('Close'); }

  async closePopup() {
    await this.closeButton.click();
  }
}

class LocationAccessPage {
  get enableLocationAccessButton() { return driver.findElementByXPath("//*[@text='Enable location access']"); }

  async closePopup() {
    await this.enableLocationAccessButton.click();
  }
}

class PermissionPopupPage {
  get denyButton() { return driver.findElement(By.xpath("//*[@resource-id='com.android.permissioncontroller:id/permission_deny_button']")); }

  async closePopup() {
    await this.denyButton.click();
  }
}

class HomePage {
  get flightsTab() { return driver.findElementByXPath("//*[@text='Flights']"); }

  async clickFlightsTab() {
    await this.flightsTab.click();
  }
}

class FlightSearchPage {
  get oneWayTab() { return element(by.text('One-way')); }
  get leavingFromButton() { return driver.findElementByXPath("//android.view.View[@resource-id='LeavingFromButton']"); }
  get goingToButton() { return driver.findElementByXPath("//android.view.View[@resource-id='GoingToButton']"); }
  get searchButton() { return driver.findElementByXPath("//*[@resource-id='SearchButton']"); }

  async clickOneWayTab() {
    await this.oneWayTab.tap();
  }

  async clickLeavingFromButton() {
    await this.leavingFromButton.click();
  }

  async tapGoingToField() {
    await this.goingToButton.click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}

class SearchScreen {
  get leavingFromField() { return driver.findElement(By.xpath("//android.widget.EditText[@resource-id='SearchLocationInput']")); }

  async activateLeavingFromField() {
    await this.leavingFromField.click();
  }
}

class SearchLocationPage {
  get leavingFromInput() { return driver.findElement(By.xpath("//android.widget.EditText[@resource-id='SearchLocationInput']")); }
  get goingToLabel() { return driver.findElement(By.xpath("//android.widget.TextView[@resource-id='SearchLocationInputPlaceholder' and @text='Going to']")); }
  get goingToInput() { return driver.findElement(By.xpath("//android.widget.EditText[@resource-id='SearchLocationInput']")); }

  async clearLeavingFrom() {
    await this.leavingFromInput.clear();
  }

  async enterLeavingFrom(location) {
    await this.leavingFromInput.sendKeys(location);
  }

  async selectCochinLocation() {
    const cochinElement = element(by.xpath("//*[@text='Cochin (COK - Cochin Intl.)' and @focusable='false']"));
    await cochinElement.click();
  }

  async activateLocationInput() {
    await this.goingToLabel.click();
  }

  async clearGoingToInput() {
    await this.goingToInput.clear();
  }

  async enterGoingToLocation(location) {
    await this.goingToInput.sendKeys(location);
  }

  async selectBengaluruFromList() {
    const bengaluruElement = element(by.xpath("//*[@text='Bengaluru (BLR - Kempegowda Intl.)' and @focusable='false']"));
    await bengaluruElement.click();
  }
}

class FlightSelectionPage {
  get firstAirIndiaFlight() { return element(by.xpath("//*[@resource-id='com.expedia.bookings:id/flightCell' and contains(@content-desc, 'Air India')]")); }
  get firstSelectButton() { return driver.findElement(By.xpath("(//*[@text='Select'])[1]")); }

  async selectFirstAirIndiaFlight() {
    await this.firstAirIndiaFlight.click();
  }

  async selectFirstFlight() {
    await this.firstSelectButton.click();
  }
}

class TripReviewPage {
  get checkoutButton() { return driver.findElementByAccessibilityId('Check out Button'); }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
