import { Link } from "react-router-dom";

import type { IMovie } from "../../interfaces/movie";

interface IProps {
    data: IMovie
}

const MovieContent = ({ data }: IProps) => {
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
    )
}

export default MovieContent;