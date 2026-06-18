import { useState } from "react";

import Search from "./components/Search";

const App = () => {
  const [search, setSearch] = useState('');

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img loading="lazy" src="/hero-img.png" alt="Movio" />
          <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
          <Search search={search} setSearch={setSearch} />
        </header>
      </div>
    </main>
  );
};

export default App;