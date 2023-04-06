const firstFetch = () => {
  return fetch('https://api.punkapi.com/v2/beers?page=1&per_page=20');
};

export default firstFetch;
