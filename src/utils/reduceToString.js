const reduceToString = (values) => {
  if (typeof values[0] !== 'string') {
    return values.map((value) => value.name).join(', ');
  } else {
    return values.join(', ');
  }
};

export default reduceToString;
