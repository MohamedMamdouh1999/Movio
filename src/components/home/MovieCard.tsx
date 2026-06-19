import { memo } from "react";
import { Link } from "react-router-dom";

import type { IMovie } from "../../interfaces/movie";

import Image from "../Image";

const MovieCard = memo(({ movie }: { movie: IMovie }) => {
    return (
        <li className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <Image poster={movie.poster_path} title={movie.title} />
                <div className="mt-4">
                    <h3>{movie.title}</h3>
                    <div className="content">
                        <div className="rating">
                            <img loading="lazy" src="/star.svg" alt="Star Icon" />
                            <p>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
                        </div>
                        <span>•</span>
                        <p className="lang">{movie.original_language}</p>
                        <span>•</span>
                        <p className="year">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</p>
                    </div>
                </div>
            </Link>
        </li>
    )
})

export default MovieCard;