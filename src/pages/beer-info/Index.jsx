import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import genericBottle from '../../assets/generic-bottle.png';

export default function BeerInfo() {
  const [beer, setBeer] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchBeer = async () => {
      const response = await fetch(`https://api.punkapi.com/v2/beers/${params.id}`);
      const result = await response.json();
      setBeer(result);
    };

    fetchBeer();
  }, []);

  return (
    <>
      {beer !== null && (
        <>
          <h4>{beer[0].id}</h4>
          <h3>{beer[0].name.toUpperCase()}</h3>
          <p>{beer[0].tagline.toUpperCase()}</p>
          <i>
            <small>{beer[0].brewers_tips}</small>
          </i>
          <br />
          <br />
          <br />
          {beer[0].image_url !== null ? (
            <img src={beer[0].image_url} height="235px" width="auto" alt="beer image" />
          ) : (
            <img src={genericBottle} height="235px" width="auto" alt="beer image" />
          )}
          <p>{beer[0].description}</p>
          <section>
            <b>Hops: </b>
            {beer[0].ingredients.hops.map((item, index) => (
              <span key={index}>{item.name}, </span>
            ))}
          </section>
          <section>
            <b>Malt: </b>
            {beer[0].ingredients.malt.map((item) => (
              <span key={item.name}>{item.name}, </span>
            ))}
          </section>
          <section>
            <b>Yeast: </b>
            <span>{beer[0].ingredients.yeast}</span>
          </section>
        </>
      )}
    </>
  );
}
