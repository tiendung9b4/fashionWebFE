import React, { useState } from 'react'
import background from "../assets/image/bg2.jpg";
import { ApiGetMe, ApiLogin } from '../services/authService';
import { useNavigate } from 'react-router'
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slice/AuthSlice';
import Button from './button';

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
      backgroundImage: `url("/images/background2.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: 'cover'
    }} className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-300 rounded shadow-md w-[400px] sm:w-[1200px] sm:h-[600px] flex">
        <div className='object-cover w-[60%]'>
          <img src='/images/background2.jpg' className='h-full' />
        </div>
        <div className='flex flex-col justify-center items-center w-[40%] p-4'>
          <h2 className="text-4xl font-extrabold uppercase mb-6 text-center">Đăng nhập</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-[400px] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
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
                className="w-[400px] px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center gap-x-3 px-6 py-2 text-white font-bold leading-[21px] bg-[#03428E] rounded-[32px] transition-all duration-500 hover:bg-[#F26522]`}
            >
              <p className="text-base">Đăng nhập</p>
              <img
                loading="eager"
                priority
                src="/images/icons/white-arrow.svg"
                alt="icon"
                className="relative"
                height={16}
                width={16}
              />
            </button >
          </form>
        </div>
      </div>
    </div >
  )
}
