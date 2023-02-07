import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";

const NavbarSito = () => {
  const isLoggedIn = !!localStorage.getItem("user");

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a href="#" className="navbar-brand"><i className="fas fa-capsules me-2"></i> Health-Tracker</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#obatin-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="obatin-nav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
              </li>
            </ul>
            {!isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item pe-2">
                  <Link to="sign"><button className="btn btn-white">Sign Up</button></Link>
                </li>
                <li className="nav-item pe-2">
                  <Link to="docSign"><button className="btn btn-white">Sign Up Doctor</button></Link>
                </li>
                <li className="nav-item ps-2">
                  <Link to="login"><button className="btn btn-primary">Sign In</button></Link>
                </li>
              </ul>
            )}
            {isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item pe-2">
                  <Link to="/profile"><button className="btn btn-primary">Perfil</button></Link>
                </li>
                <li className="nav-item ps-2">
                  <Link to="recordatory"><button className="btn btn-primary">Add recordatory</button></Link>
                </li>
                <li className="nav-item pe-2">
                  <button className="btn btn-white" onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token")
                    window.location.reload();
                  }}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </Navbar>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default NavbarSito;