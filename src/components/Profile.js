import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ApiGetMe, ApiUpdateAvatar } from '../services/authService'
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios'
import toast from 'react-hot-toast'
import { setUser } from '../redux/slice/AuthSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  
  const ChangeAvatar = () => {
    const data = new FormData()
    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/png, image/jpeg, image/jpg'
    input.onchange = (e) => {
      var file = e.target.files[0]
      data.append('source', file)
      ApiUpdateAvatar(data)
      .then(data => {
        ApiGetMe()
        .then(data => {
          dispatch(setUser(data))
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
        toast.success('Change avatar successfully.')
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })
    }
    input.click()
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <img
          className="w-20 h-20 rounded-full mx-auto"
          src={user['avatarUrl']}
          alt="User Profile"
        />
        <div style={{width: '100%'}} className=' flex justify-center mt-1'>
            <button onClick={() => ChangeAvatar()} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-xs">
                Change Avatar
            </button>
        </div>
        <h2 className="text-xl font-semibold mt-4 text-center">{user['name']}</h2>
        <p className="text-gray-600 text-sm text-center mt-2">Frontend Developer</p>
        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-gray-600 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel tortor elit.</p>
        </div>
        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-gray-600 mt-2">Email: {user['email']}</p>
          <p className="text-gray-600">Phone: {user['PhoneNumber']}</p>
        </div>
      </div>
    </div>
  )
}
