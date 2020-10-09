import React from 'react';
import {API} from '../config';
import styles from './Card.css';

const CardImage = ({item}) => (
    <div className={styles.productimg}>
        <img src={`${API}/product/photo/${item._id}`}
        alt={item.name}
        className="mb-3"
        style={{height: "75%" , width: "75%"}}
        />


    </div>
);

export default CardImage;