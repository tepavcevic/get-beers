import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import fetchFromParams from '../../domain/fetchAPI/fetchFromParams';
import { BREWDOG_API } from '../../constants/constants';
import genericBottle from '../../assets/generic-bottle.png';

export default function BeerInfo() {
  const [beer, setBeer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromParams(BREWDOG_API, `/${id}`).then((result) => {
      setBeer(result[0]);
    });
  }, [id]);

  return (
    <>
      {beer !== null && (
        <>
          <h4>{beer.id}</h4>
          <h3>{beer.name.toUpperCase()}</h3>
          <p>{beer.tagline.toUpperCase()}</p>
          <i>
            <small>{beer.brewers_tips}</small>
          </i>
          <br />
          <br />
          <br />
          {beer.image_url !== null ? (
            <img src={beer.image_url} height="235px" width="auto" alt="beer image" />
          ) : (
            <img src={genericBottle} height="235px" width="auto" alt="beer image" />
          )}
          <p>{beer.description}</p>
          <section>
            <b>Hops: </b>
            {beer.ingredients.hops.map((item, index) => (
              <span key={index}>{item.name}, </span>
            ))}
          </section>
          <section>
            <b>Malt: </b>
            {beer.ingredients.malt.map((item) => (
              <span key={item.name}>{item.name}, </span>
            ))}
          </section>
          <section>
            <b>Yeast: </b>
            <span>{beer.ingredients.yeast}</span>
          </section>
        </>
      )}
    </>
  );
}
