import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { getBrand, updateBrand } from '../apiAdmin';

const UpdateBrand = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = brandId => {
        getBrand(brandId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name
                });
            }
        });
    };

    useEffect(() => {
        init(match.params.brandId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitCategoryForm = e => {
        e.preventDefault();
        // update with ? you should send brand name otherwise what to update?
        const brand = {
            name: name
        };
        updateCategory(match.params.brandId, user._id, token, brand).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    error: false,
                    redirectToProfile: true
                });
            }
        });
    };

    const updateBrandForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="mb-5" onSubmit={submitBrandForm}>
                <span className="login100-form-title p-b-32 m-b-7">Update Brand Form</span>
                <span className="txt1 p-b-11">Brand Name</span>
                <br />
                <br />
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        className="input100"
                        type="text"
                        required
                        name="name"
                    />
                </div>
                <div className="w-size25">
                    <button type="submit" className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className={'alert alert-danger'} role="alert" style={{ display: error ? '' : 'none' }}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            {error}
        </div>
    );

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/admin/brands" />;
            }
        }
    };

    const goBackBTN = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/brands" className="text-info">
                    Back To Admin Home
                </Link>
            </div>
        );
    };

    return (
        
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showError()}
                    {updateBrandForm()}
                    {goBackBTN()}
                    {redirectUser()}
                </div>
            </div>
        
    );
};

export default UpdateBrand;
