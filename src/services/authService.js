// import React from 'react'
import axios from '../axios/myAxios'

const ApiLogin = (data) => {
    return axios.post(`api/auth/Login`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiGetMe = () => {
    return axios.get(`api/auth/GetMe`)
}

const ApiGetAllUser = () => {
    return axios.get(`api/auth/GetAllUser`)
}

const ApiRegister = (data) => {
    return axios.post(`api/auth/Register`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiUpdateAvatar = (data) => {
    return axios.post(`api/auth/UpdateAvatar`, data, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
}

export { ApiLogin, ApiGetMe, ApiRegister, ApiUpdateAvatar, ApiGetAllUser }