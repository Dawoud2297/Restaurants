import React from 'react'
import { Link } from 'react-router-dom'
import {v4} from 'uuid'
import UseLocalStorage from './UseLocalStorage'



export default function Login(props) {

    const initialUserState = {
        name : '',
        id : ''
    }

    const [user, setUser] = UseLocalStorage(initialUserState.name,initialUserState)

    const onChageUser = (event) =>{
        const {name,value} = event.target;
        setUser({...user,[name] : value})
    }

    const login = () =>{
        props.login(user)
        props.history.push('/')
    } 
    const idRef = React.useRef()
    const  createAutId = () =>{
        idRef.current.value = user.id = v4()
    }

    return (
        <div className="mt-4">
            <div className="d-flex flex-row jsutify-content-center align-items-center">
                    <label htmlFor="name">Name </label><br/>
                <div className="input-group">
                    <input
                    type="text"
                    value={user.name}
                    onChange={onChageUser}
                    name="name"
                    id="name"
                    className="form-control m-2"
                    />
                </div>
                    <label htmlFor="id">Id </label><br/>
                <div className="input-group m-3">
                    <input
                    type="text"
                    ref={idRef}
                    value={user.id}
                    onChange={onChageUser}
                    name="id"
                    id="id"
                    className="form-control"
                    />
                <button onClick={createAutId} className="btn btn-outline-primary input-group-append text-black">Auto Id</button>
                </div>
            </div>
            <div className="m-4">
            <Link to={"/restaurants"} className="btn btn-secondary" onClick={login}> Login</Link>
            </div>
        </div>
    )
}
