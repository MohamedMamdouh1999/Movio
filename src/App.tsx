import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <main>
      <div className="pattern" />
      <Outlet />
    </main>
  )
};

export default App