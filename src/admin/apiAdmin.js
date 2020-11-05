
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

      //create pc
      export const createPc = (userId,token,pc) => {
        return fetch(`${API}/pc/create/${userId}`,{
               method:"POST",
               
               headers: {
                    
                    Accept: 'application/json',
                   "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
               },
               body: JSON.stringify(pc)
           })
           .then(response => {
               return (response.json());
            })
            .catch(err => {
                alert(err);
            });
       };

          //create hair
        export const createHair = (userId,token,hair) => {
        return fetch(`${API}/hair/create/${userId}`,{
                method:"POST",
                   
                headers: {
                        
                     Accept: 'application/json',
                    "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(hair)
            })
            .then(response => {
                return (response.json());
            })
            .catch(err => {
                 alert(err);
            });
        };
       export const updateCategory = (categoryId, userId, token, category) => {
        return fetch(`${API}/category/${categoryId}/${userId}`, {
            method: 'PUT',
            headers: {
                // content type?
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(category)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    export const updateBrand = (brandId, userId, token, brand) => {
        return fetch(`${API}/brand/${brandId}/${userId}`, {
            method: 'PUT',
            headers: {
                // content type?
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(brand)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
    };

    export const updateHair = (hairId, userId, token, hair) => {
        return fetch(`${API}/hair/${hairId}/${userId}`, {
            method: 'PUT',
            headers: {
                // content type?
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(hair)
        })
            .then(response => {
                return response.json();
            })
            .catch(err => console.log(err));
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

   export const getCategory = categoryId => {                             //get brand,pc,hair
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getBrand = brandId => {                             //get brand,pc,hair
    return fetch(`${API}/brand/${brandId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getPc = pcId => {                             //get brand,pc,hair
    return fetch(`${API}/pc/${pcId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getHair = hairId => {                             //get brand,pc,hair
    return fetch(`${API}/hair/${hairId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
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
    return fetch(`${API}/brands`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getPcs = () => {
    return fetch(`${API}/pcs`,{
        method:'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

export const getHairs = () => {
    return fetch(`${API}/hairs`,{
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

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


