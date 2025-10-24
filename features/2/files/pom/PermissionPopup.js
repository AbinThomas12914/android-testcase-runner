class PermissionPopup {
  get denyButton() {
    return driver.findElementByXPath("//*[@text='Deny']");
  }

  async closePopup() {
    await this.denyButton.click();
  }
}