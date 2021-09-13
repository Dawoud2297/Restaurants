const app = require('./server')
const mongodb = require('mongodb')
const  RestaurantsDAO = require('./dao/restaurantsDAO')
const ReviewsDAO = require('./dao/reviewsDAO')
const dotenv = require('dotenv')
dotenv.config()


const MongoDBClient = mongodb.MongoClient

const port = process.env.PORT || 5002

MongoDBClient.connect(
    process.env.RESTREVIEWS_DB
)
.catch(e=>{
    console.error(e.stack)
})
.then(async client=>{
    RestaurantsDAO.injectDB(client)
    ReviewsDAO.injectdb(client)
    app.listen(port,()=>console.log(`Server is ready on http://localhost:${port}/a2mbrother/v1/restaurants`))
})

