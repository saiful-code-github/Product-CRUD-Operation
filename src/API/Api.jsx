import axios from "axios";

const api = axios.create({
    baseURL: "https://fakestoreapi.com"
});

//get method in api
export const getApi = () => {
    return api.get('/products')
}

//post method in api
export const postApi = (product) => {
    return api.post(`/products`, product)
}
//deleted method in api
export  const deleteApi = (id) =>{
    return api.delete(`/products/${id}`)
}

//put method in api

export const putApi  = (id, product) =>{
    return api.put(`/products/${id}`, product)
}