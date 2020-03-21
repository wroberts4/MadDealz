const user_requests = require('../../src/utils/user_requests');
const deal_requests = require('../../src/utils/deal_requests');
const bar_requests = require('../../src/utils/bar_requests');

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
  let response = await delete_user(username);
  console.log(response);
}

async function test_add_user(username, password, email) {
  let response = await add_user(username, password, email);
  console.log(response);
  return response;
}

async function test_get_user(username) {
  let response = await get_user(username);
//  test('return code', () => {
//    expect(response.status).toBe(200);
//  });
  console.log(response);
  return response;
}

async function test_get_users(usernames) {
  let response = await get_users(usernames);
  console.log(response);
  return response;
}

async function test_update_user(user) {
  response = await update_user(user);
  console.log(response);
  return response;
}

///////////////////////////////////// DEAL TESTS /////////////////////////////////////
async function test_create_deal(name, address) {
  let deal = await create_deal(name, address);
  console.log(deal);
  return deal;
}

///////////////////////////////////// BAR TESTS /////////////////////////////////////
async function test_delete_bar(name) {
  let response = await delete_bar(name);
  console.log(response);
}

async function test_create_bar(name, address) {
  let bar = await create_bar(name, address);
  console.log(bar);
  return bar;
}

async function test_get_bar(name) {
  let bar = await get_bar(name);
  console.log(bar);
  return bar;
}

async function test_get_bars(names) {
  let bars = await get_bars(names);
  console.log(bars);
  return bars;
}

async function test_update_bar(bar) {
  bar = await update_bar(bar);
  console.log(bar);
  return bar;
}

///////////////////////////////////// TEST SUITE /////////////////////////////////////
async function test_suite() {
  await test_delete_user('test');
  await test_add_user('test', 'user', 'fake@gmail.com');
  await test_get_user('test');
  await test_get_users(['test']);
  await test_update_user({'username': 'test', 'password': 'new_user'});

  await test_create_deal('test', 'fake street');

  await test_delete_bar('test');
  await test_create_bar('test', 'fake street');
  await test_get_bar('test');
  await test_get_bars(['test']);
  await test_update_bar({'name': 'test', 'address': 'new fake street'});
}

test_suite();
