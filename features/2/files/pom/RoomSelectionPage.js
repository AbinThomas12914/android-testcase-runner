class RoomSelectionPage {
  // Element identifiers as constants
  get TWIN_BEDS_ROOM() {
    return driver.find_element(AppiumBy.XPATH, "//android.widget.TextView[@text='Room, 2 Twin Beds, Non Smoking']");
  }

  get RESERVE_BUTTON() {
    return driver.findElementByAccessibilityId("Select and customize, Room, 2 Twin Beds, Non Smoking, Breakfast available");
  }

  get FINAL_RESERVE_ROOM_BUTTON() {
    return driver.findElementByAccessibilityId('Reserve Room, 2 Twin Beds, Non Smoking');
  }

  // Behaviors
  async selectTwinBedsRoom() {
    await this.TWIN_BEDS_ROOM.click();
  }

  async clickReserveButton() {
    await this.RESERVE_BUTTON.click();
  }

  async clickReserveRoomButton() {
    await this.FINAL_RESERVE_ROOM_BUTTON.click();
  }
}