class HomePage {
  // Popup dismissal elements
  get DISMISS_BUTTON() { 
    return $('//*[@content-desc="Dismiss"]'); 
  }
  
  get FEEDBACK_POPUP() { 
    return $('//android.widget.TextView[@text="Do you love Expedia?"]'); 
  }
  
  get NO_BUTTON() { 
    return $('//android.widget.TextView[@text="No"]'); 
  }
  
  // Main navigation elements (updated with real app selectors)
  get FLIGHTS_TAB() { 
    return $('//android.widget.TextView[@text="Flights"]'); 
  }
  
  get STAYS_TAB() { 
    return $('//android.widget.TextView[@text="Stays"]'); 
  }
  
  get CARS_TAB() { 
    return $('//android.widget.TextView[@text="Cars"]'); 
  }
  
  get PACKAGES_TAB() { 
    return $('//android.widget.TextView[@text="Packages"]'); 
  }

  // Bottom navigation
  get HOME_TAB() { 
    return $('//android.widget.TextView[@text="Home"]'); 
  }
  
  get SEARCH_TAB() { 
    return $('//android.widget.TextView[@text="Search"]'); 
  }

  // Popup dismissal methods
  async dismissLoginPopup() {
    try {
      console.log('🔍 Checking for login dismiss button...');
      await this.DISMISS_BUTTON.waitForDisplayed({ timeout: 5000 });
      console.log('✅ Found dismiss button, clicking...');
      await this.DISMISS_BUTTON.click();
      await driver.pause(2000);
      console.log('✅ Login screen dismissed');
      return true;
    } catch (error) {
      console.log('ℹ️ No login dismiss button found');
      return false;
    }
  }
  
  async dismissFeedbackPopup() {
    try {
      console.log('🔍 Checking for feedback popup...');
      await this.FEEDBACK_POPUP.waitForDisplayed({ timeout: 5000 });
      console.log('📋 Found "Do you love Expedia?" popup');
      
      await this.NO_BUTTON.waitForDisplayed({ timeout: 3000 });
      console.log('❌ Clicking "No" to dismiss feedback popup...');
      await this.NO_BUTTON.click();
      await driver.pause(2000);
      console.log('✅ Feedback popup dismissed');
      return true;
    } catch (error) {
      console.log('ℹ️ No feedback popup found');
      return false;
    }
  }
  
  async dismissAllPopups() {
    console.log('🚀 Starting popup dismissal process...');
    
    // Wait for app to load
    await driver.pause(8000);
    
    // Dismiss login popup
    await this.dismissLoginPopup();
    
    // Dismiss feedback popup  
    await this.dismissFeedbackPopup();
    
    // Wait for main app to be ready
    await driver.pause(3000);
    console.log('🎉 All popups dismissed, main app ready!');
  }

  // Behaviours
  async clickFlightsTab() {
    console.log('🎯 Attempting to click Flights button...');
    await this.FLIGHTS_TAB.waitForDisplayed({ timeout: 15000 });
    console.log('✅ Flights button found and displayed');
    await this.FLIGHTS_TAB.click();
    console.log('✅ Flights button clicked');
    await driver.pause(3000);
  }
  
  async waitForHomePageLoad() {
    console.log('⏳ Waiting for home page to load...');
    await this.FLIGHTS_TAB.waitForDisplayed({ timeout: 20000 });
    console.log('✅ Home page loaded successfully');
  }
}

module.exports = HomePage;