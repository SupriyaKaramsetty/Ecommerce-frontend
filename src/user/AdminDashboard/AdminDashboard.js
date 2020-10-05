import React from 'react';
import Layout from '../../core/Layout/Layout';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import styles from './AdminDashboard.css';

const AdminDashboard = () => {

    const {user: {name,email,role}} = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
               <h3 className={styles.headers}>Admin Links</h3>
               <div className={styles.wrappers}>
                 <ul>
                    <li ><Link className={styles.createlinks} style={{marginTop:"100px"}} to='/create/category'>Create Category</Link></li>
                    <hr style={{width:"650px",marginRight:"170px",backgroundColor: "black"}} />
                     <li ><Link className={styles.createlinks} to='/create/product'>Create Product</Link></li>
                     
                 </ul>
               </div>
              
            </div> 
        );
    };

    const adminInfo = () => {
        return (
            <div>
               <h3 className={styles.headers}>Admin information</h3>
               <div className={styles.wrappers}>
                    <ul>
                        <li className={styles.admininfo}>{name}</li><hr style={{width:"650px",marginRight:"170px",backgroundColor: "black"}} />
                        <li className={styles.admininfo}>{email}</li><hr style={{width:"650px",marginRight:"170px",backgroundColor: "black"}} />
                        <li className={styles.admininfo} >{role === 1 ? 'Admin' : 'Registered User'}</li>
                    </ul>
               </div>
                 
            </div> 
        );
    };


    return (

 
<div>
        {adminLinks()}
        {adminInfo()}

</div> 
    

);
};

export default AdminDashboard;