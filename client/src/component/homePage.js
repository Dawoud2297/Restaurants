import React from 'react'
import { Home } from '../styles/homPage'
import  ReactPlayer  from 'react-player'
import { Link } from 'react-router-dom'

export default function HomePage(props) {



    return (
        <div>
        <div className="container">
            <Home/>
            <div>
                <ul className="row-lg-5">
                    <li className="d-flex flex-row justify-content-center align-items-center text-white pt-4">
                        <h1><span className="text-danger">A2M</span>BROTHERS</h1>
                    </li>
                    <li className="login">
                        {
                            props.user ? (
                                <a href onClick={props.logout} className="nav-link"> logout :) {props.user.name}</a>
                            ) : (

                                <Link to="/login" className="nav-link">login</Link>
                            )
                        }
                    </li>
                    <li>
                        {
                             props.user ? (
                                <Link to="/restaurants" className="nav-link">Restaurants</Link>
                            ) : (
                              <div></div>
                            )
                        }
                    </li>
                </ul>
            </div>
            <div className="more">
                More Than 20,000 Restaurants
            </div>
        </div>
            <div className="player-wrapper">
                <ReactPlayer
                // className='react-player fixed-bottom'
                className="player"
                url="videos/restaurants.mp4"
                width='720'
                height='50%'
                // controls = {true}
                playing = {true}
                // playIcon = {true}
                // onReady = {true}
                light={true}
                loop={true}
                />
            </div>
    </div>
    )
}
