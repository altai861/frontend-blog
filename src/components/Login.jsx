import React from 'react'
import { useState } from 'react'
import axios from '../api/axios'
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom"

const LOGIN_URL = '/auth/login'

const Login = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({ username: username, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
            const accessToken = response.data?.accessToken;
            const roles = response.data?.roles;
            setAuth({ username, password, roles, accessToken })
            console.log(JSON.stringify(response?.data));
            navigate("/");
        } catch (error) {
            if (!error.response) {
                console.log('No server response')
            } else if (error.response?.status === 400) {
                console.log('Missing Username or Password')
            } else if (error.response?.status === 401) {
                console.log('Unauthorized')
            } else {
                console.log('Login Failed')
            }
        }
    }

  return (
    <div className='login-page'>
        <h1>Login Form</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username: </label>
                <input 
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor='password'>Password:</label>
                <input 
                    type="password"
                    is="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button>Sign In</button>
            </form>
        </div>
    </div>
  )
}

export default Login