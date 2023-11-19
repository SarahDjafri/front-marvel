import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = ({ token, search, setSearch, handleToken }) => {
  return (
    <header>
      <div>
        <Link to="/">
          <img src={logo} alt="Logo Marvel" className="marvel-logo" />
        </Link>
      </div>
      <div className="container-button">
        <input
          placeholder="Recherche"
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <Link to="/comics">Comics</Link>
        <Link to="/characters">Personnages</Link>

        {token ? (
          <button
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/signup">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
