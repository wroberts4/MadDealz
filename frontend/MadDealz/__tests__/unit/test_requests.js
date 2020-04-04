import {add_user, delete_user, get_user, get_users, update_user, user_login,
        add_favorite_bar, remove_favorite_bar, add_favorite_deal, remove_favorite_deal,
        send_friend_request, accept_friend_request, remove_friend} from '../../src/requests/user_requests.js';
import {create_deal, get_deal, delete_deal, update_deal} from '../../src/requests/deal_requests';
import {create_bar, delete_bar, get_bar, get_bars, update_bar,
        get_deals, get_reviews, update_favorites} from '../../src/requests/bar_requests';
import {create_review, get_review, delete_review, update_review} from '../../src/requests/review_requests';

const TIMEOUT = 3000;
const IP = 'https://api.maddealz.software';

async function undefined_error(promise, var_name, value, expected_error) {
  let unexpected_error = 'Expected an error given ' + var_name + ' with value ' + value;
  try {
    await promise;
    throw unexpected_error;
  } catch(error) {
    expect(unexpected_error).not.toBe(error);
    expect(error).toBe(expected_error);
  }
};

// Credit: http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html
function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }
    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];
        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] && b[propName]) {
            let are_equal;
            if (typeof a[propName] === 'object' && typeof b[propName] == 'object') {
                are_equal = isEquivalent(a[propName], b[propName]);
            } else {
                are_equal = a[propName] == b[propName];
            }
            if (!(Object.keys(a[propName]).length == 0 && Object.keys(b[propName]).length == 0) && !are_equal) {
                return false;
            }
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
};

expect.extend({
  toContainObject(received, object) {
    for (let i = 0; i < received.length; i++) {
      if (isEquivalent(received[i], object)) {
        return {
          message: () =>
            `expected object not to be in list of objects`,
          pass: true,
        };
      }
    }
    return {
      message: () =>
        `expected object to be in list of objects`,
      pass: false,
    };
  },
});

///////////////////////////////////// USER TESTS /////////////////////////////////////
async function test_delete_user(username, password, email) {
//  const users = await get_users(TIMEOUT, IP);
//  for (let i = 0; i < users.length; i++) {
//      await delete_user(users[i].username, TIMEOUT, IP)
//  }
  let res = await delete_user(username, TIMEOUT, IP);
  expect(res).toBe("User deleted successfully");
  //Error cases.
  await undefined_error(delete_user(undefined, TIMEOUT, IP), 'username', undefined, "Must specify a username");
  await undefined_error(delete_user(-1, TIMEOUT, IP), 'username', -1, "User not found");
};

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email, TIMEOUT, IP);
  expect(user.username).toBe(username);

  //Error cases.
  await undefined_error(add_user(undefined, password, email, TIMEOUT, IP), 'username',
                                 undefined, "Email, password, or username is empty");
  await undefined_error(add_user(username, undefined, email, TIMEOUT, IP), 'password',
                                 undefined, "Email, password, or username is empty");
  await undefined_error(add_user(username, password, undefined, TIMEOUT, IP), 'email',
                                 undefined, "Email, password, or username is empty");

  await undefined_error(add_user(username, 'tmp', 'tmp', TIMEOUT, IP), 'username',
                                 username, "Username already taken");
  await undefined_error(add_user('tmp', 'tmp', email, TIMEOUT, IP), 'email',
                                 email, "Email already in use");
  return user;
};

async function test_get_user(username) {
  let user = await get_user(username, TIMEOUT, IP);
  expect(user.username).toBe(username);

  // Error cases.
  await await undefined_error(get_user(undefined, TIMEOUT, IP), 'username',
                                       undefined, "Must specify a username");
  await await undefined_error(get_user(-1, TIMEOUT, IP), 'username', -1, "User not found");
  return user;
};

async function test_get_users(username) {
  let user = await get_user(username, TIMEOUT, IP);
  const users = await get_users(TIMEOUT, IP);
  expect(users).toContainObject(user);
  return users;
};

async function test_update_user(user) {
  let res = await update_user(user, TIMEOUT, IP);
  expect(res).toBe("User updated successfully");

  // Error cases.
  await undefined_error(update_user({}, TIMEOUT, IP), 'user', {}, "Must specify a username");
  await undefined_error(update_user({'username': -1}, TIMEOUT, IP),
                                    'username', -1, "User not found");
  await undefined_error(update_user({'username': user.username, 'password': undefined}, TIMEOUT, IP),
                                     'password', undefined, "Password must not be empty or null");
  await undefined_error(update_user({'username': user.username, 'password': 'tmp', 'email': user.email}, TIMEOUT, IP),
                                    'email', user.email, "Email already in use");
};

async function test_user_login(username, email, password) {
  let user = await user_login(email, password, TIMEOUT, IP);
  expect(user.username).toBe(username);

  // Error cases.
  await undefined_error(user_login(undefined, password, TIMEOUT, IP),
                                   'email', undefined, "No email or password specified");
  await undefined_error(user_login(email, undefined, TIMEOUT, IP),
                                   'password', undefined, "No email or password specified");
  await undefined_error(user_login(-1, password, TIMEOUT, IP), 'email', -1,
                                   "User does not exist");
  await undefined_error(user_login(email, -1, TIMEOUT, IP),
                                   'password', -1, "Incorrect password");
};

async function test_add_favorite_bar(username) {
  let bar_id = (await get_bars(TIMEOUT, IP))[0]._id;
  let res = await add_favorite_bar(username, bar_id, TIMEOUT, IP);
  expect(res).toBe('Favorite bar added successfully');
  let user = await get_user(username);
  expect(user.favorites.bars).toContain(bar_id);
};

