const RestaurantsCtrl = require('./restaurantsController')
const ReviewsCtrl = require('./reviewsController')


const express = require('express')
const router = express.Router()

router.route('/').get(RestaurantsCtrl.apiGetRestaurants)
router.route('/id/:id').get(RestaurantsCtrl.apiGetRestaurantById)
router.route('/cuisines').get(RestaurantsCtrl.apiGetCuisines)

router
.route('/review')
.post(ReviewsCtrl.apiPostReview)
.put(ReviewsCtrl.apiUpdateReview)
.delete(ReviewsCtrl.apiDeleteReview)

module.exports = router