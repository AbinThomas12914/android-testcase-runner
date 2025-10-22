class SignInScreen {
  constructor() {
    this.SIGN_IN_WITH_GOOGLE_BUTTON_TEXT = 'Sign in with Google';
    // this.signInWithGoogleButton = element(by.text(this.SIGN_IN_WITH_GOOGLE_BUTTON_TEXT));
  }

  async verifySignInWithGoogleButton() {
    await driver.pause(10000);
    // await expect(this.signInWithGoogleButton).toBeVisible();
  }

  async isSignInWithGoogleButtonDisplayed() {
    await driver.pause(10000);
    // return await this.signInWithGoogleButton.isDisplayed();
  }
}

module.exports = SignInScreen;