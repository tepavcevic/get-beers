const handleFetch = (currentPage) => {
  const beersPerPage = 20;

  return {
    fetchRandomBeer: async (currentPage) => {
      if (typeof currentPage !== 'number') {
        currentPage = 1;
      }

      try {
        const response = await fetch(
          `https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=${beersPerPage}`,
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (error) {
        alert(error.message);
        console.error(error);
      }
    },
  };
};

export default handleFetch;
