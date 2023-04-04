import { useState } from "react";
import ReactPaginate from "react-paginate";

import handleFetch from "./domain/fetchAPI/handleFetch";
import genericBottle from "./assets/generic-bottle.png";
import "./App.css";

function App() {
  const [beers, setBeers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const numOfPages = 17;

  const handleFetchedData = handleFetch();

  const handleData = async (currentPage) => {
    setIsLoading(true);
    const data = await handleFetchedData.fetchRandomBeer(currentPage);
    setBeers(data);
    setIsLoading(false);
  };

  const handlePageChange = (selectedObject) => {
    handleData(selectedObject.selected + 1);
  };

  return (
    <div className="App">
      <button onClick={handleData} disabled={isLoading}>
        Get some beer
      </button>

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
              <img
                src={beer.image_url}
                height="235px"
                width="auto"
                alt="beer image"
              />
            ) : (
              <img
                src={genericBottle}
                height="235px"
                width="auto"
                alt="beer image"
              />
            )}
            <br />
            <br />
            <hr />
            <br />
          </div>
        ))}

      <ReactPaginate
        pageCount={numOfPages}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"container"}
        previousLinkClassName={"page"}
        breakClassName={"page"}
        nextLinkClassName={"page"}
        pageClassName={"page"}
        disabledClassNae={"disabled"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
