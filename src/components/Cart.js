import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ApiApplyCoupon, ApiCheckOut, ApiGetCart, ApiRemoveCart, ApiUpdateQuantityOfCartDetail } from '../services/shoppingCartService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { ApiGetAllCoupon } from '../services/couponService';

export default function Cart() {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [cart, setCart] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loadApi, setLoadApi] = useState(true)

  useEffect(() => {
    if (!user['id']) {
      navigate('/login')
    } else {
      ApiGetCart(user['id'])
        .then(data => {
          setCartItems(data['result']['cartDetails'])
          setCart(data['result'])
        })
        .catch(error => {
          setCart({})
          // ErrorCommonAxios(error)
        })
    }
  }, [loadApi])

  const handleApplyCoupon = () => {
    if (!user['id']) {
      navigate('/login')
    } else {
      ApiGetAllCoupon()
        .then(data => {
          var can_apply = data?.result?.some(c => c.couponCode.toLowerCase() == coupon.toLowerCase())
          if (can_apply) {
            ApiApplyCoupon({
              "cartHeader": {
                "cartHeaderId": 0,
                "userId": user['id'],
                "couponCode": coupon,
                "discount": 0,
                "cartTotal": 0,
                "name": "string",
                "phone": "string",
                "email": "string"
              },
              "cartDetails": [
                {
                  "productId": 0,
                  "product": {
                    "productId": 0,
                    "productName": "string",
                    "productPrice": 0,
                    "productUrl": "string",
                    "material": "string",
                    "color": "string",
                    "productDescription": "string",
                    "productRate": 0,
                    "subCategoryId": 0
                  },
                  "count": 0
                }
              ]
            })
              .then(data => {
                toast.success('Coupon is applied successfully.')
                setCoupon('')
                setLoadApi(!loadApi)
              })
              .catch(error => {
                ErrorCommonAxios(error)
              })
          } else {
            toast.error('Coupon is not valid.')
          }
        })
        .catch(error => {
          toast.error('Apply coupon failed.')
        })
    }
  };

  const handleRemoveFromCart = (cartDetailId) => {
    ApiRemoveCart(cartDetailId)
      .then(data => {
        toast.success('Remove product from cart successfully.')
        setLoadApi(!loadApi)
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })
  };

  const getTotalPrice = () => {
    return cart['cartHeader']?.cartTotal;
  };

  const getTotalQuantity = () => {
    return cartItems.length;
  };

  const handleDecreaseQuantity = (cartDetailId, quantity) => {
    if (quantity == 0) {
      ApiRemoveCart(cartDetailId)
        .then(data => {
          toast.success('Decrease quantity successfully.')
          setLoadApi(!loadApi)
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    } else {
      ApiUpdateQuantityOfCartDetail(cartDetailId, quantity)
        .then(data => {
          toast.success('Decrease quantity successfully.')
          setLoadApi(!loadApi)
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
  };

  const handleIncreaseQuantity = (cartDetailId, quantity) => {
    ApiUpdateQuantityOfCartDetail(cartDetailId, quantity)
      .then(data => {
        toast.success('Decrease quantity successfully.')
        setLoadApi(!loadApi)
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })

  };

  const HandleCheckOut = () => {
    if (!user['id']) {
      navigate('/login')
    } else {
      ApiCheckOut(user['id'])
        .then(data => {
          window.location.href = data['result']
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
  }
  return (
    <div className="container mx-auto py-8 flex flex-wrap pt-32 mb-32">
      {
        cart?.cartHeader?.cartHeaderId
          ?
          <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
            {cartItems.map(item => (
              <div key={item['product']['productId']} className="flex justify-between items-center border-b border-gray-300 py-2">
                <div>
                  <p className="text-lg">{item['product'].productName}</p>
                  <p className="text-gray-600">Price: ${item['product'].productPrice} x {item.count}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => handleDecreaseQuantity(item['cartDetailId'], item.count - 1)} className="ml-12 mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">-</button>
                  <button onClick={() => handleIncreaseQuantity(item['cartDetailId'], item.count + 1)} className="mr-2 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded">+</button>
                  <button onClick={() => handleRemoveFromCart(item['cartDetailId'])} className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
            <div className="mt-4 flex items-center">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="mr-2 px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 rounded-md"
              />
              <button onClick={handleApplyCoupon} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300">Apply Coupon</button>
              {discount > 0 && <p className="text-green-500 ml-4">Coupon applied! Discount: {discount}%</p>}
            </div>
            <div className="mt-4">
              <p className="text-lg">Coupon Code: {cart?.cartHeader?.couponCode}</p>
              <p className="text-lg">Total Product: {getTotalQuantity()}</p>
              <p className="text-lg">Total Price: ${getTotalPrice()}</p>
              <button onClick={() => HandleCheckOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 mt-4">Checkout</button>
            </div>
          </div>
          :
          <>
            <h1 style={{ fontSize: 40, width: '100%' }}>Please add Item to cart</h1>
            <button onClick={() => navigate('/products')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 mt-4">Go to Producs</button>
          </>
      }

    </div>
  )
}
