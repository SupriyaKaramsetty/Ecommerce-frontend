import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.css';
const Home = () => {

    return(
        <Fragment>
        <section className={styles.background}>
            <div className={styles.firstsec}>Never too old <br></br>for a Makeover
            </div>
            <Link className={styles.homebtn} to="/shop">Shop Now</Link>
        </section>
        </Fragment>
    );
};


export default Home;