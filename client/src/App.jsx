import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Uploads from "./pages/Uploads";
import Clients from "./pages/Clients";
import Templates from "./pages/Templates";
import Emails from "./pages/Emails";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/uploads"
          element={<Uploads />}
        />

        <Route
          path="/clients"
          element={<Clients />}
        />

        <Route
          path="/templates"
          element={<Templates />}
        />

        <Route
          path="/emails"
          element={<Emails />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;