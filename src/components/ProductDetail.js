import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiGetAllProductById } from '../services/productsService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { useSelector } from 'react-redux';
import { ApiCartUpsert } from '../services/shoppingCartService';
import toast from 'react-hot-toast';

export default function ProductDetail() {
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const [queryParameters] = useSearchParams()
    const location = useLocation()
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState({})
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const id = queryParameters.get('id')
    setProductId(id)
  }, [location.search])

  useEffect(() => {
    if(productId != ''){
        ApiGetAllProductById(productId)
        .then(data => {
            setProduct(data['result'])
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }
  }, [productId])

  const handleAddToCart = () => {
    if(!user['id']){
        navigate('/login')
    }else{
        ApiCartUpsert({
            "cartHeader": {
              "cartHeaderId": 0,
              "userId": user['id'],
              "couponCode": "",
              "discount": 0,
              "cartTotal": 0,
              "name": user['name'],
              "phone": user['phoneNumber'],
              "email": user['email']
            },
            "cartDetails": [
              {
                "productId": product['productId'],
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
                "count": quantity
              }
            ]
          })
        .then(data => {
            toast.success('Add product to cart successfully.')
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };
 
  return (
    <div className="container mx-auto py-8 flex flex-wrap pt-32 mb-32">
        <div className="max-w-lg mx-auto mt-8 p-6 border rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">{product.productName}</h1>
        <img className="rounded-lg mb-4" src={product.productUrl} alt={product.productName} />
        <p className="text-gray-700 mb-4">{product.productDescription}</p>
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">Price: ${product.productPrice}</p>
            <p className="text-gray-700">Rating: {product.productRate}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
            <p className="text-gray-700">Material: {product.material}</p>
            <p className="text-gray-700">Color: {product.color}</p>
        </div>
        <div className="flex justify-between items-center mb-4">
            <label htmlFor="quantity" className="text-gray-700 mr-2">Quantity:</label>
            <input 
            type="number" 
            id="quantity" 
            name="quantity" 
            value={quantity} 
            min="1" 
            onChange={handleQuantityChange} 
            className="w-20 py-1 px-2 border rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
        <button 
            onClick={handleAddToCart} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
            Add to Cart
        </button>
        </div>
    </div>
  )
}
