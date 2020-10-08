import React, {useState,useEffect} from 'react';
import Card from './Card';
import { getCategories,getFilteredProducts} from './apiCore';
import Checkbox from './Checkbox';
import {prices} from './fixedPrices';
import Radiobox from './Radiobox';

const Shop = () => {
    
    const [myFilters,setMyFilters] = useState({
        filters:{
            category:[],
            price:[]
        } 
    });
    const [categories, setCategories] = useState([]);
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
                <span>FILTER BY</span>
                <div>CATEGORY</div>
                <ul>
                        <Checkbox categories={categories} handleFilters={ filters => handleFilters(filters,'category')}/>
                </ul>
                 <div>PRICE</div>
                <div>
                        <Radiobox prices={prices} handleFilters={ filters => handleFilters(filters,'price')}/>
                </div> 
            </div>
              <div className="col-9">
              <h2 className="mb-4">Products</h2><br></br>
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