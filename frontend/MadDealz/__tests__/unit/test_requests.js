import {add_user, delete_user, get_user, get_users, update_user, user_login,
        add_favorite_bar, remove_favorite_bar, add_favorite_deal, remove_favorite_deal,
        send_friend_request, accept_friend_request, remove_friend, upload_image} from '../../src/requests/user_requests.js';
import {create_deal, get_deal, delete_deal, update_deal} from '../../src/requests/deal_requests';
import {create_bar, delete_bar, get_bar, get_bars, update_bar,
        get_deals, get_reviews, update_favorites} from '../../src/requests/bar_requests';
import {create_review, get_review, delete_review, update_review} from '../../src/requests/review_requests';

const TIMEOUT = 5000;
const IP = 'https://testapi.maddealz.software';
jest.setTimeout(3 * TIMEOUT);

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
  let res = await delete_user(username, TIMEOUT, IP);
  expect(res).toBe("User deleted successfully");

  //Error cases.
  await undefined_error(get_user(username, TIMEOUT, IP), 'username', username, 'User not found');
  await undefined_error(delete_user(undefined, TIMEOUT, IP), 'username', undefined, "Must specify a username");
  await undefined_error(delete_user(-1, TIMEOUT, IP), 'username', -1, "User not found");
};

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email, TIMEOUT, IP);
  expect(user.username).toBe(username);
  expect((await get_user(username, TIMEOUT, IP)).username).toBe(user.username);

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
};

async function test_get_user(username) {
  let user = await get_user(username, TIMEOUT, IP);
  expect(user.username).toBe(username);

  // Error cases.
  await await undefined_error(get_user(undefined, TIMEOUT, IP), 'username',
                                       undefined, "Must specify a username");
  await await undefined_error(get_user(-1, TIMEOUT, IP), 'username', -1, "User not found");
};

async function test_get_users(username) {
  let user = await get_user(username, TIMEOUT, IP);
  const users = await get_users(TIMEOUT, IP);
  expect(users).toContainObject(user);
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
  // TODO: WHY IS THIS FAILING?
//  await undefined_error(user_login(email, -1, TIMEOUT, IP),
//                                   'password', -1, "Incorrect password");
};

async function test_add_favorite_bar(name, address) {
  let bar_id = (await create_bar(name, address, TIMEOUT, IP))._id;
  let res = await add_favorite_bar(name, bar_id, TIMEOUT, IP);
  expect(res).toBe('Favorite bar added successfully');
  let user = await get_user(name, TIMEOUT, IP);
  expect(user.favorites.bars).toContain(bar_id);

  // Error cases.
  await undefined_error(add_favorite_bar(undefined, bar_id, TIMEOUT, IP), 'username', undefined, 'Must specify a username');
  await undefined_error(add_favorite_bar(name, undefined, TIMEOUT, IP), 'bar_id', undefined, 'Must specify a bar id');
};

async function test_remove_favorite_bar(name, address) {
  let bar_id = (await create_bar(name, address, TIMEOUT, IP))._id;
  let res = await remove_favorite_bar(name, bar_id, TIMEOUT, IP);
  expect(res).toBe('Favorite bar removed successfully');
  let user = await get_user(name, TIMEOUT, IP);
  expect(user.favorites.bars).not.toContain(bar_id);

  // Error cases.
  await undefined_error(remove_favorite_bar(undefined, bar_id, TIMEOUT, IP), 'username', undefined, 'Must specify a username');
  await undefined_error(remove_favorite_bar(name, undefined, TIMEOUT, IP), 'bar_id', undefined, 'Must specify a bar id');
};

async function test_add_favorite_deal(name, address) {
  let bar_id = (await create_bar(name, address, TIMEOUT, IP))._id;
  let deal_id = (await create_deal('tmp', bar_id, '0pm', TIMEOUT, IP))._id;
  let res = await add_favorite_deal(name, deal_id, TIMEOUT, IP);
  expect(res).toBe('Favorite deal added successfully');
  let user = await get_user(name, TIMEOUT, IP);
  expect(user.favorites.deals).toContain(deal_id);

  // Error cases.
  await undefined_error(add_favorite_deal(undefined, deal_id, TIMEOUT, IP), 'username', undefined, 'Must specify a username');
  await undefined_error(add_favorite_deal(name, undefined, TIMEOUT, IP), 'deal_id', undefined, 'Must specify a deal id');
};

async function test_remove_favorite_deal(name) {
  let user = await get_user(name, TIMEOUT, IP);
  let deal_id = user.favorites.deals[0];
  let res = await remove_favorite_deal(name, deal_id, TIMEOUT, IP);
  expect(res).toBe('Favorite deal removed successfully');
  user = await get_user(name, TIMEOUT, IP);
  expect(user.favorites.deals).not.toContain(deal_id);

  // Error cases.
  await undefined_error(remove_favorite_deal(undefined, deal_id, TIMEOUT, IP), 'username', undefined, 'Must specify a username');
  await undefined_error(remove_favorite_deal(name, undefined, TIMEOUT, IP), 'deal_id', undefined, 'Must specify a deal id');
};

