import * as db_util from '../db';

export async function create_bar(bar) {
    if (bar.name == null || bar.location == null)
        return { status: 400, message: "Bar name and location must be provided" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('bars').insertOne(bar);
    con.close;
    if (result == null)
      return { status: 500, message: "Error adding bar to database" };
    return { status: 201, message: "Bar successfully created" };
}

export async function get_bar(id) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let bar = await dbo.collection("bars").findOne({ _id: db_util.ObjectId(id) }, {});
    con.close();
    
    if (bar == undefined)
      return { status: 404, message: "Bar does not exist", bar: bar};
  
    return {status: 200, message: "Bar successfully retrieved", bar: bar};
  }

  export async function get_bars() {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let bars = await dbo.collection("bars").find({}).toArray();
    con.close();
    
    if (bars.length == 0)
      return { status: 404, message: "No bars found", bars: bars};
  
    return {status: 200, message: "Bar successfully retrieved", bars: bars};
  }