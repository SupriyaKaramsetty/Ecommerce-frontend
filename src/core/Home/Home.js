import React, {Fragment, useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.css';
import {getProducts} from '../apiCore';
import Card from '../Card';
import Search from '../Search/Search';
const Home = () => {

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

    return(
        <Fragment >
        <Search />
        
        
        <section className={styles.background}>
            <div className={styles.firstsec}>Never too old <br></br>for a Makeover
            </div>
            <Link className={styles.homebtn} to="/shop">Shop Now</Link>
        </section>

        <div className="container-fluid">

            {/* <div className={`${styles.jumbotron} container-fluid`}></div> */}
            <h2 className={styles.bs}>Best Sellers</h2><hr />
                 <div className="row">
                {productsBySell.map((product,i) => (
                     <div key={i} className="col-3 mb-3">
                     <Card  product={product} />
                    </div>
                     ))}
                </div>
            <h2 className={styles.na}>New Arrivals</h2><hr />
             <div className="row">  
                 {productsByArrival.map((product,i) => (
                     <div key={i} className="col-3 mb-3">
                     <Card key={i} product={product} />
                     </div>
                     ))}
                </div>
        </div>
        </Fragment>
    );
};


export default Home;