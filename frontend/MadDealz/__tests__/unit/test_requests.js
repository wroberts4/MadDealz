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
  const response = await delete_user(username);
  expect(response.status).toBe(200);
  return response;
}

async function test_add_user(username, password, email) {
  const response = await add_user(username, password, email);
  expect(response.status).toBe(200);
  return response;
}

async function test_get_user(username) {
  const response = await get_user(username);
  expect(response.status).toBe(200);
  return response;
}

async function test_get_users(usernames) {
  const responses = await get_users(usernames);
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    expect(response.status).toBe(200);
  }
  return responses;
}

async function test_update_user(user) {
  response = await update_user(user);
  expect(response.status).toBe(200);
  return response;
}

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address) {
  const response = await create_deal(name, address);
  expect(response.status).toBe(200);
  return response;
}

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name) {
  const response = await delete_bar(name);
  expect(response.status).toBe(200);
}

async function test_create_bar(name, address) {
  const response = await create_bar(name, address);
  expect(response.status).toBe(200);
  return response;
}

async function test_get_bar(name) {
  const response = await get_bar(name);
  expect(response.status).toBe(200);
  return response;
}

async function test_get_bars(names) {
  const responses = await get_bars(names);
  for (let i = 0; i < responses.length; i++) {
    const response = responses[i];
    expect(response.status).toBe(200);
  }
  return responses;
}

async function test_update_bar(bar) {
  response = await update_bar(bar);
  expect(response.status).toBe(200);
  return response;
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
