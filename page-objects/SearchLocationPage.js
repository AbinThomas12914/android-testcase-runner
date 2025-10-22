class SearchLocationPage {
  // Element identifiers as constants
  get GOING_TO_INPUT() {
    return '~SearchLocationInput';
  }

  // Attributes (Page Elements)
  get goingToInput() {
    return $(this.GOING_TO_INPUT);
  }

  // Behaviors (Methods)
  async clickGoingToInput() {
    await this.goingToInput.click();
  }

  async isGoingToInputFocused() {
    await this.goingToInput.waitForDisplayed();
    return await this.goingToInput.isFocused();
  }
}

module.exports = SearchLocationPage;