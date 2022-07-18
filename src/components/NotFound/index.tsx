import { Link } from 'react-router-dom';
import './style.scss';
export const PageNotFound = () => {
  return (
    <div className="container-not-found">
      <img src="../../assets/image/logo_hexagony.png" alt="Hexagony" />

      <span>
        <h1>Oops!</h1>
        <h1>
          Page not found.
          <span> The page you requested does not exist in Hexagony</span>
          <span> {window.location.href}</span>
        </h1>
      </span>
      <Link to="/">back</Link>
    </div>
  );
};
