import React from 'react';
import Layout from '../core/Layout/Layout';
import {isAuthenticated} from '../auth/index';
import {Link} from 'react-router-dom';

const Dashboard = () => {

    const {user: {name,email,role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div>
               <h3>User Links</h3>
                 <ul>
                    <li><Link to='/'>My Cart</Link></li>
                     <li><Link to='/'>Update Profile</Link></li>
                     
                 </ul>
            </div> 
        );
    };

    const userInfo = () => {
        return (
            <div>
               <h3>User information</h3>
                 <ul>
                    <li>{name}</li>
                     <li>{email}</li>
                     <li>{role === 1 ? 'Admin' : 'Registered User'}</li>
                 </ul>
            </div> 
        );
    };

    const purchaseHistory = () => {
        return (
            <div>
               <h3>Purchase history</h3>
                 <ul>
                    
                     <li>history</li>
                 </ul>
            </div> 
        );
    };

    return (
        <Layout title="User dashboard" description="Make changes if u want">
 
        <div>
            {userLinks()}
            {userInfo()}
            {purchaseHistory()}
        </div> 
    
</Layout> 
);
};

export default Dashboard;