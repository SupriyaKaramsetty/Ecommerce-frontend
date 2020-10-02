import React from 'react';
import styles from './Layout.css';

const Layout = ({title="Title",description = "Description", className,children}) => (

            <div>
                <div className="jumbotron">
                        <h1 className={styles.head}>{title}</h1>
                        <p className="lead">{description}</p>
                </div>
                <div>{children}</div>
                    
            </div>
        );
  
export default Layout;