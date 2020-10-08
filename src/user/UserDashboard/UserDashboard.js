import React, { useState, useEffect } from "react";
import Layout from '../../core/Layout/Layout';
import {isAuthenticated} from '../../auth/index';
import {Link} from 'react-router-dom';
import {getPurchaseHistory} from '../apiUser';
import moment from "moment";
import styles from './UserDashboard.css';

const Dashboard = () => {
    const [history, setHistory] = useState([])

    const {user: {_id,name,email,role}} = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div>
               <h3 className={styles.headers}>User Links</h3>
               <div  className={styles.wrappers}>
                 <ul>
                    <li><Link className={styles.createlinks}  to='/cart'>My Cart</Link></li>
                    <hr style={{width:"600px",marginRight:"100px"}} />
                     <li><Link className={styles.createlinks} to={`/profile/${_id}`}>Update Profile</Link></li>
                     
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
                            <li className={styles.userinfo}>
                            {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                            </li>
                     </ul>
               </div>
            </div> 
        );
    };

    return (

 
        <div>
            {userLinks()}
            {userInfo()}
            {purchaseHistory(history)}
        </div> 
    

);
};

export default Dashboard;