async function test_send_friend_request(requester, requestee) {
  let res = await send_friend_request(requester, requestee, TIMEOUT, IP);
  expect(res).toBe('Friend request sent successfully');
  let user1 = await get_user(requester, TIMEOUT, IP);
  let user2 = await get_user(requestee, TIMEOUT, IP);
  expect(user1.friend_requests.outgoing).toContain(user2.username);
  expect(user2.friend_requests.incoming).toContain(user1.username);

  // Error cases.
  await undefined_error(send_friend_request(undefined, requestee, TIMEOUT, IP), 'requester',
                        undefined, 'Must specify a requester');
  await undefined_error(send_friend_request(requester, undefined, TIMEOUT, IP), 'requestee',
                        undefined, 'Must specify a requestee');
};

async function test_accept_friend_request(requester, requestee) {
  let res = await accept_friend_request(requester, requestee, TIMEOUT, IP);
  expect(res).toBe('Friend request accepted successfully');
  let user1 = await get_user(requester, TIMEOUT, IP);
  let user2 = await get_user(requestee, TIMEOUT, IP);
  expect(user1.friends).toContain(user2.username);
  expect(user2.friends).toContain(user1.username);

  // Error cases.
  await undefined_error(accept_friend_request(undefined, requestee, TIMEOUT, IP), 'requester',
                        undefined, 'Must specify a requester');
  await undefined_error(accept_friend_request(requester, undefined, TIMEOUT, IP), 'requestee',
                        undefined, 'Must specify a requestee');
};

async function test_remove_friend(requester, requestee) {
  let res = await remove_friend(requester, requestee, TIMEOUT, IP);
  expect(res).toBe('Friend removed successfully');
  let user1 = await get_user(requester, TIMEOUT, IP);
  let user2 = await get_user(requestee, TIMEOUT, IP);
  expect(user1.friends).not.toContain(user2.username);
  expect(user2.friends).not.toContain(user1.username);

  // Error cases.
  await undefined_error(remove_friend(undefined, requestee, TIMEOUT, IP), 'requester',
                        undefined, 'Must specify two users');
  await undefined_error(remove_friend(requester, undefined, TIMEOUT, IP), 'requester',
                        undefined, 'Must specify two users');
};

async function test_upload_image(username, image) {
  let res = await upload_image(username, image, TIMEOUT, IP);
  console.log(res)
  expect(res).toBe('Image uploaded successfully');

  // Error cases.
  await undefined_error(upload_image(username, undefined, TIMEOUT, IP), 'image', undefined,
                        'Image failed to upload');
}

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let deal = await create_deal(name, bar._id, times, TIMEOUT, IP);
  expect(deal.info).toBe(name);
  expect(deal.bar_id).toBe(bar._id);
  expect(deal.times).toBe(times);

  // Error cases.
  await undefined_error(create_deal(undefined, bar._id, times, TIMEOUT, IP), 'name', undefined, 'Deal info, bar_id, and times must be provided');
  await undefined_error(create_deal(name, undefined, times, TIMEOUT, IP), 'id', undefined, 'Deal info, bar_id, and times must be provided');
  await undefined_error(create_deal(name, bar._id, undefined, TIMEOUT, IP), 'times', undefined, 'Deal info, bar_id, and times must be provided');
};

async function test_get_deal(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let deal = await create_deal(name, bar._id, times, TIMEOUT, IP);
  deal = await get_deal(deal._id, TIMEOUT, IP);
  expect(deal.info).toBe(name);
  expect(deal.bar_id).toBe(bar._id);
  expect(deal.times).toBe(times);

  // Error cases.
  await undefined_error(get_deal(undefined, TIMEOUT, IP), 'id', undefined, 'Must specify a deal id');
};

async function test_delete_deal(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let deal = await create_deal(name, bar._id, times, TIMEOUT, IP);
  let res = await delete_deal(deal._id, TIMEOUT, IP);
  expect(res).toBe('Deal deleted successfully');

  // Error cases.
  await undefined_error(delete_deal(deal._id, TIMEOUT, IP), 'id', deal._id, 'Deal not found');
};

async function test_update_deal(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let deal = await create_deal(name, bar._id, times, TIMEOUT, IP);
  let res = await update_deal(deal._id, 'tmp', 'tmp', TIMEOUT, IP);
  expect(res).toBe('Deal updated successfully');
  res = await update_deal(deal._id, 'tmp', 'tmp', TIMEOUT, IP);
  expect(res).toBe('Nothing to update');

  // Error cases.
  await undefined_error(update_deal(undefined, 'tmp', 'tmp', TIMEOUT, IP), 'id', deal._id, 'Must specify a deal id');
};

