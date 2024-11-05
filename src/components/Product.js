import React, { useState, useEffect } from 'react';
import { ApiGetAll, ApiGetAllCategory, ApiGetAllProductBySubCategoryId, ApiGetAllSubCategory, ApiGetAllSubCategoryByCategoryId } from '../services/productsService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    ApiGetAll()
    .then(data => {
        setProducts(data?.result)
    })
    .catch(error => {
        ErrorCommonAxios(error)
    })

    ApiGetAllCategory()
    .then(data => {
        setCategories(data?.result)
    })
    .catch(error => {
        ErrorCommonAxios(error)
    })

    ApiGetAllSubCategory()
    .then(data => {
        setSubCategories(data?.result)
    })
    .catch(error => {
        ErrorCommonAxios(error)
    })
  }, []);


  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);

    if(event.target.value != ''){
        ApiGetAllSubCategoryByCategoryId(event.target.value)
        .then(data => {
            setSubCategories(data?.result)
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }else{
        ApiGetAll()
        .then(data => {
            setProducts(data?.result)
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }
  };

  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value);
    
    if(event.target.value != ''){
        ApiGetAllProductBySubCategoryId(event.target.value)
        .then(data => {
            setProducts(data?.result)
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }else{
        ApiGetAll()
        .then(data => {
            setProducts(data?.result)
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const Search = () => {
    if(searchTerm == ''){
        ApiGetAll()
        .then(data => {
            setProducts(data?.result)
        })
        .catch(error => {
            ErrorCommonAxios(error)
        })
    }else{
        console.log("123")
        setProducts(products.filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }

  const handleClickProduct = (id) => {
    navigate('/productDetail?id='+id)
  }

  return (
    <div  className='pt-40 pb-80 pl-20 pr-20'>
        {/* Filter product */}
        <div className="flex items-center space-x-4 mb-4">
            <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="">Categories</option>
                {categories.map((category) => (
                <option key={category?.categoryId} value={category['categoryId']}>{category['categoryName']}</option>
                ))}
            </select>
            <select
                value={selectedSubCategory}
                onChange={handleSubCategoryChange}
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            >
                <option value="">SubCategories</option>
                {subCategories.map((subCategory) => (
                <option key={subCategory?.subCategoryId} value={subCategory['subCategoryId']}>{subCategory['subCategoryName']}</option>
                ))}
            </select>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
                onClick={Search}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                Search
            </button>
        </div>

        {/* List product */}
        <div>
            <h1 className="text-3xl font-bold mb-4">All Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                <div style={{cursor: 'pointer'}} onClick={() => handleClickProduct(product['productId'])} key={product.productId} className="bg-white p-4 rounded-md shadow-md">
                    <img src={product.productUrl} alt={product.productName} className="w-full h-full object-cover mb-4" />
                    <h2 className="text-xl font-semibold mb-2">{product.productName}</h2>
                    <p className="text-gray-600">${product.productPrice}</p>
                    <div>
                        <span>Rating: </span> 
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                            key={rating}
                            onClick={() => handleRateChange(rating)}
                            className={`focus:outline-none ${
                                rating<=product['productRate'] ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                            >
                            ★
                            </button>
                        ))}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default Product;