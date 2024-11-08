import React, { useState } from 'react';
import background from "../assets/image/bg2.jpg";
import { ApiRegister } from '../services/authService';
import toast from 'react-hot-toast';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSubmit = (event) => {
    if (password != confirmPassword) {
      console.log('123')
      toast.error("Password must be equal confirmPassword")
    } else {
      event.preventDefault();
      ApiRegister({
        "email": email,
        "name": fullName,
        "phoneNumber": "",
        "password": password,
        "role": ""
      })
        .then(data => {
          toast.success(data?.result)
          navigate('/login')
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
  };
  return (
    // <div style={{
    //   backgroundImage: `url(${background})`,
    //   backgroundRepeat: "no-repeat",
    //   backgroundPosition: "center",
    //   backgroundSize: 'cover'
    // }} className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
    //     <h2 className="text-2xl font-bold mb-6">Register</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
    //         <input
    //           type="text"
    //           id="fullName"
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    //           placeholder="Enter your full name"
    //           value={fullName}
    //           onChange={(e) => setFullName(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
    //         <input
    //           type="email"
    //           id="email"
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    //           placeholder="Enter your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
    //         <input
    //           type="password"
    //           id="password"
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    //           placeholder="Enter your password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <div className="mb-6">
    //         <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Confirm Password</label>
    //         <input
    //           type="password"
    //           id="confirmPassword"
    //           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    //           placeholder="Confirm your password"
    //           value={confirmPassword}
    //           onChange={(e) => setConfirmPassword(e.target.value)}
    //           required
    //         />
    //       </div>
    //       <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full">Register</button>
    //     </form>
    //   </div>
    // </div>
    /////
    <div style={{
      backgroundImage: `url("/images/background2.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: 'cover'
    }} className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-300 rounded shadow-md w-[400px] sm:w-[1200px] sm:h-[600px] flex">
        <div className='w-[60%]'>
          <img src='/images/background2.jpg' className='h-full object-cover' />
        </div>
        <div className='flex flex-col justify-center items-center w-[40%] p-4'>
          <h2 className="text-4xl font-extrabold uppercase mb-6 text-center">Đăng ký ngay</h2>
          <form onSubmit={handleSubmit} className='w-[400px]'>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Mật khẩu</label>
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
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">Nhắc lại mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center gap-x-3 px-10 py-2 text-white font-bold leading-[21px] bg-[#03428E] rounded-[32px] transition-all duration-500 hover:bg-[#F26522]`}
            >
              <p className="text-base">Bắt đầu</p>
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
