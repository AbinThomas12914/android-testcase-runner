class PermissionPopupPage {
  // Element identifiers as constants
  get denyButton() { 
    return $("//*[@resource-id='com.android.permissioncontroller:id/permission_deny_button']"); 
  }

  // Behaviors
  async closePopup() {
    await this.denyButton.click();
  }
}

module.exports = PermissionPopupPage;