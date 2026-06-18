interface IProps {
    search: string
    setSearch: (value: string) => void
}

const Search = ({ search, setSearch }: IProps) => {
    return (
        <div className="search">
            <div>
                <img loading="lazy" src="/search.svg" alt="Movio" />
                <input type="text" placeholder="Search through 300+ movies online" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
        </div>
    )
}

export default Search