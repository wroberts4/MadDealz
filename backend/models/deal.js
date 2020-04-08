import * as db_util from '../db';

export async function create_deal(deal) {
    if (!deal) {
      return { status: 400, message: "Must specify a deal"};
    }
    if (!deal.info || !deal.times || !deal.bar_id)
        return { status: 400, message: "Deal info, bar_id, and times must be provided" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let deal_result = await dbo.collection('deals').insertOne(deal);

    let query;
    if (typeof deal.bar_id === 'object') {
      if (JSON.stringify(deal.bar_id).length != 26) {
        return { status: 400, message: "invalid bar id provided" };
      }
      query = { _id: deal.bar_id };
    } else {
      try {
        query = { _id: db_util.ObjectId(deal.bar_id) };
      } catch {
        return { status: 400, message: "invalid bar id provided" };
      }
    }

    let result = await dbo.collection("bars").updateOne(query, { $addToSet: { 'deals': deal_result.ops[0]._id.toString() } }, { upsert: false });
    con.close();
    
    if (!result)
      return { status: 500, message: "Error adding deal to database" };
      
    return { status: 200, message: "Deal successfully created", deal: deal };
}

export async function get_deal(id) {
  if (!id) {
    return { status: 400, message: "Must specify a deal id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

    let query;
    if (typeof id === 'object') {
      if (JSON.stringify(id).length != 26) {
        return { status: 400, message: "invalid id provided" };
      }
      query = { _id: id };
    } else {
      try {
        query = { _id: db_util.ObjectId(id) };
      } catch {
        return { status: 400, message: "invalid id provided" };
      }
    }

  let deal = await dbo.collection("deals").findOne(query, {});
  con.close();
  
  if (!deal)
    return { status: 404, message: "Deal does not exist", deal: deal};

  return {status: 200, message: "Deal successfully retrieved", deal: deal};
}

export async function delete_deal(id) {
  if (!id)
    return { status: 400, message: "Must specify a deal id"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let query;
  if (typeof id === 'object') {
    if (JSON.stringify(id).length != 26) {
      return { status: 400, message: "invalid id provided" };
    }
    query = { _id: id };
  } else {
    try {
      query = { _id: db_util.ObjectId(id) };
    } catch {
      return { status: 400, message: "invalid id provided" };
    }
  }
  
  let deal = await dbo.collection("deals").findOne(query, {});

  let result = await dbo.collection("deals").deleteOne(query, {});
  if (result.deletedCount == 0)
    return { status: 500, message: "Deal not found"};

  if (typeof deal.bar_id === 'object') {
    if (JSON.stringify(deal.bar_id).length != 26) {
      return { status: 400, message: "invalid bar id provided" };
    }
    query = { _id: deal.bar_id };
  } else {
    try {
      query = { _id: db_util.ObjectId(deal.bar_id) };
    } catch {
      return { status: 400, message: "invalid bar id provided" };
    }
  }
  await dbo.collection("bars").updateOne(query, { $pull: { 'deals': id } });
  
  return { status: 200, message: "Deal deleted successfully" };
}

export async function update_deal(deal) {
  if (!deal) {
    return { status: 400, message: "Must specify a deal"};
  }
  if (!deal.id) {
    return { status: 400, message: "Must specify a deal id"};
  }
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);
  
  let values = {
    info: deal.info,
    times: deal.times
  };
  
    let query;
    if (typeof deal.id === 'object') {
      if (JSON.stringify(deal.id).length != 26) {
        return { status: 400, message: "invalid id provided" };
      }
      query = { _id: deal.id };
    } else {
      try {
        query = { _id: db_util.ObjectId(deal.id) };
      } catch {
        return { status: 400, message: "invalid id provided" };
      }
    }

  let result = await dbo.collection("deals").updateOne(query, { $set: values}, { upsert: false });
  con.close();

  if (result.matchedCont == 0)
    return { status: 500, message: "Deal not found"};

  if (result.modifiedCount == 0 && result.matchedCount == 1)
    return { status: 200, message: "Nothing to update"};

  return { status: 200, message: "Deal updated successfully"};
}