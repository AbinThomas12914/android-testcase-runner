class FlightSearchPage {
  // Element identifiers as constants
  static ONE_WAY_TAB_TEXT = 'One-way';
  static LEAVING_FROM_BUTTON_DESC = "Leaving from Button Bengaluru (BLR-Kempegowda Intl.)";
  static GOING_TO_BUTTON_ID = 'GoingToButton';
  static SEARCH_BUTTON_RESOURCE_ID = 'buttonLabel';
  static SEARCH_BUTTON_TEXT = 'Search';

  async clickOneWayTab() {
    await element(by.text(FlightSearchPage.ONE_WAY_TAB_TEXT)).tap();
  }

  leavingFromButton() {
    return driver.findElementByXPath(`//android.view.View[@content-desc='${FlightSearchPage.LEAVING_FROM_BUTTON_DESC}']`);
  }

  clickLeavingFromButton() {
    this.leavingFromButton().click();
  }

  async tapGoingToField() {
    await element(by.id(FlightSearchPage.GOING_TO_BUTTON_ID)).tap();
  }

  get searchButton() {
    return driver.findElementByXPath(`//android.widget.TextView[@resource-id='${FlightSearchPage.SEARCH_BUTTON_RESOURCE_ID}' and @text='${FlightSearchPage.SEARCH_BUTTON_TEXT}']`);
  }

  clickSearchButton() {
    this.searchButton.click();
  }
}