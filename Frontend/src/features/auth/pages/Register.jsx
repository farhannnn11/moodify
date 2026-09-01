import React, { useState } from 'react'
import "../styles/form.scss"
import { Link, useNavigate } from 'react-router'
import {useAuth} from "../hooks/useAuth"

const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {user,loading,handlerRegister} = useAuth()
    let navigate = useNavigate()
    const submitHandler = async(e)=>{
        e.preventDefault()
        await handlerRegister({username,email,password})
        navigate("/login")
        setUsername("")
        setEmail("")
        setPassword("")
    }
    

  return (
    <main>
    <div>
        <h1>Register</h1>
        <form onSubmit={(e)=>{
            submitHandler(e)
        }}>
            <input value={username} onChange={(e)=>{
                setUsername(e.target.value);
                console.log(username);
                
            }} type="text" placeholder='Enter Username' />
            <input value={email} onChange={(e)=>{
                setEmail(e.target.value)
            }} type="email" placeholder='Enter Email' />
            <input value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }} type="password" placeholder='Enter Password' />
            <button className='primaryButton' type="submit">Register</button>

        </form>
        <p>Already have an account?<Link to="/login"><span className='toggle'> Login</span></Link></p>
    </div>
    </main>

  )
}

export default Register