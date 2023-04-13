const reduceToString = (values) => {
  if (typeof values[0] !== 'string') {
    const value = values.reduce((acc, curr) => `${acc}, ${curr.name}`, '');
    return value.slice(2);
  } else {
    const value = values.reduce((acc, curr) => `${acc}, ${curr}`, '');
    return value.slice(2);
  }
};

export default reduceToString;
