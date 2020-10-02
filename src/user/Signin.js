import React, {useState} from 'react';
import Layout from '../core/Layout/Layout';
import { Redirect} from 'react-router-dom';
import {signin , authenticate, isAuthenticated} from '../auth/index';

const Signin = () => {
    const [values,setValues] = useState({
        email: 'radhika@gmail.com',
        password: 'radhika1',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email,password,loading,redirectToReferrer,error} = values;
    const {user} = isAuthenticated();

    const handleChange = name => event => {
            setValues({...values, error:false,[name]:event.target.value});
    };

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false,loading: true});
        signin({email,password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error,loading:false})     
        }
            else{
                authenticate(data,() => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                })
                
            }
            
        })
    };
   
    const signInForm = () => (
        <form>
            <div>
                <label>Email</label>
                <input onChange={handleChange('email')} 
                type="email"
                value={email}
                />
            </div>
            <div>
                <label>Password</label>
                <input onChange={handleChange('password')} 
                type="password"
                value={password}
                />
            </div>
            <button onClick={clickSubmit}>Submit</button>
        </form>
    );  


const showError = () => (
    <div className="alert alert-danger head" style={{display: error ? '' : 'none'}}>
        {error}
    </div>
);

const showLoading = () => 
    loading && (
    <div><h2>Loading...</h2></div>
);

const redirectUser = () => {
    if(redirectToReferrer) {
        if(user && user.role === 1){
            return <Redirect to="/admin/dashboard" />
        }
        else{
            return <Redirect to="/user/dashboard" />
        }
  
    }
    if(isAuthenticated()){
        return <Redirect to="/" />
    }
};



    return(
        <Layout title="Signin" description="COME,BECOME A PART OF US"
        className="container">
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
            
        </Layout> 
    );
};

export default Signin;


