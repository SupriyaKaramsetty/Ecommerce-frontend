import React, {Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import {signup} from '../../auth/index';
import styles from './Signup.css';


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

    
    const clickSubmit = event => {
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

    const showError = () => (
        <div className={styles.error} style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className={styles.success} style={{display: success ? '' : 'none'}}>
            Signup Sucessful!     <Link to="/signin">Login</Link> 
        </div>
    );
   
    const signUpForm = () => (

     
        <form>
            
            <h3>Sign Up</h3>
            {showSuccess()}
            {showError()}
            <div className={styles.formalign}>
  
                <input onChange={handleChange('name')} 
                type="text"
                placeholder="NAME"
                value={name}
                className={`form-control ${styles.inputfield}`}
                />
                
            </div>
            <div className={styles.formalign}>

                <input onChange={handleChange('email')} 
                type="email"
                placeholder="EMAIL"
                value={email}
                className={`form-control ${styles.inputfield}`}
                />
                
            </div>
            <div className={styles.formalign}>
                 
                <input onChange={handleChange('password')} 
                type="password"
                placeholder="PASSWORD"
                value={password}
                className={`form-control ${styles.inputfield}`}
                />
                
            </div>
            <div className={styles.formbtn}>
					<button className={styles.signupbutton} onClick={clickSubmit}>Sign Up</button>
					<p>Already Have account? <Link to="/signin">Login</Link></p>
			</div>

        </form>
    );  

    const  redirectTo = () => (
        <Link to="/"></Link>
    );

    return(
        <Fragment>
             
        <div className={styles.wrapper}>
			<div className={styles.inner}>
				<div className={styles.imageholder} onclick={redirectTo()}>
					
				</div>
                {signUpForm()}
			</div>
        </div>
        </Fragment>
       
    );
};

export default Signup;


