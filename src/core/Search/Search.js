import React, { useState, useEffect } from "react";
import { getCategories, getBrands,getHairs,getPcs, list } from "../apiCore";
import Card from "../Card";
import styles from './Search.css';

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        brands:[],
        pcs:[],
        hairs:[],
        category: '',
        brand:'',
        pc:'',
        hair:'',
        search: "",
        results: [],
        searched: false
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [hairs, setHairs] = useState([]);
    const [pcs, setPcs] = useState([]);

    const { category, brand, pc , hair, search, results, searched } = data;


    const init = () => {  
        loadCategories();
        loadBrands();
        loadPcs();
        loadHairs();

    };
    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        });

    };
    const loadBrands = () => {
        getBrands().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBrands(data);
            }
        });

    };
    const loadPcs = () => {
        getPcs().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setPcs(data);
            }
        });

    };
    const loadHairs = () => {
        getHairs().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHairs(data);
            }
        });

    };

    useEffect(() => {
        init();
    }, []);

    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category, brand: brand, pc: pc , hair: hair}).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
 
    };

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form className={styles.search} onSubmit={searchSubmit} action="" method="get">
				<input type="search" name="search_text" className={styles.search_text} onChange={handleChange("search")} placeholder="What are you looking for?"/>
				{/* <input type="button" name="search_button" className={styles.search_button} /> */}                   
                    <div className="row ">
                        <div className="col-3 ">
                        <select 
                            className={styles.options}
                            onChange={handleChange("brand")}
                        >
                            <option value="All">Brands</option>
                            {brands.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>   
                        </div>
                        <div className="col-3 ">
                        <select 
                            className={styles.options}
                            onChange={handleChange("category")}
                        >
                            <option value="All">Lip Care</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        </div>
                        
                       
                        <div className="col-3">
                        <select 
                            className={styles.options}
                            onChange={handleChange("pc")}
                        >
                            <option value="All">Personal Care</option>
                            {pcs.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select> 
                        </div>
                        <div className="col-3">
                        <select 
                            className={styles.options}
                            onChange={handleChange("hair")}
                        >
                            <option value="All">Hair Care</option>
                            {hairs.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select> 
                        </div>
                    </div>
                        
                        
                        
                       
                    <input type="submit" style={{ border: "none" }} className={styles.search_button} value="Search" />
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
