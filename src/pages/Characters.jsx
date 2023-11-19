import React, { useEffect, useState } from "react";
import axios from "axios";

const Characters = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-marvel--5k8n57mxd46s.code.run/characters"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="position">
        <div className="font-character">
          <h2>Liste des Personnages</h2>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="content-character">
          {data.characters.map((character) => (
            <div key={character._id} className="character">
              <img
                src={`${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`}
                alt={character.name}
              />
              <h3 className="character-title">{character.name}</h3>
              <p className="character-description">{character.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Characters;
