import {delete_user, add_user, get_user, get_users, update_user} from '../../src/requests/user_requests.js';
import {create_deal} from '../../src/requests/deal_requests';
import {create_bar, delete_bar, get_bar, get_bars, update_bar} from '../../src/requests/bar_requests';

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
async function test_delete_bar() {
  let bar = await create_bar("test bar", "test address");
  expect(bar.name).toBe("test bar");
  
  let res = await delete_bar(bar._id);
  expect(res).toBe("Bar deleted successfully");

  try {
    await get_bar(bar._id);
  } catch (err) {
    expect(err).toBe("Bar does not exist");
  }  

  // Error cases.
  //await undefined_error(delete_bar(undefined), 'name');
}

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);
  expect(bar.name).toBe(name);

  // Error cases.
  await undefined_error(create_bar(undefined, address), 'name');
  await undefined_error(create_bar(name, undefined), 'address');
  return bar;
}

async function test_get_bar() {
  let res = await create_bar("test name", "test address");

  let bar = await get_bar(res._id);
  expect(bar.name).toBe("test name");

  await delete_bar(res._id);

  // Error cases.
  //await undefined_error(get_bar(undefined), 'name');
  return bar;
}

async function test_get_bars() {
  let ids = [];
  let res = await create_bar("test name 1", "test address 1");
  ids.push(res._id);
  res = await create_bar("test name 2", "test address 2");
  ids.push(res._id);
  const bars = await get_bars(ids);
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    expect(bar._id).toBe(ids[i]);
    await delete_bar(ids[i]);
  }

  // Error cases.
  await undefined_error(get_bars(undefined), 'names');
  return bars;
}

async function test_update_bar() {
  let res = await create_bar({name: 'test', address: 'fake street'});
  let bar = {_id: res._id, name: 'test', address: 'new fake street'}
  let update_res = await update_bar(bar);
  expect(update_res).toBe("Bar updated successfully");
  await delete_bar(res._id);

  // Error cases.
  await undefined_error(update_bar(undefined), 'bar');
}

test('test delete_user', async () => {return test_delete_user('test')});
test('test add_user', async () => {return test_add_user('test', 'user', 'fake@gmail.com')});
test('test get_user', async () => {return test_get_user('test')});
test('test get_users', async () => {return test_get_users(['test'])});
test('test update_user', async () => {return test_update_user({'username': 'test', 'password': 'new_user'})});

//test('test create_deal', async () => {return test_create_deal('test', 'fake street')});

test('test delete_bar', async () => {return test_delete_bar()});
test('test create_bar', async () => {return test_create_bar('test', 'fake street')});
test('test get_bar', async () => {return test_get_bar()});
test('test get_bars', async () => {return test_get_bars()});
test('test update_bar', async () => {return test_update_bar()});
