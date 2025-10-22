class PermissionPopupPage {
  // Element identifiers as CONSTANTS
  get ALLOW_BUTTON() { 
    return $('//*[@text="Allow"]'); 
  }

  get PERMISSION_POPUP() {
    return $('//android.widget.FrameLayout[@resource-id="permission_popup_container"]'); 
  }

  async clickAllowButton() {
    await this.ALLOW_BUTTON.click();
  }

  async isPopupDisplayed() {
    return await this.PERMISSION_POPUP.isDisplayed();
  }

  async waitForPopupToClose(timeout = 10000) {
    await this.PERMISSION_POPUP.waitForDisplayed({ timeout, reverse: true });
  }
}

module.exports = PermissionPopupPage;