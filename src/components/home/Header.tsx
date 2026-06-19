import Search from "../shared/Search";

const Header = () => {
    return (
        <header>
            <img loading="lazy" src="/hero-img.png" alt="Movio" />
            <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
            <Search />
        </header>
    )
};

export default Header;