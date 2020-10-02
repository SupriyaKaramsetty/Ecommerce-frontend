import React from 'react';
import Layout from '../core/Layout/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';

const AdminDashboard = () => {

    const {user: {name,email,role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
               <h3>Admin Links</h3>
                 <ul>
                    <li><Link to='/create/category'>Create Category</Link></li>
                     <li><Link to='/create/product'>Create Product</Link></li>
                     
                 </ul>
            </div> 
        );
    };

    const adminInfo = () => {
        return (
            <div>
               <h3>Admin information</h3>
                 <ul>
                    <li>{name}</li>
                     <li>{email}</li>
                     <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                 </ul>
            </div> 
        );
    };


    return (
<Layout title="Admin dashboard" description="Make changes if u want">
 
<div>
        {adminLinks()}
        {adminInfo()}

</div> 
    
</Layout> 
);
};

export default AdminDashboard;