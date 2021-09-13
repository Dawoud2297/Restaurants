import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import DataCenter from '../services/DataCenter'
import Pagination from './pagination'

export default function RestaurantsList(props) {
    const [restaurants, setRestaurants] = useState([])
    const [searchName, setSearchName] = useState("")
    const [searchZipcode, setSearchZipcode] = useState("")
    const [searchCuisine, setSearchCuisine] = useState("")
    const [cuisines, setCuisines] = useState(["All Cuisines"])

    const find = (query, by) =>{
        DataCenter.find(query,by)
        .then(response=>{
            setRestaurants(response.data.restaurants)
        })
        .catch(e=>{
            console.log(e)
        })
    }

    const findByName = () =>{
        find(searchName, "name")
    }
    const findByZipcode = () =>{
        find(searchZipcode, "zipcode")
    }
    const findByCuisine = () =>{
        if(searchCuisine === "All Cuisines"){
            retrieveRestaurants()
        }else{
            find(searchCuisine, "cuisine")
        }
    }

    const onChangeSearchName = e =>{
        setSearchName(e.target.value)
    }
    const onChangeSearchZipcode = e =>{
        setSearchZipcode(e.target.value)
    }
    const onChangeSearchCuisine = e =>{
        setSearchCuisine(e.target.value)
    }

    const retrieveRestaurants = () =>{
        DataCenter.getAll()
        .then(response=>{
            setRestaurants(response.data.restaurants)
        })
    }

    const retrieveCuisines = () =>{
        DataCenter.getCuisine()
        .then(response=>{
            setCuisines(["All Cuisines"].concat(response.data))
        })
        .catch(e=>{
            console.log(e)
        })
    }

    useEffect(()=>{
        retrieveRestaurants()
        retrieveCuisines()
    },[])


    return (
        <div>
            {/* <Link to="/" className="btn btn-success m-4" style={{float:'right',position:'sticky'}}>Home</Link> */}
            <div className="d-flex flex-row m-4">
                <div className="input-group m-3">
                    <input
                    type="text"
                    placeholder='Search By Name'
                    className="form-control bg-dark text-white"
                    value={searchName}
                    onChange={onChangeSearchName}
                    />
                    <button onClick={findByName} className="btn btn-outline-secondary input-group-append">Search</button>
                </div>
                <div className="input-group m-3">
                    <input
                    type="text"
                    placeholder='Search By Zipcode'
                    className="form-control bg-dark text-white"
                    value={searchZipcode}
                    onChange={onChangeSearchZipcode}
                    />
                    <button onClick={findByZipcode} className="btn btn-outline-secondary input-group-append">Search</button>
                </div>
                <div className="input-group m-3">
                    <select className="bg-dark text-white" onChange={onChangeSearchCuisine} onClick={findByCuisine}>
                        {
                            cuisines.map(cuisine=>{
                                return (
                                    <option value={cuisine} className="bg-dark text-white">{cuisine.substr(0,20)}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <div>
                <Pagination restaurants={restaurants}/>
            </div>
        </div>
    )
}
