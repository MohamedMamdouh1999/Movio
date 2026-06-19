import { Link, useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import type { IMovie } from "../interfaces/movie";

import Spinner from "../components/shared/Spinner";
import Image from "../components/shared/Image";
import MovieVideo from "../components/movie/MovieVideo";

const Movie = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useFetch<IMovie>(id ? `movie/${id}?language=en-US` : '');

    const formatRuntime = (runtime: number) => {
        if (!runtime) return "N/A";

        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
    };
    const formatReleaseDate = (date: string) => {
        if (!date) return "N/A";

        const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));

        return formattedDate;
    };
    const formatPrice = (price: number) => {
        if (!price) return "N/A";

        if (price >= 1_000_000_000_000) return `$${(price / 1_000_000_000_000).toFixed(1)} trillion`;
        if (price >= 1_000_000_000) return `$${(price / 1_000_000_000).toFixed(1)} billion`;
        if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(0)} million`;
        if (price >= 1_000) return `$${(price / 1_000).toFixed(0)} thousand`;
        if (price >= 100) return `$${(price / 100).toFixed(0)} hundred`;
        if (price >= 1) return (price / 1).toFixed(0);

        return `$${price.toLocaleString()}`;
    };

    return (
        <section className="popular-movies">
            {isLoading ? <Spinner /> : error ? <p className="text-red-500">{error}</p> : (
                !(data && data.id) ? <p className="text-gray-400">No movie found</p> : 
                (
                    <div className="movie">
                        <div className="movie-header">
                            <h2>{data.title}</h2>
                            <div>
                                <img loading="lazy" src="/star.svg" alt="Movio" />
                                <p><span>{data.vote_average.toFixed(1) || 0}</span>/10 ({data.vote_count || 0})</p>
                            </div>
                        </div>
                        <div className="year-runtime">
                            <span>{data.release_date ? data.release_date.split('-')[0] : 'N/A'}</span>
                            {data.runtime && (
                                <>
                                    <span>•</span>
                                    <span>{formatRuntime(data.runtime)}</span>
                                </>
                            )}
                        </div>
                        <div className="images-video">
                            <Image poster={data.poster_path} title={data.title} />
                            <MovieVideo id={data.id} poster={data.backdrop_path} title={data.title} />
                        </div>
                        <ul className="content">
                            <li className="info">
                                <div>
                                    <span>Genres</span>
                                    {!data.genres.length ? <p>N/A</p> : (
                                        <ul className="genres">
                                            {data.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <span>Overview</span>
                                    <p className={data.overview && 'description'}>{data.overview || 'N/A'}</p>
                                </div>
                                <div>
                                    <span>Release Date</span>
                                    <p>{formatReleaseDate(data.release_date)}</p>
                                </div>
                                <div>
                                    <span>Countries</span>
                                    {!data.production_countries.length ? <p>N/A</p> : (
                                        <ul>
                                            {data.production_countries.map((country, index) => {
                                                return (
                                                    index > 0 ? (
                                                        <>
                                                            <li key={country.iso_3166_1}>
                                                                <p>•</p>
                                                            </li>
                                                            <li key={country.iso_3166_1}>
                                                                <p>{country.name}</p>
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <li key={country.iso_3166_1}>
                                                            <p>{country.name}</p>
                                                        </li>
                                                    )
                                                )
                                            })}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <span>Status</span>
                                    <p>{data.status || 'N/A'}</p>
                                </div>
                                <div>
                                    <span>Languages</span>
                                    {!data.spoken_languages.length ? <p>N/A</p> : (
                                        <ul>
                                            {data.spoken_languages.map((language, index) => {
                                                return (
                                                    index > 0 ? (
                                                        <>
                                                            <li key={language.iso_639_1}>
                                                                <p>•</p>
                                                            </li>
                                                            <li key={language.iso_639_1}>
                                                                <p>{language.english_name}</p>
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <li key={language.iso_639_1}>
                                                            <p>{language.english_name}</p>
                                                        </li>
                                                    )
                                                )
                                            })}
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <span>Budget</span>
                                    <p>{formatPrice(data.budget)}</p>
                                </div>
                                <div>
                                    <span>Revenue</span>
                                    <p>{formatPrice(data.revenue)}</p>
                                </div>
                                <div>
                                    <span>Tagline</span>
                                    <p>{data.tagline || 'N/A'}</p>
                                </div>
                                <div>
                                    <span>Production Companies</span>
                                    {!data.production_companies.length ? <p>N/A</p> : (
                                        <ul>
                                            {data.production_companies.map((company, index) => {
                                                return (
                                                    index > 0 ? (
                                                        <>
                                                            <li key={company.id}>
                                                                <p>•</p>
                                                            </li>
                                                            <li key={company.id}>
                                                                <p>{company.name}</p>
                                                            </li>
                                                        </>
                                                    ) : (
                                                        <li key={company.id}>
                                                            <p>{company.name}</p>
                                                        </li>
                                                    )
                                                )
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </li>
                            {data.homepage && (
                                <li className="visit-homepage">
                                    <Link to={data.homepage} target="_blank">
                                        <span>Visit Homepage</span>
                                        <img loading="lazy" src="/arrow-right.svg" alt="Movio" />
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                ) 
            )}
        </section>
    );
}

export default Movie;