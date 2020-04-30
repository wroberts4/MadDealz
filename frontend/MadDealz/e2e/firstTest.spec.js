describe('Application Flow', () => {
  
  // Testing to see if the signup page loads (NOT creating an account)
  it('should load signup page successfully', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('SignUp'))).toBeVisible();
    await element(by.id('SignUp')).tap();
    await expect(element(by.id('Email'))).toBeVisible();
    await expect(element(by.id('Username'))).toBeVisible();
    await expect(element(by.id('Password'))).toBeVisible();
    await expect(element(by.id('SignUp'))).toBeVisible();
    await expect(element(by.id('Login'))).toBeVisible();
    await element(by.id('Login')).tap();
  });
  
  // Testing to see if the forgot password page loads
  it('should load the forgot passwords page', async () => { 
    await device.reloadReactNative();
    await expect(element(by.id('ForgotPassword'))).toBeVisible();
    await element(by.id('ForgotPassword')).tap();
    await expect(element(by.id('Email'))).toBeVisible();
    await expect(element(by.id('ResetPassword'))).toBeVisible();
    await expect(element(by.id('Login'))).toBeVisible();
    await element(by.id('Login')).tap();
  });
  
  // Now we are on the login page
  it('should login successfully', async () => {
    await device.reloadReactNative();
    await expect(element(by.id('Login'))).toBeVisible();
    await expect(element(by.id('Email'))).toBeVisible();
    await expect(element(by.id('Password'))).toBeVisible();
    await element(by.id('Email')).typeText('pavlakovic@wisc.edu');
    await element(by.id('Password')).typeText('testpassword2');
    await element(by.id('Login')).tap();
    await expect(element(by.id('Search'))).toBeVisible();
    await expect(element(by.id('Email'))).toNotExist();
  });
  
  // Now we are on the homepage going to the bar page
  it('should select a bar object successfully and load the bar page screen', async () => {
    await expect(element(by.text("Whiskey Jack's Saloon"))).toBeVisible();
    await element(by.text("Whiskey Jack's Saloon")).tap();
    await expect(element(by.id("Image"))).toBeVisible();
    await expect(element(by.text("Sunday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(400, 'down');
    await expect(element(by.text("Monday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(400, 'down');
    await expect(element(by.text("Tuesday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(400, 'down');
    await expect(element(by.text("Wednesday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(400, 'down');
    await expect(element(by.text("Thursday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(400, 'down');
    await expect(element(by.text("Friday"))).toBeVisible();
    await element(by.id('Scroll')).scroll(600, 'down');
    await expect(element(by.text("Saturday"))).toBeVisible();
    await expect(element(by.text("Contact Us"))).toBeVisible();
    await element(by.id('Scroll')).scrollTo('top');
    await expect(element(by.id('Favorite'))).toBeVisible();
    await element(by.id('Favorite')).tap();
    await element(by.id('Favorite')).tap();
    await element(by.id('Back')).tap();
  });

  // Now we are on the homepage
  it('should go to the contact screen and send a message to slack', async() => {
    await expect(element(by.text('Contact'))).toBeVisible();
    await element(by.text('Contact')).tap();
    await expect(element(by.id('Image'))).toBeVisible();
    await expect(element(by.id('Message'))).toBeVisible();
    await expect(element(by.id('Input'))).toBeVisible();
    await expect(element(by.id('Submit'))).toBeVisible();
    await element(by.id('Input')).typeText('A computer typed this :)');
    await element(by.id('Black')).tap();
    await element(by.id('Submit')).tap();
  });
 
  // Navigating to Favorites page
  it('should go to the favorites page and make sure it loads', async() => {
    await expect(element(by.text('Favorites'))).toBeVisible();
    await element(by.text('Favorites')).tap();
    await expect(element(by.text('Search Bars Here'))).toBeVisible();
    await expect(element(by.text("Whiskey Jack's Saloon"))).toBeVisible();
    await element(by.text("Whiskey Jack's Saloon")).tap();
    await expect(element(by.id("Image"))).toBeVisible();
    await expect(element(by.id('Back'))).toBeVisible();
    await element(by.id('Back')).tap();
  });
  
  // Now we are back on the home page navigating to the profile page
  it('should go to the profile page and make sure it loads', async() => {
    await element(by.text('Profile')).tap()
    await expect(element(by.id("Picture"))).toBeVisible();
    await expect(element(by.id("Email"))).toBeVisible();
    await expect(element(by.id("Password"))).toBeVisible();
    await expect(element(by.id("Logout"))).toBeVisible();
  });

  // Going to the change profile image page and making sure it loads
  it('should go to the change image page and make sure it loads', async() => {
    await element(by.text('Profile')).tap()
    await element(by.id("Picture")).tap();
    await expect(element(by.id("Text"))).toBeVisible();
    await expect(element(by.id("Change"))).toBeVisible();
    await expect(element(by.id("Return"))).toBeVisible();
    await element(by.id('Return')).tap();
  });

  // Going to the change email page and making sure it loads
  it('should go to the change email page and make sure it loads', async() => {
    await element(by.text('Profile')).tap()
    await element(by.id("Email")).tap();
    await expect(element(by.id("New"))).toBeVisible();
    await expect(element(by.id("Old"))).toBeVisible();
    await expect(element(by.id("Password"))).toBeVisible();
    await expect(element(by.id("Change"))).toBeVisible();
    await expect(element(by.id("Return"))).toBeVisible();
    await element(by.id('Return')).tap();
  });

  // Going to the change password page and making sure it loads
  it('should go to the change password page and make sure it loads', async() => {
    await element(by.text('Profile')).tap()
    await element(by.id("Password")).tap();
    await expect(element(by.id("Email"))).toBeVisible();
    await expect(element(by.id("Old"))).toBeVisible();
    await expect(element(by.id("New"))).toBeVisible();
    await expect(element(by.id("Repeat"))).toBeVisible();
    await expect(element(by.id("Change"))).toBeVisible();
    await expect(element(by.id("Return"))).toBeVisible();
    await element(by.id('Return')).tap();
  });

  // Logging out, end of tests!
  it('should navigate to profile page and logout successfully', async() => {
    await element(by.text('Profile')).tap()
    await expect(element(by.id("Logout"))).toBeVisible();
    await element(by.id('Logout')).tap()
    await expect(element(by.id('Login'))).toBeVisible();
  });
});
