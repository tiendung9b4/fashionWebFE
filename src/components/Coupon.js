import React, { useEffect, useState } from 'react'
import { ApiCreateCoupon, ApiDeleteCoupon, ApiGetAllCoupon, ApiUpdateCoupon } from '../services/couponService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Coupon() {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const [coupons, setCoupons] = useState([]);
    const [loadApi, setLoadApi] = useState(false)
    const [couponForm, setCouponForm] = useState({
      couponId: 0,
      couponCode: '',
      discountAmount: '',
      minAmount: ''
    });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if(!user['id']) {
            navigate('/home')
        }else{
            ApiGetAllCoupon()
            .then(data => {
                setCoupons(data?.result)
            })
            .catch(error => {
                ErrorCommonAxios(error)
            })

        }
    }, [loadApi])
  
    const handleChange = (e) => {
        if(e.target.name == 'discountAmount'){
            setCouponForm({
                ...couponForm,
                [e.target.name]: parseInt(e.target.value)
            });
        }else if(e.target.name == 'minAmount'){
            setCouponForm({
                ...couponForm,
                [e.target.name]: parseInt(e.target.value)
            });
        }else{
            setCouponForm({
              ...couponForm,
              [e.target.name]: e.target.value
            });
        }
    };

  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (isEdit) {
        ApiUpdateCoupon(couponForm)
        .then(data => {
            setLoadApi(!loadApi)
            toast.success('Update Coupon successfully.')
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
        setIsEdit(false);
      } else {
        ApiCreateCoupon(couponForm)
        .then(data => {
            setLoadApi(!loadApi)
            toast.success('Create Coupon successfully.')
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
      }
      setCouponForm({
        couponId: null,
        couponCode: '',
        discountAmount: '',
        minAmount: ''
      });
    };
  
    const handleEdit = (coupon) => {
      setIsEdit(true);
      setCouponForm({ ...coupon })
    };
  
    const handleDelete = (couponId) => {
      ApiDeleteCoupon(couponId)
      .then(data => {
        setLoadApi(!loadApi)
        toast.success('Delete Coupon successfully.')
    })
    .catch(error => {
        ErrorCommonAxios(error)
    })
    };
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Coupon Management</h1>
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Coupon Code:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="text"
                name="couponCode"
                value={couponForm.couponCode}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Discount Amount:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="number"
                name="discountAmount"
                value={couponForm.discountAmount}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Minimum Amount:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="number"
                name="minAmount"
                value={couponForm.minAmount}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>
        </form>
        <h2 className="text-2xl font-semibold mb-4">Coupons</h2>
        <ul>
          {coupons.map(coupon => (
            <li key={coupon.couponId} className="mb-4 p-4 border rounded">
              <div>
                <p className="font-semibold">Coupon Code: {coupon.couponCode}</p>
                <p>Discount Amount: {coupon.discountAmount}</p>
                <p>Minimum Amount: {coupon.minAmount}</p>
                <button
                  onClick={() => handleEdit(coupon)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(coupon.couponId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
}
