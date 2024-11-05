// import React from 'react'
import axios from '../axios/myAxios'

const ApiGetAll = () => {
    return axios.get(`api/product/GetAll`)
}

const ApiCreateProduct = (data) => {
    return axios.post(`api/product/CreateProduct`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}


const ApiUploadProductImage = (productId, data) => {
    return axios.post(`api/product/UploadProductImage/${productId}`, data, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
}

const ApiUpdateProduct = (data) => {
    return axios.put(`api/product/UpdateProduct`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}    

const ApiDeleteProduct = (id) => {
    return axios.delete(`api/product/DeleteProduct/${id}`)
}



const ApiGetAllCategory = () => {
    return axios.get(`api/category/GetAll`)
}

const ApiCreateCategory = (data) => {
    return axios.post(`api/category/CreateCategory`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiUpdateCategory = (data) => {
    return axios.put(`api/category/UpdateCategory`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiDeleteCategory = (id) => {
    return axios.delete(`api/category/DeleteCategory/${id}`)
}

const ApiGetAllSubCategory = () => {
    return axios.get(`api/SubCategory/GetAll`)
}

const ApiCreateSubCategory = (data) => {
    return axios.post(`api/SubCategory/CreateSubCategory`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiUpdateSubCategory = (data) => {
    return axios.put(`api/SubCategory/UpdateSubCategory`, data, {
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

const ApiDeleteSubCategory = (id) => {
    return axios.delete(`api/SubCategory/DeleteSubCategory/${id}`)
}

const ApiGetAllSubCategoryByCategoryId = (id) => {
    return axios.get(`api/SubCategory/GetAllSubCategoryByCategoryId/`+id)
}

const ApiGetAllProductBySubCategoryId = (id) => {
    return axios.get(`api/product/GetAllProductBySubCategoryId/`+id)
}

const ApiGetAllProductById = (id) => {
    return axios.get(`api/product/GetProductById/`+id)
}



export { ApiGetAll, 
    ApiGetAllCategory, 
    ApiGetAllSubCategory, 
    ApiGetAllSubCategoryByCategoryId, 
    ApiGetAllProductBySubCategoryId, 
    ApiGetAllProductById,
    ApiCreateCategory,
    ApiUpdateCategory,
    ApiDeleteCategory,
    ApiCreateSubCategory,
    ApiUpdateSubCategory,
    ApiDeleteSubCategory,
    ApiCreateProduct,
    ApiUpdateProduct,
    ApiDeleteProduct,
    ApiUploadProductImage }