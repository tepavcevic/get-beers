import reduceToString from '../../../../utils/reduceToString';
import './styles.css';

export default function BeerIngredients({ svg, name, values }) {
  return (
    <p className="beerIngredients">
      <span className="ingredientName">
        <img src={svg} alt="" />
        <b>{name}: </b>
      </span>
      {typeof values !== 'string' ? (
        <span className="ingredientValue">{reduceToString(values)}</span>
      ) : (
        <span className="ingredientValue">{values}</span>
      )}
    </p>
  );
}
