import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link to="/panel" className="btn btn-secondary ms-2">
              PANEL
            </Link>
            <Link to="/" className="btn btn-secondary ms-2">
              LOGIN
            </Link>
            <Link to="/Registre" className="btn btn-secondary ms-2">
              REGISTRO
            </Link>
          </div>
          <div>
            <span>administrador@fpllefia.com</span>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
