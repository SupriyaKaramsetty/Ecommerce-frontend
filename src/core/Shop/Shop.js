import React, {useState,useEffect} from 'react';
import Card from '../Card';
import { getCategories, getBrands , getPcs , getHairs , getFilteredProducts} from '../apiCore';
import Checkbox from '../Checkbox';
import {prices} from '../fixedPrices';
import Radiobox from '../Radiobox';
import styles from './Shop.css';

const Shop = () => {
    
    const [myFilters,setMyFilters] = useState({
        filters:{
            category:[],
            brand:[],
            pc:[],
            price:[]
        } 
    });
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [pcs, setPcs] = useState([]);
    const [hairs, setHairs] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error);
            }else {
                setCategories(data);
            }
        });
        getBrands().then(data => {
            if(data.error){
                setError(data.error);
            }else {
                setBrands(data);
            }
        });
        getPcs().then(data => {
            console.log(data);
            if(data.error){
                setError(data.error);
            }else {
                setPcs(data);
            }
        });

        getHairs().then(data => {
            console.log(data);
            if(data.error){
                setError(data.error);
            }else {
                setHairs(data);
            }
        });


    };

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip,limit,newFilters)
        .then(data => {
            if(data.error) {
                setError(data.error);
            }
            else{
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });

    };

    const loadMore = () => {

        let toSkip = skip + limit;
        getFilteredProducts(toSkip,limit,myFilters.filters)
        .then(data => {
            if(data.error) {
                setError(data.error);
            }
            else{
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(0);
            }
        });

    };

    const loadMoreButton = () => {
        return (
             size > 0 && size>= limit && (
                <button className="btn btn-warning mb-5" onClick={loadMore}>Load More</button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip,limit,myFilters.filters);
    },[])

    const handleFilters = (filters,filterBy) => {
            const newFilters = {...myFilters};
            newFilters.filters[filterBy] = filters;

            if(filterBy == "price"){
                let priceValues = handlePrice(filters);
                newFilters.filters[filterBy] = priceValues;
            }

            loadFilteredResults(myFilters.filters);

            setMyFilters(newFilters);
    };


    const handlePrice = value => {
        const data = prices;
        let array = [];

        for(let key in data) {
            if(data[key].id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };


   
    return (

        <div className="row">
            <div className="col-3">
                <span className={styles.category}>FILTER BY CATEGORY</span><br></br><hr />
               
                <div className={styles.categories}>BRAND</div>
                <ul>
                        <Checkbox list={brands} handleFilters={ filters => handleFilters(filters,'brand')}/>
                </ul>
                <div className={styles.categories}>LIP CARE</div>
                <ul>
                        <Checkbox list={categories} handleFilters={ filters => handleFilters(filters,'category')}/>
                </ul>
                <div className={styles.categories}>PERSONAL CARE</div>
                <ul>
                        <Checkbox list={pcs} handleFilters={ filters => handleFilters(filters,'pc')}/>
                </ul>
                <div className={styles.categories}>HAIR</div>
                <ul>
                        <Checkbox list={hairs} handleFilters={ filters => handleFilters(filters,'hair')}/>
                </ul>
                 <div className={styles.categories}>PRICE</div>
                <div>
                        <Radiobox list={prices} handleFilters={ filters => handleFilters(filters,'price')}/>
                </div> 
            </div>
              <div className="col-9">
              <h2 className={styles.products}>Products</h2><hr />
                  <div className="row">
                        
                         {filteredResults.map((product,i) => (
                        <div key={i} className="col-4 mb-4" >
                        <Card  product={product} /></div>
                        
                  
              


                ))}
                </div>
                {loadMoreButton()}
            </div>
        </div>


    );
};

export default Shop;