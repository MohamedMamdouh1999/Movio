import { useContext } from "react";

import { SearchContext } from "../../context/Search";

import useDebounceHook from "../../hooks/useDebounceHook";
import useFetch from "../../hooks/useFetch";

import type { IResponse } from "../../interfaces/response";
import type { IMovie } from "../../interfaces/movie";

import Spinner from "../shared/Spinner";
import MovieCard from "./MovieCard";

const PopularMovies = () => {
    const { searchTerm } = useContext(SearchContext);
    const debouncedSearchTerm = useDebounceHook(searchTerm, 500);
    const getEndpoint = (): string => {
        if (debouncedSearchTerm.trim()) return `search/movie?query=${encodeURIComponent(debouncedSearchTerm)}&include_adult=false&language=en-US&page=1`;
        return 'movie/popular?language=en-US&page=1';
    };

    const { data, isLoading, error } = useFetch<IResponse<IMovie[]>>(getEndpoint());

    return (
        <section className={`popular-movies ${debouncedSearchTerm.trim() && 'mt-20'}`}>
            <h2 className="text-gradient">{debouncedSearchTerm.trim() ? 'Search Results' : 'Popular'}</h2>
            {isLoading ? <Spinner /> : error ? <p className="text-red-500">{error}</p> : (
                data && data.results && data.results.length > 0 ? (
                    <ul>
                        {data.results.map(movie => <MovieCard key={movie.id} movie={movie} />)}
                    </ul>
                ) : <p className="text-gray-400">No movies found</p>
            )}
        </section>
    )
};

export default PopularMovies;