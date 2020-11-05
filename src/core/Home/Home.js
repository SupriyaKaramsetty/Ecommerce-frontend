import React, {Fragment, useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.css';
import {getProducts} from '../apiCore';
import Card from '../Card';
import Search from '../Search/Search';
import about from '../../assets/organicbg.jpg';
// import ImageApp from '../ImageSearch/ImageApp';
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
        <section>
            <div className={styles.flexcontainer}>
                
                    
                        <div className={styles.flexitemleft}>
                            <div>
                                <p styles={{textAlign:'center'}}>
                                Choose products that SUPPORT your wellness and help you feel gorgeous
                                </p>
                            </div>
                        </div>
                        <div className={styles.flexitemcenter}>
                            
                            <div>
                                <p styles={{textAlign:'center'}}>
                           
                                Never underrate your Skin, by using chemicals, rather have self-pride by applying organic beauty all-over
                                </p>
                            </div>
                        </div>
                        <div className={styles.flexitemright}>
                           
                            <div>
                                <p styles={{textAlign:'center'}}>
                                Live life more organically and more beautifully
                                </p>
                    
                        
                    </div>
                    
                </div>
            </div>
        </section>
        <section>
            <div className={styles.organic}>Why Organic ?</div>
        </section>
        <section className={styles.text1}>
        Think about all the products we are using every day that come in contact with our skin: makeup, fragrances, moisturizers, soaps, deodorants and so on. It is not only what we eat what matters, but also what we put on our skin! Everything we could ever need to stay healthy and happy nature has already created for us!<br></br><br></br>
 
        Just like you nourish your body with organic food, your skin deserves care with organic beauty products. Many non-organic beauty products on the market today include an astonishing amount of scary chemicals. From parabens (chemicals linked to cancer) to formaldehyde to petroleum waxes, an ordinary lotion can contain quite the toxic mixture. Certified-organic skincare products cleanse, tone, exfoliate and moisturize your
         skin without using any of these noxious artificial chemicals or additives. That’s not all, though.<br></br><br></br> 
         Your skin is the largest living, breathing organ on your body. Up to 60% of what you apply on your skin gets absorbed into your bloodstream, which then gets circulated around your whole body. But if you knew what toxins non-organic skincare products contained, you would think twice before you use it. So it’s no surprise to see more and more people switching to organic skincare products. 
 
        </section>
        <section className={styles.text}>
                 If you’re still using non-organic products, it’s time to reconsider. Read on to learn the benefits of organic skincare products to see how they can be better for you.
        </section>
        <section className={styles.timeline}>
            <div className={`${styles.left} ${styles.container}`}>
                <p className={styles.content}>
                <b>Organic skincare products are made of natural ingredients</b><br></br>
                Now read the ingredients label of any organic skin care product. You’d probably recognize most, if not all of the items there.
                 The organic ingredients are grown without the use of pesticides, herbicides, chemicals. With that, you can be sure your skin and body absorb only real, natural ingredients that aren’t harmful.

                </p>
            </div>
            <div className={`${styles.right} ${styles.container}`}>
                <p className={styles.content}><b>Organic products are non-allergenic</b><br></br>
                Without harsh chemicals, organic skincare products are less likely to cause allergic reactions, inflammations or irritations. If an allergic reaction does occur with the use of organic products, it would most likely be due to a natural ingredient (such as peanuts or strawberries), which would be easier to identify.
                </p>
            </div><br></br>
            <div className={`${styles.left} ${styles.container}`}>
                <p className={styles.content}>
                <b>Organic skincare products work better</b><br></br>

                Up to 95% of an organic skincare product’s contents are active ingredients. In synthetic skincare products, on the other hand, active ingredients only make up 5 to 10% of its contents.

                </p>
            </div><br></br>
            <div className={`${styles.right} ${styles.container}`}>
                <p className={styles.content}>
                <b>Going organic is better for your skin</b><br></br>
                The synthetic ingredients found in non-organic products may be fast-acting, but they are also invasive, causing harm that cannot be seen. 

                </p>
            </div><br></br>
            <div className={`${styles.left} ${styles.container}`}>
                <p className={styles.content}>
                <b>You’re helping to preserve the environment</b><br></br>
                Because organic products use naturally grown ingredients that are free from toxic pesticides and fertilizers, they don’t leave a harmful footprint on the planet, particularly the soil, water, and air. 
                
                </p>
            </div><br></br>
            
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