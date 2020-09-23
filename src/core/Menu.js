import React from 'react';
import {Link , withRouter} from 'react-router-dom';


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
            <li>
                     <Link className="nav-link"to='/signup' style={isActive(props.history,'/signup')}>Signup</Link>
            </li>
            <li>
                     <Link className="nav-link" to='/signin' style={isActive(props.history,'/signin')}>Signin</Link>
            </li>
        </ul>
    </div>
    
);
    

export default withRouter(Menu);
