class HotelSearchResultsPage {
  async clickOnFirstHotel() {
    await element(by.text('Courtyard by Marriott Kochi Airport')).tap();
  }
}