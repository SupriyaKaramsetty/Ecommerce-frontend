import React, {useState,useEffect} from 'react';
import {getProducts} from '../apiCore';
import Card from '../Card';
//import styles from '../Card.css';
const Products = () => {

    const [productsBySell,setProductsBySell] = useState([]);
    const [productsByArrival,setProductsByArrival] = useState([]);
    const [error,setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error){
                setError(data.error)
            }
            else{
                setProductsByArrival(data);
            }
        });
    };
    //useEffect works when the components loads for the first time or if there is any state changes
    //want these methods to run when the component mounts

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();

    },[])
   return (
       <div className="container-fluid">

          {/* <div className={`${styles.jumbotron} container-fluid`}></div> */}
              <h2 className="mb-4">Best Sellers</h2>
                <div className="row">
               {productsBySell.map((product,i) => (
                  <Card key={i} product={product} />
               ))}
           </div>
              <h2 className="mb-4">New Arrivals</h2>
               <div className="row">
               {productsByArrival.map((product,i) => (
                  <Card key={i} product={product} />
               ))}
           </div>
        </div>
   
   );
};

export default Products;