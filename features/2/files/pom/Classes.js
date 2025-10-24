class SignInScreen {
  get signInWithGoogleButton() {
    return driver.findElementByXPath("//*[@text='Sign in with Google']");
  }

  async verifySignInWithGoogleButtonIsAvailable() {
    const element = await this.signInWithGoogleButton;
    if (!element) {
      throw new Error("Sign in with Google button is not available");
    }
  }
}

class PopupPage {
  get closeButton() { 
    return driver.findElementByAccessibilityId('Close'); 
  }

  async closePopup() {
    await this.closeButton.click();
  }
}

class LocationAccessPopup {
  get enableLocationAccessButton() { 
    return driver.findElement(By.xpath("//*[@text='Enable location access']")); 
  }

  async closePopup() {
    await this.enableLocationAccessButton.click();
  }
}

class PermissionPopup {
  get denyButton() {
    return driver.findElementByXPath("//*[@text='Deny']");
  }

  async closePopup() {
    await this.denyButton.click();
  }
}

class HomePage {
  get staysTab() { 
    return driver.findElementByXPath("//*[@text='Stays']"); 
  }

  async clickStaysTab() {
    await this.staysTab.click();
  }
}

class SearchLocationPage {
  get searchInputField() {
    return driver.findElement(By.xpath("//android.widget.EditText[@resource-id='SearchLocationInput']"));
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

class SearchFormPage {
  get searchButton() {
    return driver.findElementByXPath("//android.widget.TextView[@text='Search']");
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }
}

class HotelSearchResultsPage {
  async clickOnFirstHotel() {
    await element(by.text('Courtyard by Marriott Kochi Airport')).tap();
  }
}

class PropertyDetailsPage {
  get selectARoomButton() {
    return driver.findElementByXPath("//android.widget.Button[contains(@content-desc, 'Select a room')]");
  }

  async submitSelectARoomButton() {
    await this.selectARoomButton.click();
  }
}

class RoomSelectionPage {
  get twinBedsRoom() {
    return driver.find_element(AppiumBy.XPATH, "//android.widget.TextView[@text='Room, 2 Twin Beds, Non Smoking']");
  }

  get reserveButton() {
    return driver.findElementByAccessibilityId("Select and customize, Room, 2 Twin Beds, Non Smoking, Breakfast available");
  }

  get finalReserveRoomButton() {
    return driver.findElementByAccessibilityId('Reserve Room, 2 Twin Beds, Non Smoking');
  }

  async selectTwinBedsRoom() {
    await this.twinBedsRoom.click();
  }

  async clickReserveButton() {
    await this.reserveButton.click();
  }

  async clickReserveRoomButton() {
    await this.finalReserveRoomButton.click();
  }
}

class PaymentPage {
  get payNowButton() {
    return driver.findElementByXPath("//*[@text='Pay now']");
  }

  async completeBooking() {
    await this.payNowButton.click();
  }
}
