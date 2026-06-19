import { useMemo } from "react";

import useFetch from "../../hooks/useFetch";

import type { IMovieVideo } from "../../interfaces/movie-video";

import Spinner from "../shared/Spinner";
import Image from "../shared/Image";

interface IProps {
    id: number;
    poster: string;
    title: string;
}

const MovieVideo = ({ id, poster, title }: IProps) => {
    const { data, isLoading, error } = useFetch<IMovieVideo>(`movie/${id}/videos?language=en-US`);

    const trailer = useMemo(() => {
        if (!data?.results?.length) return null;

        const youtubeVideos = data.results.filter(video => video.site === "YouTube");
        const officialTrailer = youtubeVideos.find(video => video.type === "Trailer" && video.official);
        const anyTrailer = youtubeVideos.find(video => video.type === "Trailer");
        const teaser = youtubeVideos.find(video => video.type === "Teaser");

        return officialTrailer || anyTrailer || teaser || youtubeVideos[0] || null;
    }, [data]);
    console.log(trailer);

    if (isLoading) return <Spinner />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!trailer) return <Image poster={poster} title={title} />;

    return <iframe loading="lazy" title={trailer.name} src={`https://www.youtube.com/embed/${trailer.key}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />;
};

export default MovieVideo;