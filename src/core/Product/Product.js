import React, { useState, useEffect ,Fragment} from 'react';
import Layout from '../Layout/Layout';
import { read, listRelated} from '../apiCore';
import Card from '../Card';
import {isAuthenticated} from '../../auth/index';
import AddComment from '../../user/AddComment/AddComment';
import Comment from '../../user/Comment';
import {Link} from 'react-router-dom';
import styles from './Product.css';




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

    const updateProduct = product => {
        setProduct(product);
      };

  const categoryDisp = product => {
      return (
          product.category && product.category.name === "lip balms" && (
              <Fragment>
                <div className="progress">
                    <div className="progress-bar" style={{width:product.percentage}} > {product && product.intensity}</div>
                </div>
                <div className="mt-5">
                    <h4 className="ml-4">Organoleptic characteristics</h4>
                    <p>
                    It refers to the smoothness during application, adherence and are categorized into 3, by experts:<br></br>
                    <b>Normal(N)</b>- Just natural as the original product<br></br>
                    <b>Modified(M)</b>- Had to go through minimal sittings, in bringing up this final one, with minimal adherence.<br></br>
                    <b>Intensely Modified(IM)</b>-  Had to go through rigorous sittings and is Completely updated for better adherence.<br></br>
                    </p>
                </div>
              </Fragment>
            
          )
    );
  };


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
                  <div className="row mt-5">
                        <div className="col-2">
                            
                        </div>
                      
                        <div className="col-8"> 
                        {categoryDisp(product)}
                        </div>
                        
                  </div>  
                  <div className="row mt-5 ml-5">
                    <div className="col-5">
                        <h3 style={{marginLeft:'-150px'}}>Product Reviews</h3>
                        <div className="mt-5">
                        <h4>Comments: </h4><br></br>
                            
                        {product.comments && 
                             product.comments.map(c => 
                            <Comment 
                                user = {user}
                                key={c._id}
                                comment={c}
                                productId={product._id}
                                updateParent={updateProduct()}
                            />)
                            
                        }
                        </div>
                    </div>
                    </div>
                  <div className="row mt-5">
                     <div className="col-6">
                        <div>
                            {user
                             ? <AddComment productId={product._id}  />
                             : <p>Please <Link to='/signin'>sign in</Link> to comment.</p>
                            }
                        </div>
                    </div>                  
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
