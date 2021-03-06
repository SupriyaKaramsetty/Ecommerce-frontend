
import { API } from '../config';

export const signup = (user) => {
    return fetch(`${API}/signup`,{
           method:"POST",
           mode: "cors",
           headers: {
               //Accept: 'application/json',
               "Content-Type": "application/json"
           },
           body: JSON.stringify(user)
       })
       .then(response => {
           return (response.json());
        })
        .catch(err => {
            alert(err);
        })
   };

   export const passwordResetHashCreated = () => (
    { type: 'AUTHENTICATION_PASSWORD_RESET_HASH_CREATED' }
    );
export const passwordResetHashFailure = () => (
    { type: 'AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE' }
    );
   
export const signin = (user) => {
    return fetch(`${API}/signin`,{
           method:"POST",
           mode: "cors",
           headers: {
               //Accept: 'application/json',
               "Content-Type": "application/json"
           },
           body: JSON.stringify(user)
       })
       .then(response => {
           return (response.json());
        })
        .catch(err => {
            alert(err);
        })
   };


export const authenticate = (data,next) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data));
        next();
    }
};

export const googleauthenticate = (data) => {
    if(typeof window !== undefined){
        localStorage.setItem('jwt',JSON.stringify(data));
    }
};






export const signout = (next) => {
    if(typeof window !== undefined){
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`,{
            method:'GET',
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err=> console.log(err))
    }

};

export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false;
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else {
        return false;
    }
};

export const forgotPassword = email => {
    return fetch(`${API}/forgotpassword/`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
      })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  export const resetPassword = resetInfo => {
    return fetch(`${API}/reset-password/`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetInfo)
      })
      .then(response => response.json())
      .catch(err => console.log(err));
  };