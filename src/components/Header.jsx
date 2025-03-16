import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import supabase from "../config/config";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Header = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error obteniendo usuario:", error.message);
        return;
      }

      if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userEmail) {
      const fetchRole = async () => {
        const { data, error } = await supabase
          .from("dades_usuaris")
          .select("rol")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.error("Error obteniendo el rol del usuario:", error.message);
          return;
        }

        setUserRole(data?.rol);
        console.log("Rol del usuario:", data?.rol);
      };

      fetchRole();
    }
  }, [userEmail]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error al cerrar sesión:", error.message);
        return;
      }

      localStorage.removeItem("userLogged");
      localStorage.removeItem("userEmail");

      console.log("Sesión cerrada correctamente");
      navigate("/");
    } catch (err) {
      console.error("Error inesperado al cerrar sesión:", err.message);
    }
  };

  const NavigationLinks = ({
    className = "",
    btnClassName = "btn btn-secondary mb-2 me-2",
  }) => (
    <>
      <li className={`nav-item ${className}`}>
        <Link to="/panel" className={btnClassName}>
          PANEL
        </Link>
      </li>
      {userRole === "Admin" && (
        <li className={`nav-item ${className}`}>
          <Link to="/adminDashboard" className={btnClassName}>
            Administració d'Usuaris
          </Link>
        </li>
      )}
      {userEmail ? (
        <li className={`nav-item ${className}`}>
          <Link
            onClick={handleLogout}
            to="/"
            className="btn btn-danger mb-2 me-2"
          >
            Cerrar sesión
          </Link>
        </li>
      ) : (
        <>
          <li className={`nav-item ${className}`}>
            <Link to="/" className={btnClassName}>
              LOGIN
            </Link>
          </li>
          <li className={`nav-item ${className}`}>
            <Link to="/Registre" className={btnClassName}>
              REGISTRO
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <header>
      <BrowserView>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Gestión de incidencias FPLLEFIA
            </a>
            <div className="d-flex justify-content-center flex-grow-1">
              <ul className="navbar-nav">
                <NavigationLinks />
              </ul>
            </div>
            <div className="ms-3 mt-2">
              {userEmail ? (
                <span>{userEmail}</span>
              ) : (
                <span>No estás logueado</span>
              )}
            </div>
          </div>
        </nav>
      </BrowserView>

      <MobileView>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Gestión de incidencias FPLLEFIA
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <NavigationLinks />
              </ul>
              <div className="ms-3 mt-2">
                {userEmail ? (
                  <span>{userEmail}</span>
                ) : (
                  <span>No estás logueado</span>
                )}
              </div>
            </div>
          </div>
        </nav>
      </MobileView>
    </header>
  );
};

export default Header;