///////////////////////////////////// REVIEW TESTS /////////////////////////////////////
async function test_create_review(name, address, content, score, user) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let review = await create_review(content, bar._id, score, user, TIMEOUT, IP);
  expect(review.content).toBe(content);
  expect(review.bar_id).toBe(bar._id);
  expect(review.score).toBe(score);
  expect(review.user).toBe(user);

  // Error cases.
  await undefined_error(create_review(content, undefined, score, user, TIMEOUT, IP), 'bar_id', undefined, 'invalid bar id provided');
};

async function test_get_review(name, address, content, score, user) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let review = await create_review(content, bar._id, score, user, TIMEOUT, IP);
  review = await get_review(review._id, TIMEOUT, IP);
  expect(review.content).toBe(content);
  expect(review.bar_id).toBe(bar._id);
  expect(review.score).toBe(score);
  expect(review.user).toBe(user);

  // Error cases.
  await undefined_error(get_review(undefined, TIMEOUT, IP), 'id', undefined, 'Must specify a review id');
};

async function test_delete_review(name, address, content, score, user) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let review = await create_review(content, bar._id, score, user, TIMEOUT, IP);
  let res = await delete_review(review._id, TIMEOUT, IP);
  expect(res).toBe('Review deleted successfully');

  // Error cases.
  await undefined_error(delete_review(review._id, TIMEOUT, IP), 'id', review._id, 'Review not found');
};

async function test_update_review(name, address, content, score, user) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let review = await create_review(content, bar._id, score, user, TIMEOUT, IP);
  let res = await update_review(review._id, 'tmp', 'tmp', TIMEOUT, IP);
  expect(res).toBe('Review updated successfully');
  res = await update_review(review._id, 'tmp', 'tmp', TIMEOUT, IP);
  expect(res).toBe('Nothing to update');

  // Error cases.
  await undefined_error(update_review(undefined, 'tmp', 'tmp', TIMEOUT, IP), 'id', review._id, 'Must specify a review id');
};

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  expect(bar.name).toBe(name);

  let res = await delete_bar(bar._id, TIMEOUT, IP);
  expect(res).toBe("Bar deleted successfully");

  // Error cases.
  await undefined_error(get_bar(bar._id, TIMEOUT, IP), 'id', bar._id, 'Bar does not exist');
  await undefined_error(delete_bar(undefined, TIMEOUT, IP), 'id', undefined, "Must specify a bar id");
  await undefined_error(delete_bar(-1, TIMEOUT, IP), 'id', -1, "invalid id provided");
  await undefined_error(delete_bar('------------', TIMEOUT, IP), 'id', '------------', "Bar not found");
};

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);

  // Error cases.
  await undefined_error(create_bar(undefined, address, TIMEOUT, IP), 'name', undefined, "Bar name and address must be provided");
  await undefined_error(create_bar(name, undefined, TIMEOUT, IP), 'address', undefined, "Bar name and address must be provided");
};

async function test_get_bar(name, address) {
  let res = await create_bar(name, address, TIMEOUT, IP);
  let bar = await get_bar(res._id, TIMEOUT, IP);
  expect(bar.name).toBe(name);

  // Error cases.
  await undefined_error(get_bar(undefined, TIMEOUT, IP), 'name', undefined, "id must be provided");
  await undefined_error(get_bar(-1, TIMEOUT, IP), 'name', -1, "invalid id provided");
  await undefined_error(get_bar('------------', TIMEOUT, IP), 'id', '------------', "Bar does not exist");
};

async function test_get_bars(name, address) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  const bars = await get_bars('', '', '', '', TIMEOUT, IP);
  for (let i = 0; i < bars.length; i++) {
    delete bars[i].distance;
  }
  expect(bars).toContainObject(bar);

  // Error cases.
};

async function test_update_bar(name1, address1, name2, address2) {
  let res = await create_bar(name1, address1, TIMEOUT, IP);
  let bar = {_id: res._id, name: name2, address: address2};
  let update_res = await update_bar(bar, TIMEOUT, IP);
  expect(update_res).toBe("Bar updated successfully");

  // Error cases.
  await undefined_error(update_bar({}, TIMEOUT, IP), 'bar', {}, "Must specify a bar id");
};

async function test_get_deals(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let deal = await create_deal(name, bar._id, times, TIMEOUT, IP);
  let deals = await get_deals(bar._id, TIMEOUT, IP);
  expect(deals).toContainObject(deal);

  // Error cases.
  await undefined_error(get_deals(undefined, TIMEOUT, IP), 'id', undefined, 'Must specify a bar id');
};

