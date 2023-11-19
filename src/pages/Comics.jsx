import React, { useEffect, useState } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--backend-marvel--5k8n57mxd46s.code.run/comics"
        );
        console.log(response.data);
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
        <div className="font">
          <h2>Liste des Comics</h2>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="content-comic">
          {data.comics.map((comic) => (
            <div key={comic._id} className="comic">
              <img
                src={`${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`}
                alt={comic.title}
                className="comic-image"
              />
              <h3 className="comic-title">{comic.title}</h3>

              <p className="comic-description">{comic.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comics;
