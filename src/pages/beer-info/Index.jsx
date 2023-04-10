import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import fetchFromParams from '../../services/fetchFromParams';
import { BREWDOG_API } from '../../constants/constants';
import genericBottle from '../../assets/generic-bottle.png';
import './styles.css';

export default function BeerInfo({ setErrorMessage }) {
  const [beer, setBeer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFromParams(BREWDOG_API, `/${id}`)
      .then(([result]) => {
        setBeer(result);
      })
      .catch((error) => {
        setErrorMessage(error);
        navigate('/error', { replace: true });
      });
  }, [id]);

  return (
    <>
      {beer !== null && (
        <div className="beerInfoPage">
          <h3 className="title">{beer.name}</h3>
          <p className="tagline">{beer.tagline}</p>

          <div className="beerInfoHeader">
            <div className="beerInfo">
              <p>
                <b>ABV:</b>
                {beer.abv}%
              </p>
              <p>
                <b>OG:</b>
                {beer.target_og}
              </p>
              <p>
                <b>IBU's:</b>
                {beer.ibu}
              </p>

              <button className="btn">See full recipe</button>
            </div>
            <aside className="beerImageSection">
              {beer.image_url !== null ? (
                <img src={beer.image_url} className="beerImage" alt="beer image" />
              ) : (
                <img src={genericBottle} className="beerImage" alt="beer image" />
              )}
            </aside>
          </div>

          <div className="beerDescription">
            <p>
              <b>Hops: </b>
              {beer.ingredients.hops.map((item, index) => (
                <span key={index}>{item.name}; </span>
              ))}
            </p>
            <p>
              <b>Malt: </b>
              {beer.ingredients.malt.map((item) => (
                <span key={item.name}>{item.name}; </span>
              ))}
            </p>
            <p>
              <b>Yeast: </b>
              <span>{beer.ingredients.yeast}</span>
            </p>

            <p>{beer.description}</p>
            <i>
              <small>{beer.brewers_tips}</small>
            </i>
            <p>
              <b>Food pairings: </b>
              {beer.food_pairing.map((item, index) => (
                <span key={index}>{item}; </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
