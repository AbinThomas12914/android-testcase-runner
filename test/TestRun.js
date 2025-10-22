async function testClosePopup() {
  const popupPage = new PopupPage();
  await popupPage.closePopup();
}

function testCloseLocationAccessPopup() {
  const locationAccessPage = new LocationAccessPage();
  locationAccessPage.closePopup();
}

function testClosePermissionPopup() {
  const permissionPopup = new PermissionPopupPage();
  permissionPopup.closePopup();
}

async function testFlightsTabNavigation() {
  const homePage = new HomePage();
  await homePage.clickFlightsTab();
}

async function testClickOneWayTab() {
  const flightSearchPage = new FlightSearchPage();
  await flightSearchPage.clickOneWayTab();
}

function testClickLeavingFromButton() {
  const flightSearchPage = new FlightSearchPage();
  flightSearchPage.clickLeavingFromButton();
}

function testActivateLeavingFromField() {
  const searchScreen = new SearchScreen();
  searchScreen.activateLeavingFromField();
}

function testClearAndEnterLeavingFrom() {
  const searchLocationPage = new SearchLocationPage();
  searchLocationPage.clearLeavingFrom();
  searchLocationPage.enterLeavingFrom("Cochin");
}

describe('Search Location Test', () => {
  it('should select Cochin from the list', () => {
    const searchLocationPage = new SearchLocationPage();
    searchLocationPage.selectCochinLocation();
  });
});

function testTapGoingToField() {
  const flightSearchPage = new FlightSearchPage();
  flightSearchPage.tapGoingToField();
}

function testActivateLocationInput() {
  const searchLocationPage = new SearchLocationPage();
  searchLocationPage.activateLocationInput();
}

function testEnterBengaluruInGoingTo() {
  const searchLocationPage = new SearchLocationPage();
  searchLocationPage.clearGoingToInput();
  searchLocationPage.enterGoingToLocation("Bengaluru");
}

describe('Search Location Test', () => {
  it('should select Bengaluru from the list', async () => {
    await new SearchLocationPage().selectBengaluruFromList();
  });
});

function testClickSearchButton() {
  const flightSearchPage = new FlightSearchPage();
  flightSearchPage.clickSearchButton();
}

describe('Flight Selection Test', () => {
  it('should select the first Air India flight', () => {
    const flightPage = new FlightSelectionPage();
    flightPage.selectFirstAirIndiaFlight();
  });
});

function testSelectFirstFlight() {
  const flightSelectionPage = new FlightSelectionPage();
  flightSelectionPage.selectFirstFlight();
}

function testCheckoutButton() {
  const tripReviewPage = new TripReviewPage();
  tripReviewPage.clickCheckoutButton();
}
