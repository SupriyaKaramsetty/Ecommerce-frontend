import React, {Component}  from 'react';
//import classes from './Layout.css';

class Layout extends Component {
    styles = {
        header : {
            width: "100%",
            backgroundColor: "aqua",
            color:"white"
        }
    }
        
  
    render() {
        return(
        
            <div>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                    
            </div>
        );
    }
    
};

export default Layout;