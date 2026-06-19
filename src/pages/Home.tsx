import { useMemo, useState } from "react";

import { SearchContext } from "../context/Search";

import Header from "../components/home/Header";
import TrendingMovies from "../components/home/TrendingMovies";
import Upcoming from "../components/home/UpcomingMovies";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const contextValue = useMemo(() => ({ searchTerm, setSearchTerm }), [searchTerm]);

    return (
        <SearchContext.Provider value={contextValue}>
            <Header />
            {!searchTerm.trim() && <TrendingMovies />}
            <Upcoming />
        </SearchContext.Provider>
    )
}

export default Home;