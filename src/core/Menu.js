import React, {Fragment} from 'react';
import {Link , withRouter} from 'react-router-dom';
import {signout , isAuthenticated} from '../auth/index';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { color:"#ff9900"};
     }
     else{
        return {color:"#ffffff"};
     } 
};
const Menu = (props) => (
    <div>
        <ul className="nav nav-tabs bg-primary" >
            <li className="nav-item">
                     <Link className="nav-link" to='/' style={isActive(props.history,'/')}>Home</Link>
            </li>
           {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link className="nav-link" to='/user/dashboard' style={isActive(props.history,'/user/dashboard')}>Dashboard</Link>
                </li>
           )}
           {isAuthenticated() && isAuthenticated().user.role === 1 && (     
                <li className="nav-item">
                     <Link className="nav-link" to='/admin/dashboard' style={isActive(props.history,'/admin/dashboard')}>Dashboard</Link>
                </li>
           )}
           
            
            
            

            {!isAuthenticated()  && (
                <Fragment>
                    <li>
                        <Link className="nav-link"to='/signup' style={isActive(props.history,'/signup')}>Signup</Link>
                    </li>
                    <li>
                         <Link className="nav-link" to='/signin' style={isActive(props.history,'/signin')}>Signin</Link>
                    </li>
                </Fragment>
            
            )}

            
           {isAuthenticated() && (
            <li>
                     <span className="nav-link"  style={{cursor:'pointer',color:'#ffffff'}} onClick={ ()=> { signout(() => {
                         props.history.push('/');
                     })
                    }
                }>Signout</span>

            </li>
           )}
            
        </ul>
    </div>
    
);
    

export default withRouter(Menu);
