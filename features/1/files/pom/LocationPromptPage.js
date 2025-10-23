class LocationPromptPage {
  // Element identifiers as CONSTANTS
  NOT_NOW_BUTTON_XPATH = "//*[@text='Not now']";

  // Getter for the 'Not now' button element
  get notNowButton() { 
    return driver.findElement(By.xpath(this.NOT_NOW_BUTTON_XPATH)); 
  }

  // Method to close the location prompt by clicking the 'Not now' button
  closePrompt() {
    this.notNowButton.click();
  }
}