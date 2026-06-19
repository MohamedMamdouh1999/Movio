export interface IMovieVideo {
    id: number;
    results: IVideo[];
};

interface IVideo {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: "Featurette" | "Teaser" | "Trailer";
    official: boolean;
    id: string;
    published_at: string;
}