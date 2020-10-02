import React,{useState} from 'react';
import Layout from '../core/Layout/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {createCategory} from './apiAdmin';

const AddCategory = () => {
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
    createCategory(user._id,token,{name})
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

const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
        <div>
            <label>Name</label>
            <input
            type="text"
            onChange={handleChange}
            autoFocus
            required />   
        </div>

        <button>Create Category</button>
    </form>
);


const showSuccess = () => {
    if(success) {
        return <h3>{name} is created</h3>
    }
}
const showError = () => {
    if(error) {
        return <h3>Category should be unique</h3>
    }
}

const goBack = () => (
    <div>
        <Link to="/admin/dashboard">Back to Dashboard</Link>
    </div>
);
    

return (
    <Layout title="Add a new Category" description="Add if needed">
 
    <div>
         {showSuccess()}
         {showError()}
         {newCategoryForm()}  
         
         
    </div> 
    <div>
    {goBack()}
    </div>
        
    </Layout>
);
};

export default AddCategory;

    

