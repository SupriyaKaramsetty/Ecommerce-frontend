import React from 'react';
import {Link} from 'react-router-dom';
import CardImage from './CardImage';
import styles from './Card.css';


const Card = (props) => {
    return (
        <div className="col-4 mb-3">
            <div className="card">
                <div className="card-header">{props.product.name}</div>
                <div className="card-body">
                    
                    <CardImage item={props.product} url="product"/>
                    <p>{props.product.description.substring(0,50)}.....</p>
                    <p>Rs.{props.product.price}</p>
                     <Link to="/">
                        <button className={` ${styles.text} btn btn-outline-info`}>View Product
                        </button>
                    </Link> 
                    <button  className={` ${styles.text} btn btn-outline-warning`} >
                            Add to Cart
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Card;