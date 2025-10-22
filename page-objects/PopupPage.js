class PopupPage {
  constructor(driver) {
    this.driver = driver;
  }

  async isPopupDisplayed() {
    try {
      const popup = await this.driver.findElement('accessibility id', 'Close sheet');
      return await popup.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async closePopup() {
    const closeButton = await this.driver.findElement('accessibility id', 'Close sheet');
    await closeButton.click();
  }

  async isPopupClosed() {
    try {
      const popup = await this.driver.findElement('accessibility id', 'Close sheet');
      return !(await popup.isDisplayed());
    } catch (error) {
      return true;
    }
  }
}

module.exports = PopupPage;