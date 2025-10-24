class SignInScreen {
  // Element identifiers as constants
  get SIGN_IN_WITH_GOOGLE_BUTTON() {
    return driver.findElementByXPath("//*[@text='Sign in with Google']");
  }

  // Behaviors
  async verifySignInWithGoogleButtonIsAvailable() {
    const element = await this.SIGN_IN_WITH_GOOGLE_BUTTON;
    if (!element) {
      throw new Error("Sign in with Google button is not available");
    }
  }
}