class SearchScreen {
  get goingToLabel() {
    return driver.findElementByXPath("//*[@text='Going to']");
  }

  tapGoingToLabel() {
    this.goingToLabel.click();
  }
}