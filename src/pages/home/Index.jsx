import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { BREWDOG_API } from '../../constants/apiUrl';
import { NUM_OF_ITEMS } from '../../constants/apiNumOfItems';
import fetchFromParams from '../../domain/fetchAPI/fetchFromParams';
import genericBottle from '../../assets/generic-bottle.png';

export default function Home() {
  const [beers, setBeers] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    page: searchParams.get('page') || 1,
    perPage: searchParams.get('per_page') || 20,
  };

  const handlePageChange = (selectedObject) => {
    setSearchParams({
      ...params,
      page: selectedObject.selected + 1,
    });
  };

  const queryParamOptions = (params) => {
    return `?page=${params.page}&per_page=${params.perPage}`;
  };

  useEffect(() => {
    const fetchBeers = async () => {
      const data = await fetchFromParams(BREWDOG_API, queryParamOptions(params));
      setBeers(data);
    };

    fetchBeers();
  }, [searchParams]);

  return (
    <>
      <br />

      {beers !== null &&
        beers.map((beer) => (
          <div key={beer.id}>
            <h4>{beer.id}</h4>
            <h3>{beer.name.toUpperCase()}</h3>
            <p>{beer.tagline.toUpperCase()}</p>
            <i>
              <small>{beer.brewers_tips}</small>
            </i>

            <br />
            <br />
            <br />

            {beer.image_url !== null ? (
              <img src={beer.image_url} height="235px" width="auto" alt="beer image" />
            ) : (
              <img src={genericBottle} height="235px" width="auto" alt="beer image" />
            )}
            <br />
            <Link to={`/${beer.id}`}>See beer details</Link>
            <br />
            <hr />
            <br />
          </div>
        ))}

      <ReactPaginate
        pageCount={Math.ceil(NUM_OF_ITEMS / params.perPage)}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={'container'}
        previousLinkClassName={'page'}
        breakClassName={'page'}
        nextLinkClassName={'page'}
        pageClassName={'page'}
        disabledClassNae={'disabled'}
        activeClassName={'active'}
      />
    </>
  );
}
