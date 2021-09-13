const { ObjectId } = require("bson")

let restaurants

module.exports =  class RestaurantsDAO{
    static async injectDB(conn){
        if(restaurants)return
        
        try{
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection('restaurants')

        }catch(e){
            console.log(`DB error, ${e}`)
        }
    }
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,
    }={}){
        let query
        if(filters){
            if('name' in filters){
                query = {'name' : {$eq : filters["name"]}}
            }else if('zipcode' in filters){
                query = {'address.zipcode' : {$eq : filters["zipcode"]}}
            }else if('cuisine' in filters){
                query = {'cuisine' : {$eq : filters['cuisine']}}
            }
        }
        let cursor

        try{
            cursor = await restaurants.find(query)
        }catch(e){
            console.log(e)
        }
        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try{
            const restaurantsList = await displayCursor.toArray()
            const totalNumRstaurants = await restaurants.countDocuments(query)
            return {restaurantsList, totalNumRstaurants}
        }catch(e){
            console.error(`Display Cursor error, ${e}`)
        }
    }
    static async getRestaurantById(id){
        try {
            const pip = [
                {
                    $match : {
                        _id : new ObjectId(id)
                    },
                },
                {
                    $lookup : {
                        from : "reviews",
                        let : {
                            id : "$_id"
                        },
                        pipeline : [
                            {
                                $match : {
                                    $expr : {
                                        $eq : ["$restaurant_id","$$id"]
                                    }
                                }
                            },
                            {
                                $sort : {
                                    date : -1,
                                }
                            }
                        ],
                        as : 'reviews'
                    }
                },
                {
                    $addFields : {
                        reviews : '$reviews'
                    }
                }
            ]
            return await restaurants.aggregate(pip).next()
        } catch (error) {
            console.error(`Pipline, ${error}`)
        }
    }
    static async getCuisine(){
        let cuisines = []
        try {
            cuisines = await restaurants.distinct("cuisine")
            return cuisines
        } catch (error) {
            console.error(`Cuisines, ${error}`)
        }
    }
}


