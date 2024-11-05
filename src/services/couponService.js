// import React from 'react'
import axios from '../axios/myAxios'

const ApiGetAllCoupon = () => {
    return axios.get(`api/coupon/GetAll`)
}

const ApiCreateCoupon = (data) => {
    return axios.post(`api/coupon/CreateCoupon`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiUpdateCoupon = (data) => {
    return axios.put(`api/coupon/UpdateCoupon`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiDeleteCoupon = (id) => {
    return axios.delete(`api/coupon/DeleteCoupon/${id}`)
}

export { ApiGetAllCoupon,
    ApiCreateCoupon,
    ApiUpdateCoupon,
    ApiDeleteCoupon }