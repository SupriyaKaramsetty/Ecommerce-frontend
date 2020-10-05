import React from 'react';
import Layout from '../../core/Layout/Layout';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import styles from './UserDashboard.css';

const Dashboard = () => {

    const {user: {name,email,role}} = isAuthenticated();

    const userLinks = () => {
        return (
            <div>
               <h3 className={styles.headers}>User Links</h3>
               <div  className={styles.wrappers}>
                 <ul>
                    <li><Link className={styles.createlinks}  to='/'>My Cart</Link></li>
                    <hr style={{width:"600px",marginRight:"100px"}} />
                     <li><Link className={styles.createlinks} to='/'>Update Profile</Link></li>
                     
                 </ul>
               </div>

            </div> 
        );
    };

    const userInfo = () => {
        return (
            <div>
               <h3 className={styles.headers}>User information</h3>
               <div  className={styles.wrappers}>
                  <ul>
                    <li className={styles.userinfo}>{name}</li><hr style={{width:"600px",marginRight:"100px"}} />
                     <li className={styles.userinfo}>{email}</li><hr style={{width:"600px",marginRight:"100px"}} />
                     <li className={styles.userinfo}>{role === 1 ? 'Admin' : 'Registered User'}</li>
                  </ul>
               </div>
                 
            </div> 
        );
    };

    const purchaseHistory = () => {
        return (
            <div>
               <h3 className={styles.headers}>Purchase history</h3>
               <div  className={styles.wrappers}>
                    <ul>
                            <li className={styles.userinfo}>history</li>
                     </ul>
               </div>
            </div> 
        );
    };

    return (

 
        <div>
            {userLinks()}
            {userInfo()}
            {purchaseHistory()}
        </div> 
    

);
};

export default Dashboard;