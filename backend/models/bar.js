import * as db_util from '../db';

export async function create_bar(bar) {
    if (bar.name == null || bar.address == null || bar.name == '' || bar.address == '')
        return { status: 400, message: "Bar name and location must be provided" };
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('bars').insertOne(bar);
    con.close;

    if (result == null)
      return { status: 500, message: "Error adding bar to database" };

    return { status: 200, message: "Bar successfully created", bar: result.ops[0] };
}

export async function get_bar(id) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let query;
    // if (typeof id === 'object')
    //   query = { _id: id };
    // else
      query = { _id: db_util.ObjectId(id) };
  
    let bar = await dbo.collection("bars").findOne({ query }, {});
    con.close();
    
    if (bar == undefined)
      return { status: 404, message: "Bar does not exist", bar: bar};
  
    return {status: 200, message: "Bar successfully retrieved", bar: bar};
  }

  export async function get_bars(loc) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let bars = await dbo.collection("bars").find({}).toArray();
    con.close();
    
    if (bars.length == 0)
      return { status: 404, message: "No bars found", bars: bars};

    // users current location, otherwise if none specified then madison's lat/lon
    let user_loc = loc ? loc : { lat: 43.0731, lon: -89.401230 };
    for (let bar of bars) {
      bar.distance = get_distance(bar.location.lat, bar.location.lon, user_loc.lat, user_loc.lon);
    }

    bars.sort((a, b) => {
      return a.distance - b.distance;
    });
  
    return {status: 200, message: "Bars successfully retrieved", bars: bars};
  }

  export async function update_bar(bar) {
    if (bar._id == '' || bar._id == null) {
      return { status: 400, message: "Must specify a bar id"};
    }
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
    
    let values = {};
  
    for (let key in bar) {
      if (bar[key] != '' && key != '_id') {
        values[key] = bar[key];
      }
    }
    
    let query;
    if (typeof bar._id === 'object')
      query = { _id: bar._id };
    else
      query = { _id: db_util.ObjectId(bar._id) };

    let result = await dbo.collection("bars").updateOne(query, { $set: values}, { upsert: false });
    con.close();
  
    if (result.matchedCont == 0)
      return { status: 500, message: "Bar not found"};
  
    if (result.modifiedCount == 0 && result.matchedCount == 1)
      return { status: 200, message: "Nothing to update"};
  
    return { status: 200, message: "Bar updated successfully"};
  }

  export async function delete_bar(id) {
    if (id == '' || id == null)
      return { status: 400, message: "Must specify a bar id"};
  
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let query;
    if (typeof id === 'object')
      query = { _id: id };
    else
      query = { _id: db_util.ObjectId(id) };
    let result = await dbo.collection("bars").deleteOne(query, {});
  
    if (result.deletedCount == 0)
      return { status: 500, message: "Bar not found"};
    
    return { status: 200, message: "Bar deleted successfully" };
  }

  // export async function get_deals(bar_id) {
  //   let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
  //   let dbo = con.db(db_util.db_name);
    
  //   let bar = await dbo.collection("bars").findOne({ _id: db_util.ObjectId(bar_id) }, {});

  //   const deal_ids = bar.deals;
  //   let deals = [];

  //   let query, deal;
  //   for (id of deal_ids) {
  //     query = { _id: db_util.ObjectId(id) };
  //     deal = await dbo.collection("deals").findOne({ query }, {});
  //     deals.push(deal);
  //   }
  //   con.close();

  //   return { status: 200, message: "Deals fetched successfully", deals: deals };
  // }

  function get_distance(x1, y1, x2, y2) {
    let radlat1 = Math.PI * x1/180
    let radlat2 = Math.PI * x2/180
    let theta = y1-y2
    let radtheta = Math.PI * theta/180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    return dist
  }
