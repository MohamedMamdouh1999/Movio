import Search from "./Search";

interface IProps {
    search: string;
    setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: IProps) => {
    return (
        <header>
            <img loading="lazy" src="/hero-img.png" alt="Movio" />
            <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
            <Search search={search} setSearch={setSearch} />
        </header>
    )
};

export default Header;