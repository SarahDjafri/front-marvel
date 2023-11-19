import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";

// Components
import Header from "./components/Header";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const [search, setSearch] = useState("");

  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<Signup token={token} handleToken={handleToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} handleToken={handleToken} />}
        />
        <Route path="/comics" element={<Comics search={search} />} />
        <Route path="/characters" element={<Characters search={search} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
