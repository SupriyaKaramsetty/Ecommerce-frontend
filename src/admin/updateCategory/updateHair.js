import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/index';
import { Link, Redirect } from 'react-router-dom';
import { getHair, updateHair } from '../apiAdmin';

const UpdateHair = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        error: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const { name, error, redirectToProfile } = values;

    const init = hairId => {
        getHair(hairId, token).then(data => {
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
        init(match.params.hairId);
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const submitHairForm = e => {
        e.preventDefault();
        // update with ? you should send hair name otherwise what to update?
        const hair = {
            name: name
        };
        updateHair(match.params.hairId, user._id, token, hair).then(data => {
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

    const updateHairForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="mb-5" onSubmit={submitHairForm}>
                <span className="login100-form-title p-b-32 m-b-7">Update Hair Form</span>
                <span className="txt1 p-b-11">Hair Name</span>
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
                return <Redirect to="/admin/hairs" />;
            }
        }
    };

    const goBackBTN = () => {
        return (
            <div className="mt-5">
                <Link to="/admin/hairs" className="text-info">
                    Back To Admin Home
                </Link>
            </div>
        );
    };

    return (
        
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showError()}
                    {updateHairForm()}
                    {goBackBTN()}
                    {redirectUser()}
                </div>
            </div>
        
    );
};

export default UpdateHair;
