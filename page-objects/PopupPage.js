class PopupPage {
  get closeButton() { return $('~Close'); }

  async closePopup() {
    await this.closeButton.click();
  }
}

module.exports = PopupPage;