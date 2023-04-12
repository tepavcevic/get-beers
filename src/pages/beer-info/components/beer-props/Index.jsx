import './styles.css';

export default function BeerProps({ svg, name, value }) {
  return (
    <p className="beerProps">
      <span className="propName">
        <img src={svg} alt="" />
        <b>{name}:</b>
      </span>
      <span className="propValue">{name === 'ABV' ? `${value} %` : value}</span>
    </p>
  );
}
