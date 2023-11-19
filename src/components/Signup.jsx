import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const response = await axios.post(
        "https://site--backend-marvel--5k8n57mxd46s.code.run/signup",
        {
          email,
          username,
          password,
        }
      );
      handleToken(response.data.token);
      navigate("/");
      console.log(response.data);
    } catch (error) {
      if (error.response.data.message === 400) {
        setErrorMessage("Merci de remplir les cases manquantes");
      } else if (error.response.status === 409) {
        setErrorMessage("Ce email existe déjà !");
      }
    }
  };

  return (
    <main className="signup-login-container">
      <div className="position">
        <div className="font-form">
          <h2 className="header-title">S'inscrire</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="signup-login-form">
        <input
          type="text"
          placeholder="Pseudo"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Inscris toi !" />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </main>
  );
};

export default Signup;
