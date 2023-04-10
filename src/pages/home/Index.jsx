import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { BREWDOG_API, NUM_OF_ITEMS } from '../../constants/constants';
import fetchFromParams from '../../services/fetchFromParams';
import genericBottle from '../../assets/generic-bottle.png';
import './styles.css';

export default function Home() {
  const [beers, setBeers] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    page: searchParams.get('page') || 1,
    perPage: searchParams.get('perPage') || 12,
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
    fetchFromParams(BREWDOG_API, queryParamOptions(params)).then(setBeers);
  }, [searchParams]);

  return (
    <>
      <div className="cardGroup">
        {beers !== null &&
          beers.map((beer) => (
            <div className="card" key={beer.id}>
              <section className="imageSection">
                {beer.image_url !== null ? (
                  <img src={beer.image_url} className="cardImage" alt="beer image" />
                ) : (
                  <img
                    src={genericBottle}
                    className="cardImage"
                    height="235px"
                    max-width="auto"
                    alt="beer image"
                  />
                )}
              </section>

              <div className="cardBody">
                <h3 className="title">{beer.name}</h3>
                <p className="tagline">{beer.tagline}</p>

                <Link to={`/${beer.id}`} className="textLink">
                  <button className="btn cardBtn">Know more</button>
                </Link>
              </div>
            </div>
          ))}
      </div>

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
