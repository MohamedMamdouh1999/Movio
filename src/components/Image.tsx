interface IProps {
    className?: string;
    poster: string;
    title: string;
}

const Image = ({ className, poster, title }: IProps) => {
    return <img className={className} loading="lazy" src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : '/no-image.png'} alt={title} />
}

export default Image