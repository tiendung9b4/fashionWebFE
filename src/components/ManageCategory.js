import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiCreateCategory, ApiDeleteCategory, ApiGetAllCategory, ApiUpdateCategory } from '../services/productsService';
import ErrorCommonAxios from 'axios';
import toast from 'react-hot-toast';

export default function ManageCategory() {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [loadApi, setLoadApi] = useState(false)
  const [categoryForm, setCategoryForm] = useState({
    categoryId: 0,
    categoryName: ''
  });
  const [isEdit, setIsEdit] = useState(false);


  useEffect(() => {
    if (!user['id']) {
      navigate('/home')
    } else {
      ApiGetAllCategory()
        .then(data => {
          setCategories(data?.result)
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })

    }
  }, [loadApi])

  const handleChange = (e) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      ApiUpdateCategory(categoryForm)
        .then(data => {
          setLoadApi(!loadApi)
          toast.success('Edit Category successfully.')
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
      setIsEdit(false);
    } else {
      ApiCreateCategory(categoryForm)
        .then(data => {
          setLoadApi(!loadApi)
          toast.success('Create Category successfully.')
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
    setCategoryForm({
      categoryId: 0,
      categoryName: ''
    });
  };

  const handleEdit = (category) => {
    setIsEdit(true);
    setCategoryForm({ ...category });
  };

  const handleDelete = (categoryId) => {
    ApiDeleteCategory(categoryId)
      .then(data => {
        setLoadApi(!loadApi)
        toast.success('Delete Category successfully.')
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Category Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category Name:
            <input
              className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
              type="text"
              name="categoryName"
              value={categoryForm.categoryName}
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
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.categoryId} className="mb-4 p-4 border rounded">
            <div>
              <p className="font-semibold">Category Name: {category.categoryName}</p>
              <button
                onClick={() => handleEdit(category)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category.categoryId)}
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
