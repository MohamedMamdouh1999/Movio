import { useContext } from "react";

import { SearchContext } from "../context/Search";

const Search = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);

    return (
        <div className="search">
            <div>
                <img loading="lazy" src="/search.svg" alt="Movio" />
                <input type="text" placeholder="Search through 300+ movies online" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
        </div>
    )
}

export default Search