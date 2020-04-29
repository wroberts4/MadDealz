describe('Application Flow', () => {
  /*
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  */

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
  /*
  // Now we are on the homepage
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
  */

  /*
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
  */
 
  // Navigating to Favorites page
  it('should go to the favorites page and make sure it loads', async() => {
    await expect(element(by.text('Favorites'))).toBeVisible();
    await expect(element(by.text('Search Bars Here'))).toBeVisible();
  });

});
