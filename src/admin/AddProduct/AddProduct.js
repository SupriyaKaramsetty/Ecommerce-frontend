import React,{useState,useEffect} from 'react';

import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {createProduct, getCategories , getBrands , getPcs , getHairs} from '../apiAdmin';
import styles from './AddProduct.css';
//import { getBrands } from '../../core/apiCore';


const AddProduct = () => {

    const [values, setValues] = useState({
        name:'',
        description:'',
        price:'',
        categories:[],
        brands:[],
        pcs:[],
        hairs:[],
        category:'',
        brand:'',
        pc:'',
        hair:'',
        shipping:'',
        quantity:'',
        intensity:'',
        percentage:'',
        photo: '',
        loading:false,
        error:'',
        createdProduct:'',
        redirectToProfile:false,
        formData:''
        
    });
    
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [hairs, setHairs] = useState([]);
    const [pcs, setPcs] = useState([]);

    const {user,token} = isAuthenticated();
    const {
    name,
    description,
    price,
    category,
    brand,
    pc,
    hair,
    shipping,
    quantity,
    intensity,
    percentage,
    loading,
    error,
    createdProduct,
    redirectToProfile, 
    formData
    } = values;
    
    //load categories and set form data

    const init = () => {
        // getCategories().then(data => {
        //     if(data.error){
        //         setValues({...values,error: data.error});
        //     }else {
        //         setValues({...values,categories: data, formData: new FormData()});
        //     }
        // });
        
        initCategories();
        initBrand();
        initPc();
        initHair();

    };

    

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setCategories(data);
                setValues({...values,formData: new FormData()});
            }
        });
    };

    const initBrand = () => {
        getBrands().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setBrands(data);
                setValues({...values,formData: new FormData()});
                
            }
        });
    };

   

    const initPc = () => {
        getPcs().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setPcs(data);
                setValues({...values,formData: new FormData()});
            }
        });
    };

    

    const initHair = () => {
        getHairs().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setHairs(data);
                setValues({...values,formData: new FormData()});
            }
        });
    };

    useEffect(() => {
        init();
    },[])


   
    const handleChange = item => event => {
        const value = item === 'photo' ? event.target.files : event.target.value;
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
                    ...values,name:'',
                    description:'',
                    photo:'',
                    price:'',
                    quantity:'',
                    intensity:'',
                    percentage:'',
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
                <label className='col-6 mb-3'>Chose Photo</label>
                    <input className=" btn btn-secondary col-6 mb-3" type='file' multiple name='photo' accept='image/*'/>
                
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
               <label className="col-6 mb-3">Brand</label>
               <select className="col-6 mb-3" onChange={handleChange('brand')}>
               <option>Select</option>
               {brands && brands.map((b,i) => (
                   <option key={i} value={b._id}>{b.name}</option>
               ))}
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Lip Care</label>
               <select className="col-6 mb-3" onChange={handleChange('category')}>
               <option>Select</option>
               {categories && categories.map((c,i) => (
                   <option key={i} value={c._id}>{c.name}</option>
               ))}
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3" >Lip Care Intensity</label>
               <select className="col-6 mb-3"  onChange={handleChange('intensity')}>
                   <option>Choose</option>
                   <option value='normal'>normal</option>
                   <option value='modified'>modified</option>
                   <option value='intensely modified'>intensely modified</option>
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3" >Intensity percentage</label>
               <select className="col-6 mb-3"  onChange={handleChange('percentage')}>
                   <option>Choose</option>
                   <option value='30%'>30%</option>
                   <option value='50%'>50%</option>
                   <option value='75%'>75%</option>
               </select>
           </div>
           
           <div  className="row">
               <label className="col-6 mb-3">Personal Care</label>
               <select className="col-6 mb-3" onChange={handleChange('pc')}>
               <option>Select</option>
               {pcs && pcs.map((pc,i) => (
                   <option key={i} value={pc._id}>{pc.name}</option>
               ))}
               </select>
           </div>
           <div  className="row">
               <label className="col-6 mb-3">Hair</label>
               <select className="col-6 mb-3" onChange={handleChange('pc')}>
               <option>Select</option>
               {hairs && hairs.map((hair,i) => (
                   <option key={i} value={hair._id}>{hair.name}</option>
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