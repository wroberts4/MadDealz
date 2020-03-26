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

  export async function delete_review(id) {
    if (id == '' || id == null)
      return { status: 400, message: "Must specify a review id"};
  
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let query;
    if (typeof id === 'object')
      query = { _id: id };
    else
      query = { _id: db_util.ObjectId(id) };
    
    let review = await dbo.collection("reviews").findOne(query, {});
    await dbo.collection("bars").updateOne({ _id: db_util.ObjectId(review.bar) }, { $pull: { 'reviews': id } });
    
    let result = await dbo.collection("reviews").deleteOne(query, {});
  
    if (result.deletedCount == 0)
      return { status: 500, message: "Review not found"};
    
    return { status: 200, message: "Review deleted successfully" };
  }

  export async function update_review(review) {
    if (review.id == '' || review.id == null) {
      return { status: 400, message: "Must specify a review id"};
    }
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
    
    let values = {
      content: review.content,
      score: review.score
    };
    
    let query;
    if (typeof review.id === 'object')
      query = { _id: review.id };
    else
      query = { _id: db_util.ObjectId(review.id) };
  
    let result = await dbo.collection("reviews").updateOne(query, { $set: values}, { upsert: false });
    con.close();
  
    if (result.matchedCont == 0)
      return { status: 500, message: "Review not found"};
  
    if (result.modifiedCount == 0 && result.matchedCount == 1)
      return { status: 200, message: "Nothing to update"};
  
    return { status: 200, message: "Review updated successfully"};
  }