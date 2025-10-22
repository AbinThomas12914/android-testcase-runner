class FlightSearchPage {
  // Element identifiers as CONSTANTS
  get ONE_WAY_TAB() { return $("//*[@text='One-way']"); }
  get LEAVING_FROM_BUTTON() { return $("//android.view.View[@resource-id='LeavingFromButton']"); }
  get GOING_TO_BUTTON() { return $("//android.view.View[@resource-id='GoingToButton']"); }
  get SEARCH_BUTTON() { return $("//*[@resource-id='SearchButton']"); }

  // Getters for elements
  get oneWayTab() { return this.ONE_WAY_TAB; }
  get leavingFromButton() { return this.LEAVING_FROM_BUTTON; }
  get goingToButton() { return this.GOING_TO_BUTTON; }
  get searchButton() { return this.SEARCH_BUTTON; }

  // Behaviors
  async clickOneWayTab() {
    await this.oneWayTab.click();
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

module.exports = FlightSearchPage;