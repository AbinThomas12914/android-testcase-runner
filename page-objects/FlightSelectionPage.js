class FlightSelectionPage {
  // Element identifiers as CONSTANTS
  get FIRST_AIR_INDIA_FLIGHT() { return $("//*[@resource-id='com.expedia.bookings:id/flightCell' and contains(@content-desc, 'Air India')]"); }
  get FIRST_SELECT_BUTTON() { return $("(//*[@text='Select'])[1]"); }

  // Behaviors (Methods)
  async selectFirstAirIndiaFlight() {
    await this.FIRST_AIR_INDIA_FLIGHT.click();
  }

  async selectFirstFlight() {
    await this.FIRST_SELECT_BUTTON.click();
  }
}

module.exports = FlightSelectionPage;