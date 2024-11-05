// import React from 'react'
import axios from '../axios/myAxios'

const ApiGetAllOrderByUserId = (id) => {
    return axios.get(`api/cart/GetAllOrder?userId=`+id)
}

const ApiGetAllOrderDetailByOrderId = (id) => {
    return axios.get(`api/cart/GetAllOrderDetailByOrderId?orderId=`+id)
}

const ApiGetCart = (id) => {
    return axios.get(`api/cart/GetCart?userId=`+id)
}

const ApiCartUpsert = (data) => {
    return axios.post(`api/cart/CartUpsert`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiRemoveCart = (cartDetailId) => {
    return axios.post(`api/cart/RemoveCart?cartDetailId=`+cartDetailId)
}

const ApiUpdateQuantityOfCartDetail = (cartDetailId, quantity) => {
    return axios.put(`api/cart/UpdateQuantityOfCartDetail?cartDetailId=${cartDetailId}&quantity=${quantity}`)
}

const ApiCheckOut = (userId) => {
    return axios.get(`api/cart/CheckOut?userId=${userId}`)
}

const ApiApplyCoupon = (data) => {
    return axios.post(`api/cart/ApplyCoupon`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

export { ApiGetAllOrderByUserId, 
    ApiGetAllOrderDetailByOrderId, 
    ApiCartUpsert,
    ApiGetCart,
    ApiRemoveCart,
    ApiUpdateQuantityOfCartDetail,
    ApiCheckOut,
    ApiApplyCoupon }