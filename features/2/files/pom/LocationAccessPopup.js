class LocationAccessPopup {
  // Element identifiers as constants
  get enableLocationAccessButton() { 
    return driver.findElement(By.xpath("//*[@text='Enable location access']")); 
  }

  // Behaviors
  async closePopup() {
    await this.enableLocationAccessButton.click();
  }
}