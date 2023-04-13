import { Link } from 'react-router-dom';

import './styles.css';

export default function ErrorPage({ errorMessage }) {
  return (
    <>
      {errorMessage ? (
        <h1>Ooops, there was an error - {errorMessage.toUpperCase()}!</h1>
      ) : (
        <h1>Ooops, 404 page not found!</h1>
      )}
      <p>Please, return back to safety</p>
      <div className="btnGroup">
        <Link to={-1}>
          <button className="backBtn">Go back</button>
        </Link>
        <Link to={'/'}>
          <button className="btn">To homepage</button>
        </Link>
      </div>
    </>
  );
}
