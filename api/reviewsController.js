const ReviewsDAO = require('../dao/reviewsDAO')

module.exports = class ReviewsCtrl{
    static async apiPostReview(req,res){
        try {
            const restaurantId = req.body.restaurant_id
            const user = {
                name : req.body.name,
                _id : req.body.user_id
            }
            const review = req.body.text
            const date = new Date().toLocaleString()
            const response = await ReviewsDAO.addReviw(restaurantId,user,review,date)

            res.json({status : 'Success Post'})

        } catch (error) {
            console.log(`post, ${error}`)
        }
    }
    static async apiUpdateReview(req,res){
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const text = req.body.text
            const date = new Date().toLocaleString()
            const response = await ReviewsDAO.updateReview(reviewId,userId,text,date)
            res.json({status : 'Successfully Update'})
        } catch (error) {
            console.log(`${error}`)
        }
    }
    static async apiDeleteReview(req,res){
        try {
            const reviewId = req.query.id
            console.log(reviewId)
            const response = await ReviewsDAO.deleteReview(reviewId)
            res.json({status :'Review Deleted Successfully'})
        } catch (error) {
            console.error(`${error}`)
        }
    }
}