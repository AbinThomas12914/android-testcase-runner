function testClosePopup() {
  const popupPage = new PopupPage();
  popupPage.closePopup();
}

function testCloseLocationPrompt() {
  const locationPromptPage = new LocationPromptPage();
  locationPromptPage.closePrompt();
}

describe('Popup Test', () => {
  it('should close the popup when X button is clicked', () => {
    const popupPage = new PopupPage();
    popupPage.closePopup();
  });
});

function testClickFlightsTab() {
  const homePage = new HomePage();
  homePage.clickFlightsTab();
}

async function testClickOneWayTab() {
  const flightSearchPage = new FlightSearchPage();
  await flightSearchPage.clickOneWayTab();
}

// Test code
const flightSearchPage = new FlightSearchPage();
flightSearchPage.clickLeavingFromButton();

// Test code
const searchPage = new SearchPage();
searchPage.tapLeavingFromField();

function testClearAndEnterLeavingFrom() {
  const searchPage = new SearchPage();
  searchPage.clearLeavingFrom();
  searchPage.enterLeavingFrom("Cochin");
}

async function testClickCochinLocation() {
  const searchLocationPage = new SearchLocationPage();
  await searchLocationPage.clickCochinLocation();
}

async function testTapGoingToField() {
  const flightSearchPage = new FlightSearchPage();
  await flightSearchPage.tapGoingToField();
}

function testTapGoingToLabel() {
  const searchScreen = new SearchScreen();
  searchScreen.tapGoingToLabel();
}

function testClearAndEnterLocation() {
  const searchLocationPage = new SearchLocationPage();
  searchLocationPage.clearGoingToInput();
  searchLocationPage.enterGoingToLocation('Bengaluru');
}

describe('Search Location Test', () => {
  it('should select Bengaluru from the list', async () => {
    const searchLocationPage = new SearchLocationPage();
    await searchLocationPage.selectBengaluruLocation();
  });
});

function testClickSearchButton() {
  const flightSearchPage = new FlightSearchPage();
  flightSearchPage.clickSearchButton();
}

describe('Flight Selection Test', () => {
  it('should select the first flight with Air India', async () => {
    await new FlightSelectionPage().selectFirstFlightWithAirIndia();
  });
});

describe('Flight Selection', () => {
  it('should allow user to select the first flight', () => {
    const flightSelectionPage = new FlightSelectionPage();
    flightSelectionPage.selectFirstFlight();
  });
});

function testCheckoutButton() {
  const tripReviewPage = new TripReviewPage();
  tripReviewPage.clickCheckoutButton();
}
