import React, {useState} from 'react';
import Layout from '../core/Layout/Layout';
import {Link} from 'react-router-dom';
import {signup} from '../auth/index';

const Signup = () => {
    const [values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false 
    })

    const {name,email,password,success,error} = values;

    const handleChange = name => event => {
            setValues({...values, error:false,[name]:event.target.value});
    };

    
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error:false});
        signup({name,email,password})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false})     
        }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success:true
                })
            }
            
        })
    };
   
    const signUpForm = () => (
        <form>
            <div>
                <label>Name</label>
                <input onChange={handleChange('name')} 
                type="text"
                value={name}
                />
            </div>
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
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
        Signup Sucessful! <Link to="/signin">Signin</Link> 
    </div>
);



    return(
        <Layout title="Signup" description="We are waiting for you"
        className="container">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            
        </Layout> 
    );
};

export default Signup;


