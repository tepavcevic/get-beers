import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import fetchFromParams from '../../services/fetchFromParams';
import { BREWDOG_API } from '../../constants/constants';
import ImageSection from './components/image-section/Index';
import BeerProps from './components/beer-props/Index';
import BeerIngredients from './components/beer-ingredients/Index';
import FoodPairings from './components/food-pairings/Index';
import og from '../../assets/og.svg';
import hops from '../../assets/hops.svg';
import malt from '../../assets/malt.svg';
import yeast from '../../assets/yeast.svg';
import abv from '../../assets/abv.svg';
import ibu from '../../assets/ibu.svg';
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
              <h4>BEER SHEET</h4>
              <BeerProps svg={abv} name="ABV" value={beer.abv} />
              <BeerProps svg={og} name="OG" value={beer.target_og} />
              <BeerProps svg={ibu} name="IBU's" value={beer.ibu} />
            </div>
            <ImageSection imageUrl={beer.image_url} />
          </div>

          <BeerIngredients svg={hops} name="Hops" values={beer.ingredients.hops} />
          <BeerIngredients svg={malt} name="Malts" values={beer.ingredients.malt} />
          <BeerIngredients svg={yeast} name="Yeast" values={beer.ingredients.yeast} />

          <h4>DESCRIPTION</h4>

          <div className="beerDescription">
            <p>{beer.description}</p>
            <i>{beer.brewers_tips}</i>
            <FoodPairings values={beer.food_pairing} />
          </div>
        </div>
      )}
    </>
  );
}
