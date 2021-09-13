import http from '../http-common'

class DataCenter{
    getAll(page=0){
        return http.get(`?page=${page}`)
    }
    get(id){
        return http.get(`/id/${id}`)
    }
    find(query,by="name",page=0){
        return http.get(`?${by}=${query}&page=${page}`)
    }
    addReview(data){
        return http.post('/review',data)
    }
    updateReveiw(data){
        return http.put('/review',data)
    }
    deleteReview(id){
        return http.delete(`/review?id=${id}`)
    }
    getCuisine(){
        return http.get('/cuisines')
    }
}

export default new DataCenter()