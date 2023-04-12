import { Link } from 'react-router-dom';

import genericBottle from '../../../assets/generic-bottle.png';
import './styles.css';

export default function Card({ beer }) {
  return (
    <div className="card">
      <section className="imageSection">
        {beer.image_url !== null ? (
          <img src={beer.image_url} className="cardImage" alt="beer image" />
        ) : (
          <img
            src={genericBottle}
            className="cardImage"
            height="235px"
            max-width="auto"
            alt="beer image"
          />
        )}
      </section>

      <div className="cardBody">
        <h3 className="title">{beer.name}</h3>
        <p className="tagline">{beer.tagline}</p>

        <Link to={`/${beer.id}`} className="textLink">
          <button className="btn cardBtn">Know more</button>
        </Link>
      </div>
    </div>
  );
}
