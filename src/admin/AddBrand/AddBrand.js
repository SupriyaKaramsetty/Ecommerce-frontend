import React,{useState , Fragment} from 'react';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {createBrand} from '../apiAdmin';
import styles from './AddBrand.css';

const AddBrand = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


//destructure user and token from localStorage
const {user, token} = isAuthenticated();

const handleChange = e => {
    setError('');
    setName(e.target.value);
};

const clickSubmit = e => {
    e.preventDefault()
    setError('');
    setSuccess(false);
    //make request to api to create category
    createBrand(user._id,token,{name})
    .then(data => {
        if(data.error){
            setError(true);
        }
        else{
            setError('');
            setSuccess(true);
        }
    });
};

const newBrandForm = () => (
 <div>
     <form onSubmit={clickSubmit}>
        <div>
            
            <input
            className={styles.inputfield}
            type="text"
            placeholder="Brand"
            onChange={handleChange}
            autoFocus
            required />   
        </div>

        <button className={styles.addbrandbutton} style={{marginBottom: "25px", marginLeft:"25px"}}>Create Brand</button>
    </form>
</div>
   
);


const showSuccess = () => {
    if(success) {
        return <h3 className={styles.success}>Brand is created</h3>
    }
}
const showError = () => {
    if(error) {
        return <h3 className={styles.error}>Brand should be unique</h3>
    }
}

const goBack = () => (
    <div>
        <Link style={{textDecoration: "none"}} to="/admin/dashboard">Back to Dashboard</Link>
    </div>
);
    

return (

 <Fragment >
     <div className={styles.wrapper} >
         {showSuccess()}
         {showError()}
         {newBrandForm()}  
    </div> 
    <div className={styles.wrapper} >
    {goBack()}
    </div>
 </Fragment>
    
);
};

export default AddBrand;

    

