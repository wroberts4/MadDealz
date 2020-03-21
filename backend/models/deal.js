import * as db_util from '../db';

export async function create_deal(deal) {
    if (deal.name == null || deal.address == null || deal.name == '' || deal.address == '')
        return { status: 400, message: "Deal name and info must be filled out" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('deals').insertOne(deal);
    con.close;
    if (result == null)
      return { status: 500, message: "Error adding deal to database" };
    return { status: 200, message: "Deal successfully created", deal: result.ops[0] };
}