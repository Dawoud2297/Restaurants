import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DataCenter from '../services/DataCenter'

export default function AddReview(props) {

    let edit = false
    let initialReviewState = ''

    if(props.location.state && props.location.state.currentReview){
        edit = true
        initialReviewState = props.location.state.currentReview.text
    }


    const [review, setReview] = useState(initialReviewState)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = event =>{
        setReview(event.target.value)
    }

    const saveReview = () =>{
        let data = {
            restaurant_id : props.match.params.id,
            name : props.user.name,
            user_id : props.user.id,
            text : review ,
        }
        if(edit){
            data.review_id = props.location.state.currentReview._id
            DataCenter.updateReveiw(data)
            .then(response=>{
                setSubmitted(true)
            })
            .catch(e=>{
                console.log(e)
            })
        }else{
            DataCenter.addReview(data)
            .then(response=>{
                setSubmitted(true)
            })
            .catch(e=>{
                console.log(e)
            })
        }
    }

    return (
        <div>
            {
                props.user ? (
                    <div>
                        {
                            submitted ?(
                                <div>
                                    <p>You Submitted SuccessFully!</p>
                                    <Link to={"/restaurants/"+props.match.params.id} className="btn btn-success">Back to Restaurant</Link>
                                </div>
                            ) : (
                                <div className="row">
                                    <label htmlFor="description">
                                        {edit ? 'Edit' : 'New'} Feedback
                                    </label>
                                    <div className="d-flex flex-row">
                                        <textarea
                                        className="form-control"
                                        value={review}
                                        onChange={handleChange}
                                        required
                                        name="text"
                                        />
                                    </div>
                                    <button onClick={saveReview} className="btn btn-success btn-lg p-4 col-lg-3 m-4">Submit</button>
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <div>
                        <p>Please login first</p>
                        <Link to="/login" className="btn btn-success btn-lg p-4 m-4">Login</Link>
                    </div>
                )
            }
        </div>
    )
}
