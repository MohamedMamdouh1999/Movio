import { useParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";

import type { IMovie } from "../interfaces/movie";

import Spinner from "../components/shared/Spinner";
import Image from "../components/shared/Image";
import MovieVideo from "../components/movie/MovieVideo";
import MovieContent from "../components/movie/MovieContent";

const Movie = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useFetch<IMovie>(id ? `movie/${id}?language=en-US` : '');

    const formatRuntime = (runtime: number) => {
        if (!runtime) return "N/A";

        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`;
    };

    if (isLoading) return <Spinner />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!(data && data.id)) return <p className="text-gray-400">No movie found</p>;

    return (
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
            <MovieContent data={data} />
        </div>
    );
}

export default Movie;