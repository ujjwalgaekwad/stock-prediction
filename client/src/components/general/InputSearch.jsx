import React, { useContext } from 'react';
// import { ComboStockContext } from './CombineStockContext';

// Debounce
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId); 
        timeoutId = setTimeout(() => {
            func(...args); 
        }, delay); 
    };
};

const SearchBar = () => {
    const { searchData, setUpdateSearchData } = useContext(ComboStockContext);

    return (
        <div>
            <input
                type="text"
                value={searchData}
                onChange={(e) => setUpdateSearchData(e.target.value)}
                placeholder="Search Stock"
            />
        </div>
    );
};

export default SearchBar;