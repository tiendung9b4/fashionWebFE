import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios'
import { useSelector } from 'react-redux'
import { ApiGetAllOrderByUserId, ApiGetAllOrderDetailByOrderId } from '../services/shoppingCartService'

export default function Order() {
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState('')  
    const [orderDetail, setOrderDetail] = useState([])
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    useEffect(() => {
        if(user['id'] == ''){
            navigate('/login')
        }else{
            ApiGetAllOrderByUserId(user['id'])
            .then(data => {
                setOrders(data['result'])
            })
            .catch(error => {
                ErrorCommonAxios(error)
            })
        }
    }, [])

    useEffect(() => {
        if(orderId != ''){
            ApiGetAllOrderDetailByOrderId(orderId)
            .then(data => {
                setOrderDetail(data['result'])
            })
            .catch(error => {
                ErrorCommonAxios(error)
            })
        }
    }, [orderId])

    const HandleClickOrder = (oId) => {
        setOrderId(oId)
    }
    console.log("orderDetail: "+JSON.stringify(orderDetail))

  return (
    <div className="container mx-auto py-8 flex flex-wrap pt-32">
        <div style={{width: '40%'}}>
            <h1 className="text-2xl font-bold mb-4">Orders</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="font-bold">OrderNumber</div>
                <div className="font-bold">DiscountAmount</div>
                <div className="font-bold">Total</div>

                {orders.map((order, index) => (
                    <React.Fragment key={order.id}>
                        <div onClick={() => HandleClickOrder(order['orderId'])} className={`col-span-1 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 cursor-pointer`}>{index+1}</div>
                        <div onClick={() => HandleClickOrder(order['orderId'])} className={`col-span-1 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 cursor-pointer`}>{order['DiscountAmount'] ? order['DiscountAmount'] : 0}</div>
                        <div onClick={() => HandleClickOrder(order['orderId'])} className={`col-span-1 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'} hover:bg-gray-300 cursor-pointer`}>${(order['total'])}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
        {
        orderId &&
        <div style={{width: '60%'}} className='pt-12 pl-36'>
            <h1 className="text-2xl font-bold mb-4">Order Detail</h1>
            <div className="grid grid-cols-4 gap-4">
                <div className="font-bold">ProductName</div>
                <div className="font-bold">Price</div>
                <div className="font-bold">Count</div>
                <div className="font-bold">Total</div>

                {orderDetail.map((orderDetail, index) => (
                    <React.Fragment key={orderDetail.id}>
                        <div >{orderDetail['productName']}</div>
                        <div >{orderDetail['price']}</div>
                        <div >${(orderDetail['count'])}</div>
                        <div >${(orderDetail['count'] * orderDetail['price'])}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
        }
    </div>
  )
}
