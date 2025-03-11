import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  // const userLogged = localStorage.getItem("userLogged");

  const userLogged = JSON.parse(localStorage.getItem("userLogged"));  
  const rol = userLogged?.Rol;  
  
  console.log(rol); 
  



  const handleLogout = () => {
    localStorage.removeItem("userLogged");
    localStorage.removeItem("userEmail");
    navigate("/");

    console.log("Sesión cerrada");
  }
  
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link to="/panel" className="btn btn-secondary ms-2">
              PANEL
            </Link>
            {rol === "Admin" ? (
              <Link to="/adminDashboard" className="btn btn-secondary ms-2">
                Administració d’Usuaris
              </Link>
            ) : (
              ""
            )}
            {userEmail ? (
              <Link onClick={handleLogout} to="/" className="btn btn-danger ms-2">
                Cerrar sesion
              </Link>
            ) : (
              <>
                <Link to="/" className="btn btn-secondary ms-2">
                  LOGIN
                </Link>
                <Link to="/Registre" className="btn btn-secondary ms-2">
                  REGISTRO
                </Link>
              </>
            )}
          </div>
          <div>
            {userEmail ? (
              <span>{userEmail}</span> // Mostrar el correo si está logueado
            ) : (
              <span>No estás logueado</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
