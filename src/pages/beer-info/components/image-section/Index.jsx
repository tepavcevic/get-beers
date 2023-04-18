import genericBottle from '../../../../assets/generic-bottle.png';
import './styles.css';

export default function ImageSection({ imageUrl }) {
  return (
    <aside className="beerImageSection">
      {imageUrl !== null ? (
        <img src={imageUrl} className="beerImage" alt="beer image" />
      ) : (
        <img src={genericBottle} className="beerImage" alt="beer image" />
      )}
    </aside>
  );
}
