import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import useWindowResize from '../../hooks/useWindowResize';
import { BREWDOG_API, NUM_OF_ITEMS } from '../../constants/constants';
import fetchFromParams from '../../services/fetchFromParams';
import Card from './components/Card';
import prevPageIcon from '../../assets/prevPage.svg';
import nextPageIcon from '../../assets/nextPage.svg';
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

  const width = useWindowResize();

  console.log(width);

  return (
    <>
      {beers !== null && (
        <>
          <div className="cardGroup">
            {beers.map((beer) => (
              <Card beer={beer} key={beer.id} />
            ))}
          </div>

          {width <= 425 ? (
            <ReactPaginate
              pageCount={Math.ceil(NUM_OF_ITEMS / params.perPage)}
              pageRangeDisplayed={0}
              marginPagesDisplayed={1}
              initialPage={params.page - 1}
              onPageChange={handlePageChange}
              containerClassName={'container'}
              previousLinkClassName={'page'}
              previousLabel={<img className="paginationChevron" src={prevPageIcon} alt="" />}
              breakClassName={'page'}
              nextLinkClassName={'page'}
              nextLabel={<img className="paginationChevron" src={nextPageIcon} alt="" />}
              pageClassName={'page'}
              disabledClassName={'disabled'}
              activeClassName={'active'}
            />
          ) : (
            <ReactPaginate
              pageCount={Math.ceil(NUM_OF_ITEMS / params.perPage)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              initialPage={params.page - 1}
              onPageChange={handlePageChange}
              containerClassName={'container'}
              previousLinkClassName={'page'}
              breakClassName={'page'}
              nextLinkClassName={'page'}
              pageClassName={'page'}
              disabledClassName={'disabled'}
              activeClassName={'active'}
            />
          )}
        </>
      )}
    </>
  );
}
