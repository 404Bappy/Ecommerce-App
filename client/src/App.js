import { Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Register from "./Pages/Auth/Register";
import Contact from "./Pages/Contact";
import HomePage from "./Pages/HomePage";
import PageNotFound from "./Pages/PageNotFound";
import Policy from "./Pages/Policy";
import Login from "./Pages/Auth/Login";
import Dashboard from "./Pages/User/Dashboard";
import PrivateRoute from "./Components/Routes/PrivateRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
