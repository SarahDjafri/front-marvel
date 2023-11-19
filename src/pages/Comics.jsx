import React, { useEffect, useState } from "react";
import axios from "axios";

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

const Comics = ({ search }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const changepage = (i) => {
    return (e) => {
      setPage(i);
      e.preventDefault();
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "https://site--backend-marvel--5k8n57mxd46s.code.run/comics";
        url = url + `?page=${page}`;

        if (search) {
          url = url + `&title=${search}`;
        }

        const response = await axios.get(url);
        setCount(response.data.count);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

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
        <>
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
          <div className="pagination">
            {range(1, Math.ceil(count / 100)).map((i) => (
              <span>
                {" "}
                {i === page ? (
                  <span>{i}</span>
                ) : (
                  <a href="" onClick={changepage(i)}>
                    {i}
                  </a>
                )}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Comics;
