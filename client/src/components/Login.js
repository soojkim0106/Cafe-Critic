import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";

function Login({users,currUser,loggedIn,setLogIn,setCurrentUser}) {

    const initValue = {
        name: "",
        username: "",
        password: "",
    }

    const [searchUserHold,setSearchUserHold] = useState(initValue)
    // const history = useHistory()

    useEffect(()=>{
        if(users.find((user)=>user===currUser)){
            setLogIn(true)
        } else {
            setLogIn(false)
        }
    },[])
    function handleChange(e){
        const {name,value} = e.target
        setSearchUserHold({
            ...searchUserHold,
            [name]: value,
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        const usernameCheck = users.find((user)=>user.username===searchUserHold.username)
        const passwordCheck = users.find((user)=>user.password===searchUserHold.password)
        if(usernameCheck !== undefined && passwordCheck !== undefined){
            setLogIn(true);
            setCurrentUser(users.find((user)=>user.username===searchUserHold.username))
            // history.push("/pets")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleChange}
                    />
                    <br></br>
                    <label>Password:</label>
                    <input
                    type="text"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
            <NavLink to="/pets">To Pets</NavLink>
        </div>
    );
}

export default Login;