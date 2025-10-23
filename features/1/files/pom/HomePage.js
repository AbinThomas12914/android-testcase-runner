class HomePage {
  // Element identifiers as CONSTANTS
  get FLIGHTS_TAB() {
    return driver.findElementByXPath("//*[@text='Flights']");
  }

  // Behaviours
  clickFlightsTab() {
    this.FLIGHTS_TAB.click();
  }
}