async function test_remove_favorite_bar(username) {
  let bar_id = (await get_bars(TIMEOUT, IP))[0]._id;
  let res = await remove_favorite_bar(username, bar_id, TIMEOUT, IP);
  expect(res).toBe('Favorite bar removed successfully');
  let user = await get_user(username);
  expect(user.favorites.bars).not.toContain(bar_id);
};

async function test_add_favorite_deal(username) {
  let bar_id = (await get_bars(TIMEOUT, IP))[0]._id;
  let deal_id = (await get_deals(bar_id))[0]._id;
  let res = await add_favorite_deal(username, deal_id, TIMEOUT, IP);
  expect(res).toBe('Favorite deal added successfully');
  let user = await get_user(username);
  expect(user.favorites.deals).toContain(deal_id);
};

async function test_remove_favorite_deal(username) {
  let bar_id = (await get_bars(TIMEOUT, IP))[0]._id;
  let deal_id = (await get_deals(bar_id))[0]._id;
  let res = await remove_favorite_deal(username, deal_id, TIMEOUT, IP);
  expect(res).toBe('Favorite deal removed successfully');
  let user = await get_user(username);
  expect(user.favorites.deals).not.toContain(deal_id);
};

async function test_send_friend_request(requester, requestee) {
};

async function test_accept_friend_request(requester, requestee) {
};

async function test_remove_friend(user1, user2) {
};

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address){
};

async function test_get_deal(id) {
};

async function test_delete_deal(id) {
};

async function test_update_deal(deal) {
};

///////////////////////////////////// REVIEW TESTS /////////////////////////////////////
async function test_create_review(review) {
};

async function test_get_review(id) {
};

async function test_delete_review(id) {
};

async function test_update_review(review) {
};

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  expect(bar.name).toBe(name);

  let res = await delete_bar(bar._id, TIMEOUT, IP);
  expect(res).toBe("Bar deleted successfully");

  await undefined_error(delete_bar(undefined, TIMEOUT, IP), 'id', undefined, "Must specify a bar id");
  await undefined_error(delete_bar(-1, TIMEOUT, IP), 'id', -1, "invalid id provided");
  await undefined_error(delete_bar('------------', TIMEOUT, IP), 'id', '------------', "Bar not found");
};

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);

  // Error cases.
  await undefined_error(create_bar(undefined, address, TIMEOUT, IP), 'name', undefined, "Bar name and address must be provided");
  await undefined_error(create_bar(name, undefined, TIMEOUT, IP), 'address', undefined, "Bar name and address must be provided");
  return bar;
};

async function test_get_bar(name, address) {
  let res = await create_bar(name, address, TIMEOUT, IP);
  let bar = await get_bar(res._id, TIMEOUT, IP);
  expect(bar.name).toBe(name);

  // Error cases.
  await undefined_error(get_bar(undefined, TIMEOUT, IP), 'name', undefined, "id must be provided");
  await undefined_error(get_bar(-1, TIMEOUT, IP), 'name', -1, "invalid id provided");
  await undefined_error(get_bar('------------', TIMEOUT, IP), 'id', '------------', "Bar does not exist");
  return bar;
};

async function test_get_bars(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  const bars = await get_bars(TIMEOUT, IP);
  for (let i = 0; i < bars.length; i++) {
    delete bars[i].distance;
  }
  expect(bars).toContainObject(bar);
  return bars;
};

async function test_update_bar(name1, address1, name2, address2) {
  let res = await create_bar(name1, address1, TIMEOUT, IP);
  let bar = {_id: res._id, name: name2, address: address2};
  let update_res = await update_bar(bar, TIMEOUT, IP);
  expect(update_res).toBe("Bar updated successfully");

  // Error cases.
  await undefined_error(update_bar({}, TIMEOUT, IP), 'bar', {}, "Must specify a bar id");
};

async function test_get_deals(bar_id) {
};

async function test_get_reviews(bar_id) {
};

async function test_update_favorites(id, value) {
};

let name = 'test_name';
let name2 = 'test_name2'
let password = 'test_password';
let password2 = 'test_password2';
let email = 'fake@gmail.com';
let email2 = 'fake2@gmail.com';
let address = 'test_address'
let address2 = 'test_address2';

test('test add_user', async () => {return test_add_user(name, password, email)}, TIMEOUT);
test('test get_user', async () => {return test_get_user(name)}, TIMEOUT);
test('test get_users', async () => {return test_get_users(name)}, TIMEOUT);
test('test user_login', async () => {return test_user_login(name, email, password)}, TIMEOUT);
test('test add_favorite_bar', async () => {return test_add_favorite_bar(name)}, TIMEOUT);
test('test update_user', async () => {return test_update_user({'username': name, 'password': password2, 'email': email2})}, TIMEOUT);
test('test delete_user', async () => {return test_delete_user(name)}, TIMEOUT);

//test('test create_deal', async () => {return test_create_deal('test', 'fake street')});

test('test delete_bar', async () => {return test_delete_bar(name, address)}, TIMEOUT);
test('test create_bar', async () => {return test_create_bar(name, address)}, TIMEOUT);
test('test get_bar', async () => {return test_get_bar(name, address)}, TIMEOUT);
test('test get_bars', async () => {return test_get_bars(name, address)}, TIMEOUT);
test('test update_bar', async () => {return test_update_bar(name, address, name2, address2)}, TIMEOUT);

afterAll(async () => {
  try {
    await delete_user(name, TIMEOUT, IP);
  } catch {};
  try {
    await delete_user('tmp', TIMEOUT, IP);
  } catch {};
  try {
    bars = await get_bars(TIMEOUT, IP);
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].name == name || bars[i].name == name2) {
        await delete_bar(bars[i]._id, TIMEOUT, IP);
      }
    }
  } catch {};
});
