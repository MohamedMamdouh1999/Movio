import useFetch from "../../hooks/useFetch";

import type { IResponse } from "../../interfaces/response";
import type { IMovie } from "../../interfaces/movie";

const TrendingMovies = () => {
    const { data } = useFetch<IResponse<IMovie[]>>("movie/top_rated?language=en-US&page=1");

    return (
        <>
            {data && data.results && data.results.length > 0 && (
                <section className="trending">
                    <h2 className="text-gradient">Trending</h2>
                    <ul>
                        {data.results.map((movie, index) => (
                            <li key={movie.id}>
                                <p>{index + 1}</p>
                                <img loading="lazy" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}

export default TrendingMovies