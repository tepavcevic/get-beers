import reduceToString from '../../../../utils/reduceToString';

export default function FoodPairings({ values }) {
  return (
    <p>
      <b>Food pairings: </b>
      <span>{reduceToString(values)}</span>
    </p>
  );
}
