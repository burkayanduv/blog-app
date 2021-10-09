/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import '../styles/componentStyles/topbar.scss';

function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = process.env.REACT_APP_PF_URL;

  const handleLogout = async () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="topLeft collapse navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <i className="topIcon fab fa-facebook-square" />
          <i className="topIcon fab fa-twitter-square" />
          <i className="topIcon fab fa-pinterest-square" />
          <i className="topIcon fab fa-instagram-square" />
        </div>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav topLink">
            <span className="topLinkItem">
              <Link to="/" className="link">
                HOME
              </Link>
            </span>
            <a
              className="topLinkItem"
              href="https://github.com/burkayanduv/blog-app"
            >
              ABOUT
            </a>
            <a className="topLinkItem" href="https://burkayanduv.netlify.app/">
              CONTACT
            </a>
            <span className="topLinkItem">
              <Link to="/write" className="link">
                WRITE
              </Link>
            </span>
            <span className="topLinkItem" onClick={handleLogout}>
              {user && (
                <Link to="/logout" className="link">
                  LOGOUT
                </Link>
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              className="topImg"
              src={
                user?.profilePic
                  ? `${PF}/${user?.profilePic}`
                  : `${PF}/blank-profile.png`
              }
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topLinkItem">
              <Link to="/login" className="link">
                LOGIN
              </Link>
            </li>
            <li className="topLinkItem">
              <Link to="/register" className="link">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Topbar;
