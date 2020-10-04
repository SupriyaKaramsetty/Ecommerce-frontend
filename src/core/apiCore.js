import { API } from '../config';

export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method:'GET',
        mode: "cors"
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .catch(err => console.log(err));
};


