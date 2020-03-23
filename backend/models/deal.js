import * as db_util from '../db';

export async function create_deal(deal) {
    if (deal.name == null || deal.address == null || deal.name == '' || deal.address == '')
        return { status: 400, message: "Deal name and info must be filled out" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('deals').insertOne(deal);
  
    const query = { _id: db_util.ObjectId(deal.bar) };
    let result1 = await dbo.collection("bars").updateOne(query, { $addToSet: { 'deals': deal.bar } }, { upsert: false });
    con.close();
    
    if (result == null)
      return { status: 500, message: "Error adding deal to database" };
      
    return { status: 200, message: "Deal successfully created", deal: result.ops[0] };
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