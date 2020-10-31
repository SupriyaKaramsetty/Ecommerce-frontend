import React,{useState , Fragment} from 'react';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {createHair} from '../apiAdmin';
import styles from './AddHair.css';

const AddHair = () => {
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
    createHair(user._id,token,{name})
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

const newHairForm = () => (
 <div>
     <form onSubmit={clickSubmit}>
        <div>
            
            <input
            className={styles.inputfield}
            type="text"
            placeholder="Hair"
            onChange={handleChange}
            autoFocus
            required />   
        </div>

        <button style={{marginBottom: "25px", marginLeft:"25px"}}>Create Hair Category</button>
    </form>
</div>
   
);


const showSuccess = () => {
    if(success) {
        return <h3 className={styles.success}>Hair is created</h3>
    }
}
const showError = () => {
    if(error) {
        return <h3 className={styles.error}>Hair should be unique</h3>
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
         {newHairForm()}  
    </div> 
    <div className={styles.wrapper} >
    {goBack()}
    </div>
 </Fragment>
    
);
};

export default AddHair;

    

