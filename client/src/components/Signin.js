import React,{ useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import './index.css';

function Signin({onLogin}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState(false)
    const [errors, setErrors] = useState([])

    function handleSubmit(e){
        e.preventDefault();
        fetch('http://localhost:5555/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if (r.ok){
                r.json().then((user) => onLogin(user))
                setStatus(true)
            }else{
                r.json().then((err) => (
                    console.log(r),
                    setErrors(err.errors)))
            }
        })
    }

    if (status){
        return <Redirect to='/home'/>
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

            <label>Password</label>
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            <button type="submit">Submit</button>
        </form>
    )       
}

export default Signin