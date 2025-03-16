import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/config";
import "../styles.css";

const IniciSessio = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logeado, setLogeado] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Comprobar si el usuario existe en la base de datos
      const { data: existingUser, error: fetchError } = await supabase
        .from("dades_usuaris")
        .select("email")
        .eq("email", email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        setSnackbarMessage(
          `Error verificando el usuario: ${fetchError.message}`
        );
        setSnackbarType("danger");
        setSnackBar(true);
        return;
      }

      if (!existingUser) {
        setSnackbarMessage("Este usuario no está registrado.");
        setSnackbarType("danger");
        setSnackBar(true);
        return;
      }

      // 2. Intentar iniciar sesión con la contraseña
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setSnackbarMessage("Contraseña incorrecta.");
        setSnackbarType("danger");
        setSnackBar(true);
        return;
      }

      // 3. Si la autenticación es exitosa
      setSnackbarMessage("Usuario logueado exitosamente");
      setSnackbarType("success");
      setSnackBar(true);

      setTimeout(() => {
        setSnackBar(false);
        navigate("/panel");
      }, 2000);
    } catch (err) {
      setSnackbarMessage(`Error inesperado: ${err.message}`);
      setSnackbarType("danger");
      setSnackBar(true);
    }
  };

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Login</h1>
          <form
            onSubmit={handleSubmit}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}
          >
            <label htmlFor="email" className="mt-2 form-label">
              Email:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:{" "}
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleInputChange}
              name="password"
            />
            <input
              type="submit"
              className="mt-3 w-100 btn btn-primary"
              value="Entrar"
              id="enviar"
            />
            <div className="mt-2">
              <a className="text-decoration-none" href="/Registre">
                Si no tienes cuenta registrate
              </a>
            </div>
            <div className="mt-2">
              <a className="text-decoration-none" href="/RememberPassword">
                Recuperar contraseña
              </a>
            </div>
          </form>
        </div>
      </main>

      {snackbar && (
        <div
          className={`toast-container position-fixed top-0 start-50 translate-middle-x p-3 fadeInUp`}
        >
          <div
            className={`toast show bg-${snackbarType} text-white rounded-3 shadow-lg`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ animation: "slideIn 0.5s ease-out" }}
          >
            <div className="toast-header">
              <strong className="me-auto">
                {snackbarType === "success" ? "Éxito" : "Error"}
              </strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setSnackBar(false)}
              ></button>
            </div>
            <div className="toast-body">{snackbarMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default IniciSessio;
