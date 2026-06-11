import { HashRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <HashRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </HashRouter>
  );
}

export default App;