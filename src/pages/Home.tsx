import { useState } from "react";

import Header from "../components/home/Header";

const Home = () => {
    const [search, setSearch] = useState("");

    return (
        <div className="wrapper">
            <Header search={search} setSearch={setSearch} />
        </div>
    )
}

export default Home;