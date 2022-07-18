import { useNavigate } from 'react-router-dom';
import './style.scss';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container-not-found">
      <img src="../../assets/image/logo_hexagony.png" alt="Hexagony" />
      <h1>Oops! Page not found.</h1>
      <p>
        The page you requested <strong>"{window.location.href}"</strong> does not exist in Hexagony
      </p>
      <p className="go-back" onClick={() => navigate(-1)}>
        ← Go back
      </p>
    </div>
  );
};
