import React , {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import CardImage from './CardImage';
import styles from './Card.css';
import moment from 'moment';
import {addItem, updateItem, removeItem} from './cartHelpers';


const Card = ({
    product, 
    showViewProductButton = true, 
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined}) => {
        
    const [redirect,setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
            <Link to={`/product/${product._id}`}>
            <button className={styles.viewproduct}>
                View Product
            </button>
            </Link> 
        )
        );
    };

    const addToCart = () => {
        addItem(product,
            setRedirect(false)
            
        );
    };

    
    const shouldRedirect = redirect => {
        if(redirect){
           return  <Redirect to="/cart" />
        }
    }

    const showAddButton = showAddToCartButton => {
        return (
            showAddToCartButton && (
            <Link>
                <button className={styles.addtocart} onClick={addToCart}   >
                      Add to Cart
                </button>
              </Link>
            
            )
        );
    };
    const showStock = quantity => {
        return quantity > 0 ? (
          <span className="badge badge-success badge-pill">In Stock </span>
        ) : (
          <span className="badge badge-danger badge-pill">Out of Stock </span>
        );
      };

     const handleChange = productId => event => {
         setRun(!run); // run useEffect in parent Cart
         setCount(event.target.value < 1 ? 1 : event.target.value);
         if (event.target.value >= 1) {
           updateItem(productId, event.target.value);
         }
       };

    const showCartUpdateOptions = cartUpdate => {
        return (
          cartUpdate && (
            <div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
      };

      const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className={styles.removeproduct}
            >
              Remove Product
            </button>
          )
        );
      };
    return (

            <div className={styles.card}>
                <div className={`${styles.prod_name} card-header `}>{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <CardImage item={product} url="product"  />
                    <p className={styles.desc}>{product.description.substring(0, 50)}..... </p>
                    <p className={styles.price}>Rs. {product.price}</p>
                    {/* <p className="black-10">Category: {product.category && product.category.name}</p>
                    <p className="black-9">Added {moment(product.createdAt).fromNow()}</p> */}
                     {showStock(product.quantity)}
                     <br />
                     <br />
 
  
                     
                       {showViewButton(showViewProductButton)}
                       {showAddButton(showAddToCartButton)}
                       {showRemoveButton(showRemoveProductButton)}
                       </div>
                       <div>
                       {showCartUpdateOptions(cartUpdate)}
                       </div>
                       
                   
                
            </div>

    );
};

export default Card;