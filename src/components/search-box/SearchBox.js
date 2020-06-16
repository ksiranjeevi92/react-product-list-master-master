import React, {useState,useEffect} from 'react';

//styel sheet
import './SearchBox.css';
import searchBtn from '../../assets/search-outline.svg';
import clearBtn from '../../assets/close-outline.svg';

const SearchBox = (props) => {
    //hooks
    const [search, setSearch] = useState('');
    const [showClear,toggleShowClear] = useState(false);
    const [results,setResults] = useState([]);

    useEffect(() => {
        debounce(onSearch(),600)
    },[search]);

    //functions
    const inputHandler = (e) => {
        let value = e.target.value; 
        setSearch(value);
        if(value.length > 0){
            toggleShowClear(true);
        }else {
            toggleShowClear(false);
        }
    }

    const reset = () => {
        setSearch('');
        toggleShowClear(false);
    }

    const debounce = (func, delay) => { 
        let debounceTimer 
        return function() { 
            const context = this
            const args = arguments 
                clearTimeout(debounceTimer) 
                    debounceTimer 
                = setTimeout(() => func.apply(context, args), delay) 
        } 
    } 

    const onSearch = async() => {
        //http request goes here
        try{
            const res = await fetch('https://jsonplaceholder.typicode.com/users');
            setResults(res.data);
        }catch(err){
            throw new Error(err);
        }
    }

    return (
     <React.Fragment>
        <div className="searchBox">
          <span className="searchBtn">
            <img src={searchBtn} alt="search"/>
          </span>
          <input value={search} onChange={inputHandler} className="searchTxt" type="text" placeholder="search"/>
         {showClear ? <span onClick={reset} className="clearBtn">
             <img src={clearBtn} alt="clear"/>
          </span> : null
        }
        </div>
      </React.Fragment>
    )
}

export default React.memo(SearchBox);