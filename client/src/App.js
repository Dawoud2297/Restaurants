import React from 'react';
import {Switch ,Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"



import RestaurantsList from './component/restaurantsList';
import Login from './component/login';
import UseLocalStorage from './component/UseLocalStorage'
import HomePage from './component/homePage';
import { AppStyle } from './styles/app-style';
import Restaurant from './component/restaurant';
import AddReview from './component/addReview';


function App() {

  const [user, setUser] = UseLocalStorage(null)

  async function login(user=null){
    setUser(user)
  }

  async function logout(){
    setUser(null)
  }

  return (
    <div className="App">
      <AppStyle/>       
      <div className="container pl-2">
        <Switch>
      
          <Route
          path="/login"
          render={props=>(
            <Login {...props} login = {login} />
            )}
          />
            <Route
            path="/restaurants/:id/review"
            render={props=>{
              return (
                <AddReview {...props} user={user}/>
              )
            }}
            />
            <Route
            path="/restaurants/:id"
            render={props=>(
              <Restaurant {...props} user={user} />
            )}
            />
              <Route
              exact
              path="/restaurants"
              render={props=>(
                <RestaurantsList {...props} logout={logout}/>
              )}
              />
              <Route path="/" 
              render={props=>(
                <HomePage {...props} user={user} logout={logout}/>
              )}
              />
        </Switch>
      </div>
    </div>
  );
}

export default App;
