import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ApiCreateSubCategory, ApiDeleteSubCategory, ApiGetAllCategory, ApiGetAllSubCategory, ApiUpdateSubCategory } from '../services/productsService';
import { ErrorCommonAxios } from '../axios/ErrorCommonAxios';
import toast from 'react-hot-toast';

export default function ManageSubCategory() {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [loadApi, setLoadApi] = useState(false)
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryForm, setSubCategoryForm] = useState({
    subCategoryId: 0,
    subCategoryName: '',
    categoryId: null
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!user['id']) {
      navigate('/home')
    } else {
      ApiGetAllSubCategory()
        .then(data => {
          setSubCategories(data?.result)
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
    }
  }, [loadApi])

  const handleChange = (e) => {
    setSubCategoryForm({
      ...subCategoryForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      ApiUpdateSubCategory(subCategoryForm)
        .then(data => {
          setLoadApi(!loadApi)
          toast.success('Edit SubCategory successfully.')
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
      setIsEdit(false);
    } else {
      ApiCreateSubCategory(subCategoryForm)
        .then(data => {
          setLoadApi(!loadApi)
          toast.success('Create SubCategory successfully.')
        })
        .catch(error => {
          ErrorCommonAxios(error)
        })
    }
    setSubCategoryForm({
      subCategoryId: 0,
      subCategoryName: '',
      categoryId: null
    });
  };

  const handleEdit = (subCategory) => {
    setIsEdit(true);
    setSubCategoryForm({ ...subCategory });
  };

  const handleDelete = (subCategoryId) => {
    ApiDeleteSubCategory(subCategoryId)
      .then(data => {
        setLoadApi(!loadApi)
        toast.success('Delete SubCategory successfully.')
      })
      .catch(error => {
        ErrorCommonAxios(error)
      })
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Subcategory Management</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subcategory Name:
            <input
              className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
              type="text"
              name="subCategoryName"
              value={subCategoryForm.subCategoryName}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category Id:
            <select
              className="border border-gray-400 rounded px-3 py-2 mt-1 w-full"
              name="categoryId"
              value={subCategoryForm.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
      <h2 className="text-2xl font-semibold mb-4">Subcategories</h2>
      <ul>
        {subCategories.map(subCategory => (
          <li key={subCategory.subCategoryId} className="mb-4 p-4 border rounded">
            <div>
              <p className="font-semibold">Subcategory Name: {subCategory.subCategoryName}</p>
              <p>Category Id: {subCategory.categoryId}</p>
              <button
                onClick={() => handleEdit(subCategory)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(subCategory.subCategoryId)}
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
