import './styles.css';

export default function BeerIngredients({ svg, name, values }) {
  const stingifyValues = (valuesArray) => {
    const value = valuesArray.reduce((acc, curr) => `${acc}, ${curr.name}`, '');

    return value.slice(2);
  };

  return (
    <p className="beerIngredients">
      <span className="ingredientName">
        <img src={svg} alt="" />
        <b>{name}: </b>
      </span>
      {typeof values !== 'string' ? (
        <span className="ingredientValue">{stingifyValues(values)}</span>
      ) : (
        <span className="ingredientValue">{values}</span>
      )}
    </p>
  );
}
