import React, {Fragment} from 'react';
import {Link , withRouter} from 'react-router-dom';
import {signout , isAuthenticated} from '../../auth/index';
import styles from './Menu.css';
import {itemTotal} from '../cartHelpers';
import Cart from '../Cart/Cart';



const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color:"#ff9a9c"};
     }
     else{
        return {color:"#ffffff"};
     } 
};

        
const Menu = (props) => (

  <nav className={`${styles.navbar} navbar navbar-expand-lg`}>
     <div className="container">
     {/* <a className="navbar-brand text-white">
        <img alt="logo" src={require('../../assets/logo.jpg')} /> </a>
    */}
    <a className={`navbar-brand text-white ${styles.logofont}`}>PerfectU</a>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".nvbCollapse" aria-controls="nvbCollapse">
               <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" className="nvbCollapse">
           <ul className="navbar-nav ml-auto p-3" >
           
			
		    
            <li className="nav-item pl-4">
                     <Link className="nav-link" to='/' style={isActive(props.history,'/')}>Home</Link>
            </li>
            
            {/* <li className="nav-item pl-4">
                     <Link className="nav-link" to='/productsList' style={isActive(props.history,'/productsList')}>Products</Link>
            </li> */}
            <li className="nav-item pl-4">
                     <Link className="nav-link" to='/shop' style={isActive(props.history,'/shop')}>Shop</Link>
            </li>
            <li className="nav-item pl-4">
                     <Link className="nav-link" to='/cart' style={isActive(props.history,'/cart')}>Cart {Cart}<sup><small className={styles.cartbadge}>{itemTotal()}</small></sup></Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item pl-4">
                <Link className="nav-link" to='/user/dashboard' style={isActive(props.history,'/user/dashboard')}> Dashboard</Link>
                </li>
           )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (     
                <li className="nav-item pl-4">
                     <Link className="nav-link" to='/admin/dashboard' style={isActive(props.history,'/admin/dashboard')}>{isAuthenticated().user.name}'s Dashboard</Link>
                </li>
           ) }
          
           
 
            {!isAuthenticated()  && (
                <Fragment>
                    <li className="nav-item pl-4 ">
                        <Link className="nav-link" to='/signup' style={isActive(props.history,'/signup')}>Signup</Link>
                    </li>
                    <li className="nav-item pl-4 ">
                         <Link className="nav-link" to='/signin' style={isActive(props.history,'/signin')}>Login</Link>
                    </li>
                </Fragment>
            
            )}
           {isAuthenticated() && (
            <li className="nav-item pl-4 ">
                     <span  className="nav-link" style={{cursor:'pointer',color:'#ffffff'}} onClick={ ()=> { signout(() => {
                         props.history.push('/');
                     })
                    }
                }>Signout</span>

            </li>
           )}
            
           </ul>
        </div>  
     </div>
  </nav>

   






 
    
);
    

export default withRouter(Menu);
