import * as db_util from '../db';

export async function create_review(review) {
    
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    review.date = new Date();

    let review_result = await dbo.collection('reviews').insertOne(review);
    
    let bar_id = db_util.ObjectId(review.bar);
    const query = { _id: bar_id };

    let result = await dbo.collection("bars").updateOne(query, { $addToSet: { 'reviews': review_result.ops[0]._id.toString() } }, { upsert: false });
    con.close();
    
    if (result == null)
      return { status: 500, message: "Error adding review to database" };
      
    return { status: 200, message: "Review successfully created", review: review };
}

export async function get_review(id) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let review = await dbo.collection("reviews").findOne({ '_id': db_util.ObjectId(id) }, {});
    con.close();
    
    if (review == undefined)
      return { status: 404, message: "Review does not exist", review: review};
  
    return {status: 200, message: "Review successfully retrieved", review: review};
  }