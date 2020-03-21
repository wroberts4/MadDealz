import user_requests from '../../src/requests/user_requests.js';
import deal_requests from '../../src/requests/deal_requests';
import bar_requests from '../../src/requests/bar_requests';

const delete_user = user_requests.delete_user;
const add_user = user_requests.add_user;
const get_user = user_requests.get_user;
const get_users = user_requests.get_users;
const update_user = user_requests.update_user;

const create_deal = deal_requests.create_deal;

const create_bar = bar_requests.create_bar;
const delete_bar = bar_requests.delete_bar;
const get_bar = bar_requests.get_bar;
const get_bars = bar_requests.get_bars;
const update_bar = bar_requests.update_bar;

async function undefined_error(promise, var_name) {
  let unexpected_error = 'Expected an error when getting ' + var_name + ' that is not in database';
  try {
    await promise;
    throw unexpected_error;
  } catch(error) {
    if (error == unexpected_error) {
      throw error;
    }
  }
}

///////////////////////////////////// USER TESTS /////////////////////////////////////
async function test_delete_user(username) {
  await delete_user(username);
  //Error cases.
  undefined_error(delete_user(undefined), 'username');
}

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email);
  expect(user.username).toBe(username);

  //Error cases.
  undefined_error(add_user(undefined, password, email), 'username');
  undefined_error(add_user(username, undefined, email), 'password');
  undefined_error(add_user(username, password, undefined), 'email');
  return user;
}

async function test_get_user(username) {
  let user = await get_user(username);
  expect(user.username).toBe(username);

  // Error cases.
  await undefined_error(get_user(undefined), 'username');
  return user;
}

async function test_get_users(usernames) {
  const users = await get_users(usernames);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    expect(user.username).toBe(usernames[i]);
  }

  // Error cases.
  await undefined_error(get_users(undefined), 'usernames');
  return users;
}

async function test_update_user(user) {
  await update_user(user);
  await undefined_error(update_user(undefined), 'username');
}

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address) {
  let deal = await create_deal(name, address);
  expect(deal.name).toBe(name);

  // Error cases.
  await undefined_error(create_deal(undefined, address), 'name');
  await undefined_error(create_deal(name, undefined), 'address');
  return deal;
}

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name) {
  await delete_bar(name);

  // Error cases.
  await undefined_error(delete_bar(undefined), 'name');
}

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);
  expect(bar.name).toBe(name);

  // Error cases.
  await undefined_error(create_bar(undefined, address), 'name');
  await undefined_error(create_bar(name, undefined), 'address');
  return bar;
}

async function test_get_bar(name) {
  let bar = await get_bar(name);
  expect(bar.name).toBe(name);

  // Error cases.
  await undefined_error(get_bar(undefined), 'name');
  return bar;
}

async function test_get_bars(names) {
  const bars = await get_bars(names);
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    expect(bar.name).toBe(names[i]);
  }

  // Error cases.
  await undefined_error(get_bars(undefined), 'names');
  return bars;
}

async function test_update_bar(bar) {
  await update_bar(bar);

  // Error cases.
  await undefined_error(update_bar(undefined), 'bar');
}

test('test delete_user', async () => {return test_delete_user('test')});
test('test add_user', async () => {return test_add_user('test', 'user', 'fake@gmail.com')});
test('test get_user', async () => {return test_get_user('test')});
test('test get_users', async () => {return test_get_users(['test'])});
test('test update_user', async () => {return test_update_user({'username': 'test', 'password': 'new_user'})});

//test('test create_deal', async () => {return test_create_deal('test', 'fake street')});

test('test delete_bar', async () => {return test_delete_bar('test')});
test('test create_bar', async () => {return test_create_bar('test', 'fake street')});
test('test get_bar', async () => {return test_get_bar('test')});
test('test get_bars', async () => {return test_get_bars(['test'])});
test('test update_bar', async () => {return test_update_bar({'name': 'test', 'address': 'new fake street'})});
