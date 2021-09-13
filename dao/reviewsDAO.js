const { ObjectId } = require("bson")

let reviews

module.exports = class ReviewsDAO{
    static async injectdb(conn){
        if(reviews)return 

        try{
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews')
        }catch(e){
            console.error(`${e}`)
        }
    }
    static async addReviw(restaurantId,user,review,date){
        try {
            const reviewData = {
                restaurant_id : ObjectId(restaurantId),
                name : user.name,
                user_id : user._id,
                text : review,
                date : date
            }
            return await reviews.insertOne(reviewData)
        } catch (error) {
            console.error(error)
        }
    }
    static async updateReview(reviewId,userId,text,date){
        try {
            const editOne = await reviews.updateOne(
                {_id : ObjectId(reviewId),user_id:userId},
                {$set : {text : text, date : date}}
            )

            return editOne
            
        } catch (error) {
            console.error(`editOne err, ${error}`)
        }
    }
    static async deleteReview(reviewId){
        try {
            const deleteRev = await reviews.deleteOne({_id : ObjectId(reviewId)})
            return deleteRev
        } catch (error) {
            console.error(`${error}`)
        }
    }
}