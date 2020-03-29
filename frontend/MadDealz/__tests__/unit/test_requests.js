import {add_user, delete_user, get_user, get_users, update_user, user_login,
        add_favorite_bar, remove_favorite_bar, add_favorite_deal, remove_favorite_deal,
        send_friend_request, accept_friend_request, remove_friend} from '../../src/requests/user_requests.js';
import {create_deal, get_deal, delete_deal, update_deal} from '../../src/requests/deal_requests';
import {create_bar, delete_bar, get_bar, get_bars, update_bar,
        get_deals, get_reviews, update_favorites} from '../../src/requests/bar_requests';
import {create_review, get_review, delete_review, update_review} from '../../src/requests/review_requests';

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
async function test_delete_user(username) {
  let res = await delete_user(username);
  expect(res).toBe("User deleted successfully");
  //Error cases.
  await undefined_error(delete_user(undefined), 'username', undefined, "Must specify a username");
  await undefined_error(delete_user('this_user_does_not_exist'), 'username', 'this_user_does_not_exist', "User not found");
};

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email);
  expect(user.username).toBe(username);

  //Error cases.
  await undefined_error(add_user(undefined, password, email), 'username', undefined, "Email, password, or username is empty");
  await undefined_error(add_user(username, undefined, email), 'password', undefined, "Email, password, or username is empty");
  await undefined_error(add_user(username, password, undefined), 'email', undefined, "Email, password, or username is empty");

  await undefined_error(add_user(username, 'tmp', 'tmp'), 'username', username, "Username already taken");
//  await undefined_error(add_user('tmp', password, 'tmp'), 'password', password, "password already taken");
//  await undefined_error(add_user('tmp', 'tmp', email), 'email', email, "Email already in use");
  return user;
};

async function test_get_user(username) {
  let user = await get_user(username);
  expect(user.username).toBe(username);

  // Error cases.
  await await undefined_error(get_user(undefined), 'username', undefined, "Must specify a username");
  await await undefined_error(get_user('DNE'), 'username', 'DNE', "User not found");
  return user;
};

async function test_get_users(username, password, email) {
  let user = await add_user(username, password, email);
  const users = await get_users();
  expect(users).toContainObject(user);
  await delete_user(username);
  return users;
};

async function test_update_user(user) {
  let res = await update_user(user);
  expect(res).toBe("User updated successfully");

  // Error cases.
  await undefined_error(update_user(undefined), 'username', undefined, "Must specify a username");
  await undefined_error(update_user({'username': 'this_user_does_not_exist'}), 'username', 'this_user_does_not_exist', "User not found");
  // TODO: password should also fail if undefined.
  await undefined_error(update_user({'username': user.username, 'password': null}),
                                     'password', null, "Password must not be empty or null");
};

async function test_user_login(user) {
};

async function test_add_favorite_bar(username, bar_id) {
};

async function test_remove_favorite_bar(username, bar_id) {
};

async function test_add_favorite_deal(username, deal_id) {
};

async function test_remove_favorite_deal(username, deal_id) {
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
  let bar = await create_bar(name, address);
  expect(bar.name).toBe(name);

  let res = await delete_bar(bar._id);
  expect(res).toBe("Bar deleted successfully");

  await undefined_error(delete_bar(undefined), 'id', undefined, "Must specify a bar id");
  // TODO: THIS IS FAILING.
  await undefined_error(delete_bar(-1), 'id', -1, "Bar not found");
};

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);

  // Error cases.
  await undefined_error(create_bar(undefined, address), 'name', undefined, "Bar name and address must be provided");
  await undefined_error(create_bar(name, undefined), 'address', undefined, "Bar name and address must be provided");
  await delete_bar(bar._id);
  return bar;
};

async function test_get_bar(name, address) {
  let res = await create_bar(name, address);
  let bar = await get_bar(res._id);
  expect(bar.name).toBe(name);

  await delete_bar(res._id);

  // Error cases.
  await undefined_error(get_bar(undefined), 'name', undefined, "id must be provided");
  await undefined_error(get_bar(-1), 'name', -1, "Bar does not exist");
  return bar;
};

async function test_get_bars(name, address) {
  let bar = await create_bar(name, address);
  const bars = await get_bars();
  for (let i = 0; i < bars.length; i++) {
    delete bars[i].distance;
  }
  expect(bars).toContainObject(bar);
  await delete_bar(bar._id);
  return bars;
};

async function test_update_bar(name1, address1, name2, address2) {
  let res = await create_bar(name1, address1);
  let bar = {_id: res._id, name: name2, address: address2};
  let update_res = await update_bar(bar);
  expect(update_res).toBe("Bar updated successfully");
  await delete_bar(res._id);

  // Error cases.
  await undefined_error(update_bar(undefined), 'bar', undefined, "Must specify a bar id");

//  const bars = await get_bars();
//  for (let i = 0; i < bars.length; i++) {
//      await delete_bar(bars[i]._id)
//  }
};

async function test_get_deals(bar_id) {
};

async function test_get_reviews(bar_id) {
};

async function test_update_favorites(id, value) {
};

test('test delete_user', async () => {return test_delete_user('test')});
test('test add_user', async () => {return test_add_user('test', 'user', 'fake@gmail.com')});
test('test get_user', async () => {return test_get_user('test')});
test('test get_users', async () => {return test_get_users('test2', 'user2', 'fake2@gmail.com')});
test('test update_user', async () => {return test_update_user({'username': 'test', 'password': 'new_user'})});

//test('test create_deal', async () => {return test_create_deal('test', 'fake street')});

test('test delete_bar', async () => {return test_delete_bar("test name", "test address")});
test('test create_bar', async () => {return test_create_bar('test name', 'test address')});
test('test get_bar', async () => {return test_get_bar("test name", "test address")});
test('test get_bars', async () => {return test_get_bars("test name", "test address")});
test('test update_bar', async () => {return test_update_bar("test name", "test address", "test name two", "test address two")});
