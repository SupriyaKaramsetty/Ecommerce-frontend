import React, {useState} from 'react';
import { Redirect} from 'react-router-dom';
import {signin , authenticate, isAuthenticated} from '../../auth/index';
import styles from './Signin.css';

const Signin = () => {
    const [values,setValues] = useState({
        email: 'chandana@gmail.com',
        password: 'admin1',
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

    
const showError = () => (
    <div className={styles.error} style={{display: error ? '' : 'none'}}>
        {error}
    </div>
);

const showLoading = () => 
    loading && (
    <div><h4>Loading...</h4></div>
);
   
    const signInForm = () => (
        <form>
              <h3>Login</h3>
        {showError()}
        {showLoading()}
            <div className={styles.formalign}>
                <input onChange={handleChange('email')} 
                type="email"
                value={email}
                placeholder="EMAIL"
                className={`form-control ${styles.inputfield}`}
                />
            </div>
            <div className={styles.formalign}>
                
                <input onChange={handleChange('password')} 
                type="password"
                value={password}
                placeholder="PASSWORD"
                className={`form-control ${styles.inputfield}`}
                />
            </div >
            <div className={styles.formbtn}>
             <button  onClick={clickSubmit}>Submit</button>
             <span className={styles.forgotpd}><a>Forgot password?</a></span>
            </div>
           
        </form>
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
        <div className={styles.wrapper}>
			<div className={styles.inner}>
				<div className={styles.social} >
					
				</div>
                {signInForm()}
                {redirectUser()}
                
			</div>
        </div>
            

    );
};

export default Signin;


