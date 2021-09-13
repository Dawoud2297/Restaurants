import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataCenter from '../services/DataCenter'


export default function Restaurant(props) {

    const initialRestaurantState = {
        id : null,
        name : '',
        address : {},
        cuisine : '',
        reviews : []
    }

    const [restaurant, setRestaurant] = useState(initialRestaurantState)

    const getRestaurant = (id)=>{
        DataCenter.get(id)
        .then(response=>{
            setRestaurant(response.data)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        getRestaurant(props.match.params.id)
    },[props.match.params.id])

    const deleteReview = (reviewid,index) =>{
        DataCenter.deleteReview(reviewid)
        .then(response=>{
            setRestaurant(prev=>{
                prev.reviews.splice(index,1)
                return ({
                    ...prev
                })
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }

    return (
        <div>
            {
                restaurant ? (
                    <div className="m-4">
                        <h2>{restaurant.name}</h2>
                        <p>
                            <strong>Cuisine : </strong>{restaurant.cuisine}<br/>
                            <strong>address : </strong>{restaurant.address.building} {restaurant.address.street}, {restaurant.address.zipcode}
                        </p>
                        <Link to={"/restaurants/"+props.match.params.id+"/review"} className="btn btn-primary btn-lg p-3 m-2">Let Opinion</Link>
                        <h2 className="">Reviews</h2>
                        <div className="row">
                                    {
                                        restaurant.reviews.length > 0 ? (
                                            restaurant.reviews.map((review,index)=>{
                                                return (
                                                <div className="col-lg-4 pb-1" key={index}>
                                                    <div className="card" style={{backgroundColor:'#DEC19B'}}>
                                                        <div className="card-body">
                                                            <h2 className="card-title">{review.text}</h2>
                                                            <p className="card-text">
                                                                <strong>Name : </strong>{review.name}<br/>
                                                                <strong>Date : </strong>{review.date}
                                                            </p>
                                                            {
                                                                props.user && props.user.id === review.user_id &&
                                                                <div className="row">
                                                                    <a href onClick={()=>deleteReview(review._id,index)} 
                                                                    className="btn btn-primary btn-lg p-3 col-lg-5 mx-1 mb-1"
                                                                    >Delete</a>
                                                                    <Link
                                                                    to={{pathname : "/restaurants/"+props.match.params.id+"/review",
                                                                        state:{currentReview : review}
                                                                        }}
                                                                    className="btn btn-primary btn-lg p-3 col-lg-5 mx-1 mb-1"
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
        
                                                )
                                            })
                                        ) : (
                                            <p>No Reviews Yet</p>
                                        )
                                    }
                        </div>
                    </div>
                ) : (
                    <div>
                    <p> No Such Restaurant with that Name</p>
                    <Link to="/" className="btn btn-success">Home</Link>
                    </div>
                )
            }
        </div>
    )
}
