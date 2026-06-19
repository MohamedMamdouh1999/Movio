import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import type { IResponse } from "../../interfaces/response";
import type { IMovie } from "../../interfaces/movie";

import Image from "../shared/Image";

const TrendingMovies = () => {
    const { data } = useFetch<IResponse<IMovie[]>>("trending/movie/day?language=en-US&page=1");

    return (
        <>
            {data && data.results && data.results.length > 0 && (
                <section className="trending">
                    <h2 className="text-gradient">Trending</h2>
                    <ul>
                        {data.results.map((movie, index) => (
                            <li key={movie.id}>
                                <Link to={`/movie/${movie.id}`}>
                                    <p>{index + 1}</p>
                                    <Image poster={movie.poster_path} title={movie.title} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
}

export default TrendingMovies