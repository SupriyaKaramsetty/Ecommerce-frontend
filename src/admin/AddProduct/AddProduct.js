import React,{useState,useEffect} from 'react';
import Layout from '../../core/Layout/Layout';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {createProduct,getCategories , getBrands} from '../apiAdmin';
import styles from './AddProduct.css';
//import { getBrands } from '../../core/apiCore';


const AddProduct = () => {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        brandlist:[],
        category:'',
        brand:'',
        shipping:'',
        quantity:'',
        photos: [],
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
    brandlist,
    category,
    brand,
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
    
        getBrands().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setValues({...values,brandlist: data, formData: new FormData()});
            }
        });
    };

    useEffect(() => {
        init();
    },[])



   
    const handleChange = item => event => {
        const value = item === 'photos' ? event.target.files : event.target.value;
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

        <form className={styles.inner} onSubmit={clickSubmit}>
            <h4  className={styles.header}>Create Product</h4>
            <div  className="row">
                <label className='col-6 mb-3'>Chose Photos</label>
                    <input className=" btn btn-secondary col-6 mb-3" type='file' multiple name='photos' accept='image/*'/>
                
            </div>
           <div  className="row">
               <label className="col-6 mb-3">Name</label>
               <input className="col-6 mb-3" onChange={handleChange('name')} type='text' value={name}/>
           </div>
           <div  className="row">
               <label className="col-6 mb-3" >Description</label>
               <textarea className="col-6 mb-3" onChange={handleChange('description')} type='text' value={description}/>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Price</label>
               <input className="col-6 mb-3" onChange={handleChange('price')} type='number' value={price}/>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Category</label>
               <select className="col-6 mb-3" onChange={handleChange('category')}>
               <option>Select</option>
               {categories && categories.map((c,i) => (
                   <option key={i} value={c._id}>{c.name}</option>
               ))}
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Brand</label>
               <select className="col-6 mb-3" onChange={handleChange('brand')}>
               <option>Select</option>
               {brandlist && brandlist.map((b,i) => (
                   <option key={i} value={b._id}>{b.name}</option>
               ))}
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Shipping</label>
               <select className="col-6 mb-3" onChange={handleChange('shipping')}>
                   <option>Select</option>
                   <option value='0'>no</option>
                   <option value='1'>yes</option>
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Quantity</label>
               <input className="col-6 mb-3" onChange={handleChange('quantity')} type='number' value={quantity}/>
           </div>
        <button type="submit" className={styles.addprodbutton}>Create Product</button>
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
            <div>
            {showLoading()}
            {showSuccess()}
            {showError()}
            {newPostForm()}
            </div>
            

    );
};

export default AddProduct;