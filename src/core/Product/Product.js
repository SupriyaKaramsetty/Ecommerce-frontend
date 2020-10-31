import React, { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';
import { read, listRelated} from '../apiCore';
import Card from '../Card';

import {Link} from 'react-router-dom';
import styles from './Product.css';

import {isAuthenticated} from '../../auth/index';


const Product = props => {
    const [product, setProduct] = useState({});
 
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [success,setSuccess] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                 listRelated(data._id).then(data => {
                     if (data.error) {
                         console.log(data.error);
                     } else {
                         setRelatedProduct(data);
                     }
                 });
            }
        });
    };

    const {user,token} = isAuthenticated();
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);


  


    return (
         <Layout
             title={product && product.name}
             description={product && product.description && product.description.substring(0, 500)}
             className="container-fluid"
         >
            <div className="row">
                <div className="col-8">
                  <div className="row">
                    <div className="col-12">
                       </div>
                          {product && product.description && <Card product={product} showViewProductButton={false} />}
                    </div><br></br>
                  <div className="row">
                    <div className="col-6">
                        <h3 style={{marginLeft:'-150px'}}>Product Reviews</h3>
                    </div>
                    {/* <div className="col-6">
                        <div className="mt-5">
                         {isAuthenticated()
                     ? <AddComment postId={product._id} updateParent={this.updatePost} />
                        : <p>Please <Link to={{pathname: '/signin', state: {prevPath: redirectPath}}}>sign in</Link> to comment.</p>
                                    }
                        </div>
                        <div className="mt-5">
                            <h4>Comments:</h4>
                                {product.comments.length > 0 
                                    ? product.comments.map(c =>    
                                <Comment 
                                            loggedInUser={loggedInUser}
                                            key={c._id}
                                            comment={c}
                                            productId={product._id}
                                            updateParent={this.updatePost}
                                     />)
                                    : null
                                }
                        </div>
               
          
                    
                    </div> */}
                    
                  </div>
                  
                    
                  </div>
                 <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className={` ${styles.viewprodsize} mb-3`} key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div> 
            </div>
            
            
         </Layout>
    );
};

export default Product;
