import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pag } from '../styles/pagination'


export default function Pagination({restaurants}) {
    const [pages] = useState(1268)
    const [currentPage, setCurrentPage] = useState(1)


    function goToPrev(){
        setCurrentPage(page=>page - 1)
    }
    function goToNext(){
        setCurrentPage(page=>page+1)
    }
    function changePage(event){
        const pageNum = Number(event.target.textContent)
        setCurrentPage(pageNum)
    }
    const getPagenationData = () =>{
        const start = currentPage * 20 - 20
        const end = start + 20    //many of  restaurants will apper by one click
        return restaurants.slice(start,end)
    }
    const getPagenationGroup = () =>{
        let start = Math.floor((currentPage-1)/10)*10
        return new Array(10).fill().map((_,idx)=>start+idx+1)
    }

    useEffect(()=>{
        window.scrollTo({behavior:'smooth',top:'0px'})
    },[currentPage])


    return (
        <div>
            <div className="row">
                {
                    getPagenationData().map(restaurant=>{
                        const address = `${restaurant.address.building} ${restaurant.address.street}, ${restaurant.address.zipcode}`
                        return (
                            <div className="col-lg-4 pb-1">
                                <div className="card pb-1" style={{backgroundColor:'#DEC19B'}}>
                                    <div className="card-body">
                                        <h3 className="card-title">{restaurant.name}</h3>
                                        <p className="card-text m-2">
                                            <strong>Cuisine : </strong>{restaurant.cuisine}<br/>
                                            <strong>Address :</strong>{address}
                                        </p>
                                        <div className="row">
                                            <Link to={"/restaurants/"+restaurant._id} className="btn btn-primary col-lg-5 m-2">
                                                Feedbacks
                                            </Link>
                                            <a target="blank" href={"https://www.google.com/maps/place/"+address} className="btn btn-primary col-lg-5 m-2">
                                                Map
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Pag/>
            <div className="m-4">
                <div className="pagination">
                    <button onClick={goToPrev} 
                    className={`prev ${currentPage === 1 ? 'disabled' : ''}`}> 
                    prev
                    </button>
                    {
                        getPagenationGroup().map((item,index)=>{
                            return (
                                <button key={index} onClick={changePage}
                                className={`paginationItem ${currentPage === item ? 'active' : null}`}
                                >
                                    <span>{item}</span>
                                </button>
                            )
                        })
                    }
                    <button onClick={goToNext}
                    className={`next ${currentPage === pages ? 'disabled' : ''}`}
                    >
                        next
                    </button>
                </div>
            </div>
            <Link to="/" className="btn btn-success m-4" style={{float:'right',position:'sticky'}}>Home</Link>
        </div>
    )
}
