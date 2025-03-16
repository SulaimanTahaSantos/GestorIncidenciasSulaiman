import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/config";

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

  return (
    <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link to="/panel" className="btn btn-secondary ms-2">
              PANEL
            </Link>
            {userRole === "Admin" && (
              <Link to="/adminDashboard" className="btn btn-secondary ms-2">
                Administració d’Usuaris
              </Link>
            )}
            {userEmail ? (
              <Link
                onClick={handleLogout}
                to="/"
                className="btn btn-danger ms-2"
              >
                Cerrar sesión
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
              <span>{userEmail}</span>
            ) : (
              <span>No estás logueado</span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
