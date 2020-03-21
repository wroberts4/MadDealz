import user_requests from '../../src/utils/user_requests.js';
import deal_requests from '../../src/utils/deal_requests';
import bar_requests from '../../src/utils/bar_requests';

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

///////////////////////////////////// USER TESTS /////////////////////////////////////
async function test_delete_user(username) {
  await delete_user(username);
}

async function test_add_user(username, password, email) {
  let user = await add_user(username, password, email);
  expect(user.username).toBe(username);
  return user;
}

async function test_get_user(username) {
  let user = await get_user(username);
  expect(user.username).toBe(username);
  return user;
}

async function test_get_users(usernames) {
  const users = await get_users(usernames);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    expect(user.username).toBe(usernames[i]);
  }
  return users;
}

async function test_update_user(user) {
  await update_user(user);
}

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address) {
  let deal = await create_deal(name, address);
  expect(deal.name).toBe(name);
  return deal;
}

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name) {
  await delete_bar(name);
}

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);
  expect(bar.name).toBe(name);
  return bar;
}

async function test_get_bar(name) {
  let bar = await get_bar(name);
  expect(bar.name).toBe(name);
  return bar;
}

async function test_get_bars(names) {
  const bars = await get_bars(names);
  for (let i = 0; i < bars.length; i++) {
    const bar = bars[i];
    expect(bar.name).toBe(names[i]);
  }
  return bars;
}

async function test_update_bar(bar) {
  await update_bar(bar);
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
