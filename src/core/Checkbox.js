import React, {useState,useEffect} from 'react';


const Checkbox = ({list, handleFilters}) => {

    const [checked,setChecked] = useState([]);


    const handleToggle = c => () => {
            //return 1st index or -1  also to check if category is present or not
        const currentCategoryId = checked.indexOf(c);
        
        //stores the categories that are in checked state
        const newCheckedCategoryId = [...checked];
        //if currently checked was not already pushed to checked state,then push
        //else pull/take off

        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c);
        }
        else {
            newCheckedCategoryId.splice(currentCategoryId,1);
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);

    }


    return(
        list.map ((c,i) => (
            <li key={i} className="list-unstyled">
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id) !== -1} type="checkbox" className="form-check-input" />
                <label className="form-check-label">{c.name}</label>
            </li>
        )
        )

        
    );
 };
    
        


export default Checkbox;