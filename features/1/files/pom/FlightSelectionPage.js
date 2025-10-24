class FlightSelectionPage {
  // Element identifiers as constants
  static AIR_INDIA_FLIGHT_CARD = "//androidx.cardview.widget.CardView[contains(@content-desc, 'Air India')]";
  static SELECT_BUTTON = "//android.widget.TextView[@text='Select']";

  // Behaviours
  selectFirstFlightWithAirIndia() {
    const flightElement = element(by.xpath(FlightSelectionPage.AIR_INDIA_FLIGHT_CARD));
    return flightElement.click();
  }

  selectFirstFlight() {
    const selectButtonElement = element(by.xpath(FlightSelectionPage.SELECT_BUTTON));
    return selectButtonElement.click();
  }
}