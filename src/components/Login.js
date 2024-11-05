import React, { useState } from 'react'
import background from "../assets/image/bg2.jpg";
import { ApiGetMe, ApiLogin } from '../services/authService';
import { useNavigate } from 'react-router'
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/AuthSlice';

const cookies = new Cookies()
export default function Login() {
  var navigate = useNavigate();
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    ApiLogin({
      "userName": email,
      "password": password
    })
    .then(data => {
      try {
        cookies.set('access_token', data['result']['token']) //path=/;domain=localhost
        ApiGetMe()
        .then(data => {
          dispatch(setUser(data))
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
        navigate('/home')
      } catch (error) {
        console.log('errorSetCookie: ' + error)
      }
    })
    .catch(error => {
      ErrorCommonAxios(error)
    })
    
  };
  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: 'cover'
    }} className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full">Log In</button>
        </form>
      </div>
    </div>
  )
}
