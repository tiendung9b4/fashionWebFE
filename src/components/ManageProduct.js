import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import { ApiCreateProduct, ApiDeleteProduct, ApiGetAll, ApiGetAllSubCategory, ApiUpdateProduct, ApiUploadProductImage } from '../services/productsService';
import toast from 'react-hot-toast';

export default function ManageProduct() {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [loadApi, setLoadApi] = useState(false)
  const [products, setProducts] = useState([]);
  const [productURL, setProductURL] = useState('')
  const [subCategories, setSubCategories] = useState([]);
  const [productForm, setProductForm] = useState({
    productId: 0,
    productName: '',
    productPrice: '',
    productUrl: '',
    material: '',
    color: '',
    productDescription: '',
    productRate: '',
    subCategoryId: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!user['id']) {
      navigate('/home')
    } else {
      ApiGetAll()
        .then(data => {
          setProducts(data?.result)
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
    }
  }, [loadApi])


  const handleChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      ApiUpdateProduct(productForm)
        .then(data => {
          if (productURL != '') {
            const formData = new FormData();
            formData.append('source', productURL);
            ApiUploadProductImage(productForm.productId, formData)
              .then(data => {
                toast.success('Edit Product successfully.')
                setProductURL('')
                setLoadApi(!loadApi)
              })
              .catch(error => {
                ErrorCommonAxios(error)
              })
          } else {
            toast.success('Edit Product successfully.')
            setLoadApi(!loadApi)
          }
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
      setIsEdit(false);
    } else {
      ApiCreateProduct(productForm)
        .then(data => {
          if (productURL != '') {
            const formData = new FormData();
            formData.append('source', productURL);
            ApiUploadProductImage(data?.result?.productId, formData)
              .then(data => {
                toast.success('Create Product successfully.')
                setProductURL('')
                setLoadApi(!loadApi)
              })
              .catch(error => {
                ErrorCommonAxios(error)
              })
          } else {
            toast.success('Create Product successfully.')
            setLoadApi(!loadApi)
          }
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
    setProductForm({
      productId: 0,
      productName: '',
      productPrice: '',
      productUrl: '',
      material: '',
      color: '',
      productDescription: '',
      productRate: '',
      subCategoryId: ''
    });
  };

  const handleEdit = (product) => {
    setIsEdit(true);
    setProductForm({ ...product });
  };

  const handleDelete = (productId) => {
    ApiDeleteProduct(productId)
      .then(data => {
        setLoadApi(!loadApi)
        toast.success('Delete Product successfully.')
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Product Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="text"
                name="productName"
                value={productForm.productName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Price:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="number"
                name="productPrice"
                value={productForm.productPrice}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Image:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setProductURL(selectedFile)
                  }
                }}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Material:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="text"
                name="material"
                value={productForm.material}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Color:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="text"
                name="color"
                value={productForm.color}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Description:
              <textarea
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                name="productDescription"
                value={productForm.productDescription}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Rate:
              <input
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                type="number"
                name="productRate"
                value={productForm.productRate}
                onChange={handleChange}
                required
                min="0" max="5"
              />
            </label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Subcategory:
              <select
                className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
                name="subCategoryId"
                value={productForm.subCategoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select Subcategory</option>
                {subCategories.map(subCategory => (
                  <option key={subCategory.subCategoryId} value={subCategory.subCategoryId}>{subCategory.subCategoryName}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.productId} className="mb-4 p-4 border rounded">
            <div>
              <p className="font-semibold">Product Name: {product.productName}</p>
              <p>Price: {product.productPrice}</p>
              <p>Material: {product.material}</p>
              <p>Color: {product.color}</p>
              <p>Description: {product.productDescription}</p>
              <p>Rate: {product.productRate}</p>
              <p>Product Image: <img src={product.productUrl} alt="Product" className="max-w-xs mb-6 rounded-md" /></p>
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.productId)}
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
