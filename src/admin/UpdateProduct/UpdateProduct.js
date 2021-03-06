import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { getProduct, getCategories, getBrands, getHairs,getPcs, updateProduct } from '../apiAdmin';

const UpdateProduct = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        brands: [],
        hairs:[],
        pcs:[],
        category: '',
        brand: '',
        hair:'',
        pc: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [hairs, setHairs] = useState([]);
    const [pcs, setPcs] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        category,
        brand,
        hair,
        pc,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    // pc:data.pc._id,
                    // hair:data.hair._id,
                    // category: data.category._id,
                    // brand:data.brand._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
                initBrand();
                initPc();
                initHair();

                
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initBrand = () => {
        getBrands().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setBrands(data);
            }
        });
    };

    

    const initPc = () => {
        getPcs().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setPcs(data);
            }
        });
    };

   

    const initHair = () => {
        getHairs().then(data => {
            if(data.error){
                setValues({...values,error: data.error});
            }else {
                setHairs(data);
            }
        });
    };

    

    useEffect(() => {
        init(match.params.productId);
    }, []);



    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    intensity:'',
                    percentage:'',
                    loading: false,
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Update Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Lip Care</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                        categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div  className="form-group">
               <label className="text-muted" >Lip Care Intensity</label>
               <select className="text-muted"  onChange={handleChange('intensity')} className="form-control">
                   <option>Choose</option>
                   <option value='normal'>normal</option>
                   <option value='modified'>modified</option>
                   <option value='intensely modified'>intensely modified</option>
               </select>
           </div>
           <div  className="form-group">
               <label className="text-muted" >Intensity percentage</label>
               <select className="text-muted"  onChange={handleChange('percentage')} className="form-control">
                   <option>Choose</option>
                   <option value='30%'>30%</option>
                   <option value='50%'>50%</option>
                   <option value='75%'>75%</option>
               </select>
           </div>
            <div className="form-group">
                <label className="text-muted">Hair</label>
                <select onChange={handleChange('hair')} className="form-control">
                    <option>Please select</option>
                    {hairs &&
                        hairs.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Personal Care</label>
                <select onChange={handleChange('pc')} className="form-control">
                    <option>Please select</option>
                    {pcs &&
                        pcs.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Brand</label>
                <select onChange={handleChange('brand')} className="form-control">
                    <option>Please select</option>
                    {brands &&
                        brands.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                        ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    };

    return (
        
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        
    );
};

export default UpdateProduct;
