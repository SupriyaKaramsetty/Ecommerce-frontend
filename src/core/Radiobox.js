import React, {useState} from 'react';


const Radiobox = ({prices,handleFilters}) => {

    const [value,setValue] = useState(0);

    const handleChange = event => {
            handleFilters(event.target.value);
            setValue(event.target.value);
    };

    return prices.map((p,i) => (
     <div key={i} >
         <input
            onChange={handleChange}
            value={`${p.id}`}
            type='radio'
            name={p}
            className="mr-3 ml-3" 
            />
        <label form-check-label>{p.name}</label>
     </div>
 )
 );  
};

export default Radiobox;