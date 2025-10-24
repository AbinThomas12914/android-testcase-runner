async function test() {
  const signInScreen = new SignInScreen();
  await signInScreen.verifySignInWithGoogleButtonIsAvailable();
}

async function testClosePopup() {
  const popupPage = new PopupPage();
  await popupPage.closePopup();
}

// Test code
const locationAccessPopup = new LocationAccessPopup();
locationAccessPopup.closePopup();

describe('Permission Popup Test', () => {
  it('should close the popup', () => {
    const popup = new PermissionPopup();
    popup.closePopup();
  });
});

function testClickStaysTab() {
  const homePage = new HomePage();
  homePage.clickStaysTab();
}

async function testClickGoingToInput() {
  const searchLocationPage = new SearchLocationPage();
  await searchLocationPage.clickGoingToInput();
}

function testActivateSearchInput() {
  const searchLocationPage = new SearchLocationPage();
  searchLocationPage.activateSearchInput();
}

const searchLocationPage = new SearchLocationPage();
searchLocationPage.clearAndEnterLocation('Kochi');

describe('Search Location Test', () => {
  it('should select Cochin from the list', async () => {
    const searchLocationPage = new SearchLocationPage();
    await searchLocationPage.selectCochin();
  });
});

function testClickSearchButton() {
  const searchFormPage = new SearchFormPage();
  searchFormPage.clickSearchButton();
}

async function testClickOnFirstHotel() {
  const hotelSearchResultsPage = new HotelSearchResultsPage();
  await hotelSearchResultsPage.clickOnFirstHotel();
}

function testSubmitSelectARoomButton() {
  const propertyPage = new PropertyDetailsPage();
  propertyPage.submitSelectARoomButton();
}

function testSelectTwinBedsRoom() {
  const roomSelectionPage = new RoomSelectionPage();
  roomSelectionPage.selectTwinBedsRoom();
}

function testReserveRoomFunctionality() {
  const roomSelectionPage = new RoomSelectionPage();
  roomSelectionPage.clickReserveButton();
}

// Test code
const roomSelectionPage = new RoomSelectionPage();
roomSelectionPage.clickReserveRoomButton();

// Test code
const paymentPage = new PaymentPage();
paymentPage.completeBooking();
