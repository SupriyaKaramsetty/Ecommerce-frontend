import React, { useState,useEffect,Fragment} from 'react';
import {Link} from 'react-router-dom';
import { contact } from '../apiCore';
import styles from '../../user/Signup/Signup';

const ContactUs = () => {
    
    
    const [values,setValues] = useState({
        name: '',
        email: '',
        message: '',
        error: '',
        success: false 
    })

    const {name,email,message,success,error} = values;

    const handleChange = name => event => {
        setValues({...values, error:false,[name]:event.target.value});
};

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error:false});
        contact({name,email,message})
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, success:false})     
        }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    message: '',
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
            Your message has been sent!  
        </div>
    );


    const contactUsForm = () => (

        <form>
            
            <h3>Contact Us</h3>
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
                 
                <textarea onChange={handleChange('message')} 
                type="text"
                placeholder="message"
                value={message}
                className={`form-control ${styles.inputfield}`}>

                </textarea>
                
                
            </div>
            <div className={styles.formbtn}>
					<button className={styles.signupbutton} onClick={clickSubmit}>Submit</button>
					
			</div>

        </form>
    ); 

    const  redirectTo = () => (
        <Link to="/"></Link>
    );

    return(
        <Fragment>
                {contactUsForm()}

        </Fragment>
       
    );
};

    // resetForm(){
    //   this.setState({name: '', email: '', message: ''})
    // }

  export default ContactUs;