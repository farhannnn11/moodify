import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
const Login = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()
const {loading,handleLogin} = useAuth()

const submitHandler= async(e)=>{
      e.preventDefault()
      await handleLogin({email,password})
    navigate("/home")
      setEmail("")
      setPassword("")
  }

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <main>
      <div>
        <h1>Login</h1>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <input value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }} type="email" placeholder='Enter Email' />
          <input value={password} onChange={(e)=>{
              setPassword(e.target.value)
          }} type="password" placeholder='Enter Password' />
          <button className='primaryButton'>Login</button>
        </form>

        <p>Don't have an account?<Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login