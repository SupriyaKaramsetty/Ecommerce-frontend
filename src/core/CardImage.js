import React from 'react';
import {API} from '../config';
import styles from './Card.css';

const CardImage = (props) => (
    <div className={styles.productimg}>
        <img src={`${API}/${props.url}/photo/${props.item._id}`}
        alt={props.item.name}
        className="mb-3"
        style={{maxHeight: "100%" , maxWidth: "100%"}}
        />


    </div>
);

export default CardImage;