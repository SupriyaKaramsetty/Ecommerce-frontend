
import { API } from '../config';




export const createCategory = (userId,token,category) => {
    return fetch(`${API}/category/create/${userId}`,{
           method:"POST",
           
           headers: {
                
                Accept: 'application/json',
               "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
           },
           body: JSON.stringify(category)
       })
       .then(response => {
           return (response.json());
        })
        .catch(err => {
            alert(err);
        });
   };

   //create brand
   export const createBrand = (userId,token,brand) => {
    return fetch(`${API}/brand/create/${userId}`,{
           method:"POST",
           
           headers: {
                
                Accept: 'application/json',
               "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
           },
           body: JSON.stringify(brand)
       })
       .then(response => {
           return (response.json());
        })
        .catch(err => {
            alert(err);
        });
   };

   export const createProduct = (userId,token,product) => {
    console.log(product);
    return fetch(`${API}/product/create/${userId}`,{
           method:"POST",
           
           headers: {
                
                Accept: 'application/json',
                //"Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
           },
           body: product
       })
       
       .then(response => {
           return (response.json());
        })
        .catch(err => {
            alert(err);
        });
   };

   export const getCategories = () => {
       return fetch(`${API}/categories`,{
           method:'GET'
       })
       .then(response => {
           return response.json();
       })
       .catch(err => console.log(err));
   };

   //brands list
   export const getBrands = () => {
    return fetch(`${API}/brandlist`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};


   export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

