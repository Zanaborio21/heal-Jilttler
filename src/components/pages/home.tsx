import { Outlet, Link } from "react-router-dom";


const Home = () => {
    return (
     <div>
       <section id="landing-page" className="py-5">
        <div className="container mt-5">
          <div className="mb-5 row">
            <div className="col-lg-5">
              <div className="main-content">
                <p className="mt-4 p-2 badge rounded-pill">
                  <strong>Recordatorio</strong> <i className="fas fa-circle"></i> Medicinas
                </p>
                <h1 className="my-3 main-text">Confia tu Salud en HealthTracker.</h1>
                <p className="main-desc mt-4">
                  Somos <span>una novedosa aplicacion</span> para ayudarte a recordar tu medicacion de manera facil.
                </p>
                <div className="mt-5 btns-group">
                <Link to="recordatory"> <button className="me-2 btn btn-secondary">
                    Crear Recordatorio <i className="fas fa-arrow-right"></i>
                  </button> </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-1 offset"></div>
            <div className="col-lg-6 d-flex align-items-center">
              <aside>
                <img
                  className="img-fluid"
                  src="..\img\medical.jpg"
                  alt="medical-illustration"
                />
              </aside>
            </div>
          </div>
        </div>
      </section>
     </div>
    )
}

export default Home;