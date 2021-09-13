import axios from 'axios'

export default axios.create({
    baseURL : "http://localhost:5000/a2mbrother/v1/restaurants",
    headers : {
        "content-type" : "application/json"
    }
})