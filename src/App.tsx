import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./routes/route";

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
