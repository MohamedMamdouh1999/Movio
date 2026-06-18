import { useMemo, useState } from "react";

import { SearchContext } from "../context/Search";

import Header from "../components/home/Header";
import TrendingMovies from "../components/home/TrendingMovies";
import PopularMovies from "../components/home/PopularMovies";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const contextValue = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm]);

    return (
        <SearchContext.Provider value={contextValue}>
            <Header />
            {!searchTerm.trim() && <TrendingMovies />}
            <PopularMovies />
        </SearchContext.Provider>
    )
}

export default Home;