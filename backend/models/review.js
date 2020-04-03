import * as db_util from '../db';

export async function create_review(review) {
    if (!review) {
      return { status: 400, message: "Must specify a review"};
    }
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);

    review.date = new Date();

    let review_result = await dbo.collection('reviews').insertOne(review);
    
    let bar_id = db_util.ObjectId(review.bar);
    const query = { _id: bar_id };

    let result = await dbo.collection("bars").updateOne(query, { $addToSet: { 'reviews': review_result.ops[0]._id.toString() } }, { upsert: false });
    con.close();

    await update_score(query, Number(review.score));
    
    if (result == null)
      return { status: 500, message: "Error adding review to database" };
      
    return { status: 200, message: "Review successfully created", review: review };
}

async function update_score(query, score) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let bar = await dbo.collection("bars").findOne(query, {});
    
    let rating;
    if (bar.rating == undefined) {
        rating = score;
    }
    else {
        rating = ((bar.rating * (bar.reviews.length - 1)) + score) / bar.reviews.length;
    }

    let result = await dbo.collection("bars").updateOne(query, { $set: { 'rating': rating } }, { upsert: false });
    con.close();
}

export async function get_review(id) {
    if (!id) {
      return { status: 400, message: "Must specify a review id"};
    }
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let review = await dbo.collection("reviews").findOne({ '_id': db_util.ObjectId(id) }, {});
    con.close();
    
    if (review == undefined)
      return { status: 404, message: "Review does not exist", review: review};
  
    return {status: 200, message: "Review successfully retrieved", review: review};
  }

  export async function delete_review(id) {
    if (!id) {
      return { status: 400, message: "Must specify a review id"};
    }
  
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

    await update_score_delete({ _id: db_util.ObjectId(review.bar) }, review.score);
  
    if (result.deletedCount == 0)
      return { status: 500, message: "Review not found"};
    
    return { status: 200, message: "Review deleted successfully" };
  }

  async function update_score_delete(query, score) {
    let con = await db_util.client.connect(db_util.db_url, { useUnifiedTopology: true });
    let dbo = con.db(db_util.db_name);
  
    let bar = await dbo.collection("bars").findOne(query, {});
    
    let rating;
    if (bar.reviews.length == 0) {
        rating = null;
    }
    else {
        rating = ((bar.rating * (bar.reviews.length + 1)) - score) / bar.reviews.length;
    }

    let result = await dbo.collection("bars").updateOne(query, { $set: { 'rating': rating } }, { upsert: false });
    con.close();
}

  export async function update_review(review) {
    if (!review) {
      return { status: 400, message: "Must specify a review"};
    }
    if (!review.id) {
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