
import React, { createContext, useEffect, useState } from 'react';
export const SearchContext = createContext();
export const SearchContextProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState(null);
    const searchContextValue = {
        
    };

    return (
        <SearchContext.Provider value={searchContextValue}>
            {children}
        </SearchContext.Provider>
    );
};