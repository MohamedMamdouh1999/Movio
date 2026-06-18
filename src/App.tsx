import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  )
};

export default App