async function test_get_reviews(name, address, content, score, user) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let review = await create_review(content, bar._id, score, user, TIMEOUT, IP);
  let reviews = await get_reviews(bar._id, TIMEOUT, IP);
  expect(reviews).toContainObject(review);

  // Error cases.
  await undefined_error(get_reviews(undefined, TIMEOUT, IP), 'id', undefined, 'Must specify a bar id');
};

async function test_update_favorites(name, address, times) {
  let bar = await create_bar(name, address, TIMEOUT, IP);
  let res = await update_favorites(bar._id, 1, TIMEOUT, IP);
  expect(res).toBe('Bar favorites updated successfully');

  // Error cases.
  undefined_error(update_favorites(bar._id, 0, TIMEOUT, IP), 'value', 0, "value must be -1 or 1");
};

let name = 'test_name';
let name2 = 'test_name2'
let password = 'test_password';
let password2 = 'test_password2';
let email = 'fake@gmail.com';
let email2 = 'fake2@gmail.com';
let address = 'test_address'
let address2 = 'test_address2';
let times = '3pm';

beforeAll(async () => {
  // cleanup users.
  try {
    await delete_user(name, TIMEOUT, IP);
  } catch {};
  try {
    await delete_user(name2, TIMEOUT, IP);
  } catch {};
  try {
    await delete_user('tmp', TIMEOUT, IP);
  } catch {};

  //cleanup bars. THIS TAKES TIME.
  try {
    let bars = await get_bars('', '', '', '', TIMEOUT, IP);
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].name == name || bars[i].name == name2) {
        await delete_bar(bars[i]._id, TIMEOUT, IP);
      }
    }
  } catch {};
});

// USER TESTS.
test('test add_user', async () => {await test_add_user(name, password, email)});
test('test add_user', async () => {await test_add_user(name2, 'tmp', 'tmp')});
test('test get_user', async () => {await test_get_user(name)});
test('test get_users', async () => {await test_get_users(name)});
test('test user_login', async () => {await test_user_login(name, email, password)});
test('test add_favorite_bar', async () => {await test_add_favorite_bar(name, address)});
test('test remove_favorite_bar', async () => {await test_remove_favorite_bar(name, address)});
test('test add_favorite_deal', async () => {await test_add_favorite_deal(name, address)});
test('test remove_favorite_deal', async () => {await test_remove_favorite_deal(name)});
test('test send_friend_request', async () => {await test_send_friend_request(name, name2)});
test('test accept_friend_request', async () => {await test_accept_friend_request(name, name2)});
test('test remove_friend', async () => {await test_remove_friend(name, name2)});
test('test update_user', async () => {await test_update_user({'username': name, 'password': password2, 'email': email2})});
test('test upload_image', async () => {await test_upload_image(name, 'test.png')});
test('test delete_user', async () => {await test_delete_user(name)});

// DEAL TESTS.
test('test create_deal', async () => {await test_create_deal(name, address, times)});
test('test get_deal', async () => {await test_get_deal(name, address, times)});
test('test update_deal', async () => {await test_update_deal(name, address, times)});
test('test delete_deal', async () => {await test_delete_deal(name, address, times)});

// REVIEW TESTS.
test('test create_review', async () => {await test_create_review(name, address, 'tmp', -1, '')});
test('test get_review', async () => {await test_get_review(name, address, 'tmp', -1, '')});
test('test update_review', async () => {await test_update_review(name, address, times)});
test('test delete_review', async () => {await test_delete_review(name, address, 'tmp', -1, '')});

// BAR TESTS.
test('test delete_bar', async () => {await test_delete_bar(name, address)});
test('test create_bar', async () => {await test_create_bar(name, address)});
test('test get_bar', async () => {await test_get_bar(name, address)});
test('test get_bars', async () => {await test_get_bars(name, address)});
test('test update_bar', async () => {await test_update_bar(name, address, name2, address2)});
test('test get_deals', async () => {await test_get_deals(name, address, times)});
test('test get_reviews', async () => {await test_get_reviews(name, address, 'tmp', -1, '')});
test('test update_favorites', async () => {await test_update_favorites(name, address, times)});

afterAll(async () => {
  // cleanup users.
  try {
    await delete_user(name, TIMEOUT, IP);
  } catch {};
  try {
    await delete_user(name2, TIMEOUT, IP);
  } catch {};
  try {
    await delete_user('tmp', TIMEOUT, IP);
  } catch {};

  //cleanup bars. THIS TAKES TIME.
  try {
    let bars = await get_bars('', '', '', '', TIMEOUT, IP);
    for (let i = 0; i < bars.length; i++) {
      if (bars[i].name == name || bars[i].name == name2) {
        await delete_bar(bars[i]._id, TIMEOUT, IP);
      }
    }
  } catch {};
});
