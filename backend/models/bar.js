import * as db_util from '../db';
import { delete_deal } from './deal';
import { delete_review } from './review';
const fs = require('fs');

const fetch = require('node-fetch');

export async function create_bar(bar) {
    if (!bar) {
      return { status: 400, message: "Must specify a bar"};
    }
    if (!bar.name || !bar.address)
        return { status: 400, message: "Bar name and address must be provided" };
        
    console.log(bar);
    if (!bar.location.lat || !bar.location.lon) {
      let url = 'http://www.mapquestapi.com/geocoding/v1/address?key=' 
                    + process.env.WQ_API_KEY 
                    + '&location=' + bar.address;
      url = url.replace(/\s/g, '%20');
      let response = await fetch(url);
      let data = await response.json();
      let location = data.results[0].locations[0].latLng
      bar.location.lat = location.lat;
      bar.location.lon = location.lng;
    }

    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let result = await dbo.collection('bars').insertOne(bar);
    con.close;

    if (!result)
      return { status: 500, message: "Error adding bar to database" };

    return { status: 200, message: "Bar successfully created", bar: result.ops[0] };
}

export async function get_bar(id) {
    if (!id)
        return { status: 400, message: "id must be provided" };
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

    let bar = await dbo.collection("bars").findOne(query, {});
    console.log(bar);
    
    if (!bar)
      return { status: 404, message: "Bar does not exist", bar: bar};
  
    let rc = await get_deals(id);
    bar.deals = rc.deals;
    con.close();

    return {status: 200, message: "Bar successfully retrieved", bar: bar};
  }

  export async function delete_image(id) {
    let uuid = (await get_bar(id)).bar.image;
  
    if (!uuid)
      return;
  
    let path = './public/images/bar/' + uuid + '.png';
  
    fs.unlink(path, (err) => {
      if (err) {
        console.error(err)
        return
      }
    });
  }

  export async function get_bars(loc, limit, distance) {
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
      let rc = await get_deals(bar._id.toString());
      bar.deals = rc.deals;
    }

    bars.sort((a, b) => {
      return a.distance - b.distance;
    });
    
    if (limit)
      bars = bars.slice(0, limit);
    if (distance) {
      bars = bars.filter((bar) => {
        return bar.distance <= distance;
      });
    }

    return {status: 200, message: "Bars successfully retrieved", bars: bars};
  }

  export async function update_bar(bar) {
    if (!bar) {
      return { status: 400, message: "Must specify a bar"};
    }
    if (!bar._id) {
      return { status: 400, message: "Must specify a bar id"};
    }
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
    
    let values = {};
  
    for (let key in bar) {
      if (bar[key] && key != '_id') {
        values[key] = bar[key];
      }
    }
    
    let query;
    if (typeof bar._id === 'object') {
      if (JSON.stringify(bar._id).length != 26) {
        return { status: 400, message: "invalid bar id provided" };
      }
      query = { _id: bar._id };
    } else {
      try {
        query = { _id: db_util.ObjectId(bar._id) };
      } catch {
        return { status: 400, message: "invalid bar id provided" };
      }
    }

    let result = await dbo.collection("bars").updateOne(query, { $set: values}, { upsert: false });
    con.close();
  
    if (result.matchedCont == 0)
      return { status: 500, message: "Bar not found"};
  
    if (result.modifiedCount == 0 && result.matchedCount == 1)
      return { status: 200, message: "Nothing to update"};
  
    return { status: 200, message: "Bar updated successfully"};
  }

  export async function delete_bar(id) {
    if (!id)
      return { status: 400, message: "Must specify a bar id"};
  
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

    // delete all deals corrosponding to bar
    let bar = await dbo.collection("bars").findOne(query, {});
    if (!bar)
      return { status: 500, message: "Bar not found"};
    
    let deal_id;
    for (deal_id of bar.deals) {
      await delete_deal(deal_id);
    }

    let review_id;
    for (review_id of bar.reviews) {
      await delete_review(review_id);
    }
  
    let result = await dbo.collection("bars").deleteOne(query, {});
  
    return { status: 200, message: "Bar deleted successfully" };
  }

  export async function get_deals(bar_id) {
    if (!bar_id)
      return { status: 400, message: "Must specify a bar id"};
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let query;
    if (typeof bar_id === 'object') {
      if (JSON.stringify(bar_id).length != 26) {
        return { status: 400, message: "invalid id provided" };
      }
      query = { _id: bar_id };
    } else {
      try {
        query = { _id: db_util.ObjectId(bar_id) };
      } catch {
        return { status: 400, message: "invalid id provided" };
      }
    }

    let bar = await dbo.collection("bars").findOne(query, {});
  
    let deals = [];
    let id;

    for (id of bar.deals) {
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
      deals.push(deal);
    }
    con.close();

    return { status: 200, message: "Deals retrieved successfully", deals: deals };
  }

  export async function get_reviews(bar_id) {
    if (!bar_id)
      return { status: 400, message: "Must specify a bar id"};
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    let query;
    if (typeof bar_id === 'object') {
      if (JSON.stringify(bar_id).length != 26) {
        return { status: 400, message: "invalid id provided" };
      }
      query = { _id: bar_id };
    } else {
      try {
        query = { _id: db_util.ObjectId(bar_id) };
      } catch {
        return { status: 400, message: "invalid id provided" };
      }
    }

    let bar = await dbo.collection("bars").findOne(query, {});
  
    let reviews = [];
    let id;

    for (id of bar.reviews) {
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

      let review = await dbo.collection("reviews").findOne(query, {});
      reviews.push(review);
    }
    con.close();

    return { status: 200, message: "Reviews retrieved successfully", reviews: reviews };
  }

  export async function update_favorites(id, value) {
    if (!id)
      return { status: 400, message: "Must specify a bar id"};
    if (value != -1 && value != 1)
      return { status: 400, message: "value must be -1 or 1" };
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

    let result = await dbo.collection("bars").updateOne(query, { $inc: { favorites: value }}, {});
    return { status: 200, message: "Bar favorites updated successfully" };
  }

  function get_distance(x1, y1, x2, y2) {
    let radlat1 = Math.PI * x1/180;
    let radlat2 = Math.PI * x2/180;
    let theta = y1 - y2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
