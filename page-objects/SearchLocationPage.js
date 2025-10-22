class SearchLocationPage {
  // Element identifiers as CONSTANTS
  get LEAVING_FROM_INPUT() { return $("//android.widget.EditText[@resource-id='SearchLocationInput']"); }
  get GOING_TO_LABEL() { return $("//android.widget.TextView[@resource-id='SearchLocationInputPlaceholder' and @text='Going to']"); }
  get GOING_TO_INPUT() { return $("//android.widget.EditText[@resource-id='SearchLocationInput']"); }
  get COCHIN_OPTION() { return $("//*[@text='Cochin (COK - Cochin Intl.)' and @focusable='false']"); }
  get BENGALURU_OPTION() { return $("//*[@text='Bengaluru (BLR - Kempegowda Intl.)' and @focusable='false']"); }

  // Methods for interactions
  async clearLeavingFrom() {
    await this.LEAVING_FROM_INPUT.clearValue();
  }

  async enterLeavingFrom(location) {
    await this.LEAVING_FROM_INPUT.setValue(location);
  }

  async selectCochinLocation() {
    await this.COCHIN_OPTION.click();
  }

  async activateLocationInput() {
    await this.GOING_TO_LABEL.click();
  }

  async clearGoingToInput() {
    await this.GOING_TO_INPUT.clearValue();
  }

  async enterGoingToLocation(location) {
    await this.GOING_TO_INPUT.setValue(location);
  }

  async selectBengaluruFromList() {
    await this.BENGALURU_OPTION.click();
  }
}

module.exports = SearchLocationPage;