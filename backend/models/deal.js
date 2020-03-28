import * as db_util from '../db';

export async function create_deal(deal) {
    if (!deal.info || !deal.times)
        return { status: 400, message: "Deal info and times must be provided" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let deal_result = await dbo.collection('deals').insertOne(deal);
    
    let bar_id = db_util.ObjectId(deal.bar);
    const query = { _id: bar_id };

    let result = await dbo.collection("bars").updateOne(query, { $addToSet: { 'deals': deal_result.ops[0]._id.toString() } }, { upsert: false });
    con.close();
    
    if (result == null)
      return { status: 500, message: "Error adding deal to database" };
      
    return { status: 200, message: "Deal successfully created", deal: deal };
}

export async function get_deal(id) {
  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let deal = await dbo.collection("deals").findOne({ '_id': db_util.ObjectId(id) }, {});
  con.close();
  
  if (deal == undefined)
    return { status: 404, message: "Deal does not exist", deal: deal};

  return {status: 200, message: "Deal successfully retrieved", deal: deal};
}

export async function delete_deal(id) {
  if (!id)
    return { status: 400, message: "Must specify a deal id"};

  let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  let dbo = con.db(db_util.db_name);

  let query;
  if (typeof id === 'object')
    query = { _id: id };
  else
    query = { _id: db_util.ObjectId(id) };
  
  let deal = await dbo.collection("deals").findOne(query, {});
  await dbo.collection("bars").updateOne({ _id: db_util.ObjectId(deal.bar) }, { $pull: { 'deals': id } });
  
  let result = await dbo.collection("deals").deleteOne(query, {});

  if (result.deletedCount == 0)
    return { status: 500, message: "Deal not found"};
  
  return { status: 200, message: "Deal deleted successfully" };
}

export async function update_deal(deal) {
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
  if (typeof deal.id === 'object')
    query = { _id: deal.id };
  else
    query = { _id: db_util.ObjectId(deal.id) };

  let result = await dbo.collection("deals").updateOne(query, { $set: values}, { upsert: false });
  con.close();

  if (result.matchedCont == 0)
    return { status: 500, message: "Deal not found"};

  if (result.modifiedCount == 0 && result.matchedCount == 1)
    return { status: 200, message: "Nothing to update"};

  return { status: 200, message: "Deal updated successfully"};
}