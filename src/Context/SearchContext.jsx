import { createContext, useState, useEffect } from "react";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
    const storedSearch = JSON.parse(localStorage.getItem('search'));

    const [search, setSearch] = useState(
        storedSearch || {
            vehicleType: '',
            location: '',
            pickupDate: '',
            dropoffDate: '',
        }
    );

    useEffect(() => {
        if (search.vehicleType || search.location || search.pickupDate || search.dropoffDate) {
            localStorage.setItem('search', JSON.stringify(search));
        }
    }, [search]);

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchProvider };
