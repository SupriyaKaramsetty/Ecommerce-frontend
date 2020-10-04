

import React,{useState,useEffect} from 'react';
import Layout from '../core/Layout/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';
import {createProduct,getCategories} from './apiAdmin';


const AddProduct = () => {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
    });

    const {user,token} = isAuthenticated();
    const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
    } = values;
    
    //load categories and set form data

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setValues({...values,categories: data, formData: new FormData()});
            }
        });
    };
    useEffect(() => {
        init();
    },[])

   
    const handleChange = item => event => {
        const value = item === 'photo' ? event.target.files[0] : event.target.value;
       formData.set(item, value);
        setValues({...values,[item]: value});
    };

    const clickSubmit = event => {
        event.preventDefault();

        setValues({...values,error:'',loading:true});

        createProduct(user._id,token,formData)
        .then(data => {
            if(data.error){
                setValues({...values, error:data.error});
            }
            else {
                setValues({
                    ...values,name:'',description:'',photo:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    createdProduct: data.name

                });
            }
        });
    };


    const newPostForm = () => (

        <form onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div>
                <label className='btn btn-secondary'>
                    <input type='file' name='photo' accept='image/*'/>
                </label>
            </div>
           <div>
               <label>Name</label>
               <input onChange={handleChange('name')} type='text' value={name}/>
           </div>
           <div>
               <label>Description</label>
               <textarea onChange={handleChange('description')} type='text' value={description}/>
           </div>
           <div>
               <label>Price</label>
               <input onChange={handleChange('price')} type='number' value={price}/>
           </div>
           <div>
               <label>Category</label>
               <select onChange={handleChange('category')}>
               <option>Select</option>
               {categories && categories.map((c,i) => (
                   <option key={i} value={c._id}>{c.name}</option>
               ))}
               </select>
           </div>
           <div>
               <label>Shipping</label>
               <select onChange={handleChange('shipping')}>
                   <option>Select</option>
                   <option value='0'>no</option>
                   <option value='1'>yes</option>
               </select>
           </div>
           <div>
               <label>Quantity</label>
               <input onChange={handleChange('quantity')} type='number' value={quantity}/>
           </div>
        <button type="submit">Create Product</button>
        </form>
    );


    const showError = () => (
        <div style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div  style={{display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (
            <h2>Loading</h2>
    ));
    return (
        <Layout title="Add a new product" description="Add if needed">
            <div>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            </div>
            
        </Layout>
    );
};

export default AddProduct;