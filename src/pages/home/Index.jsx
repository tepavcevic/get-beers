import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import firstFetch from '../../domain/fetchAPI/firstFetch';
import genericBottle from '../../assets/generic-bottle.png';

export default function Home() {
  const [beers, setBeers] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const fetchFromParams = async (pageNum, perPage) => {
      if (!pageNum) {
        try {
          const response = await firstFetch();

          if (!response.ok) {
            throw new Error(`Error ${response.status}`);
          }

          const result = await response.json();
          setBeers(result);
          setSearchParams('?page=1&per_page=20');
        } catch (error) {
          alert(error.message);
          console.error(error);
        }
      } else {
        try {
          const response = await fetch(
            `https://api.punkapi.com/v2/beers?page=${Number(pageNum)}&per_page=${Number(perPage)}`,
          );

          if (!response.ok) {
            throw new Error(`Error ${response.status}`);
          }

          const result = await response.json();
          setBeers(result);
        } catch (error) {
          alert(error.message);
          console.error(error);
        }
      }
    };

    fetchFromParams(params.page, params.per_page);
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

      <Link to={`?page=1&per_page=20`}>First</Link>
      <br />
      <Link to={`?page=${Number(params.page) - 1}&per_page=20`}>Previous</Link>
      <br />
      <Link to={`?page=${Number(params.page) + 1}&per_page=20`}>Next</Link>
      <br />
      <Link to={`?page=17&per_page=20`}>Last</Link>
    </>
  );
}
