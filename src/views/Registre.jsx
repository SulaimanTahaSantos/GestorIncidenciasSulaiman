import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://flnqqkjwltedwlapaloy.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbnFxa2p3bHRlZHdsYXBhbG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MTM2MTMsImV4cCI6MjA1NzI4OTYxM30.lHM3RLzE2mJiYTSFwbHn9802vYGz_0Wji7G6VPm6fWM";
const supabase = createClient(supabaseUrl, supabaseKey);

const Registre = () => {
  const [user, setUser] = useState({
    Nombre: "",
    Apellido: "",
    Email: "",
    Contrasena: "",
    Rol: "Alumno",
  });

  const [snackbar, setSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.Nombre && user.Apellido && user.Email && user.Contrasena) {
      try {
        const { user: supabaseUser, error: signUpError } =
          await supabase.auth.signUp({
            email: user.Email,
            password: user.Contrasena,
          });

        if (signUpError) {
          setSnackbarMessage(
            `Error al registrar usuario: ${signUpError.message}`
          );
          setSnackbarType("danger");
          return;
        }

        // 2. Insertar el usuario en la tabla 'dades_usuaris'
        const { error: insertError } = await supabase
          .from("dades_usuaris") // Nombre de la tabla en Supabase
          .insert([
            {
              nombre: user.Nombre,
              apellido: user.Apellido,
              email: user.Email,
              password: user.Contrasena,
              rol: user.Rol || "Alumno", // Si no se especifica rol, se asigna 'Alumno' por defecto
            },
          ]);

        if (insertError) {
          setSnackbarMessage(
            `Error al guardar en la base de datos: ${insertError.message}`
          );
          setSnackbarType("danger");
          return;
        }

        // 3. Mostrar mensaje de éxito
        setSnackbarMessage("Usuario registrado exitosamente");
        setSnackbarType("success");
      } catch (err) {
        setSnackbarMessage(`Error inesperado: ${err.message}`);
        setSnackbarType("danger");
      }
    } else {
      setSnackbarMessage("Faltan datos para completar el registro");
      setSnackbarType("danger");
    }

    // 4. Limpiar el formulario
    setUser({
      Nombre: "",
      Apellido: "",
      Email: "",
      Contrasena: "",
      Rol: "Alumno",
    });

    // 5. Mostrar el mensaje de la "snackbar"
    setSnackBar(true);

    // 6. Ocultar la snackbar después de 3 segundos
    setTimeout(() => {
      setSnackBar(false);
    }, 3000);
  };

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Registro</h1>
          <form
            onSubmit={handleSubmit}
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px" }}
          >
            <label htmlFor="email" className="mt-2 form-label">
              Email:{" "}
            </label>
            <input
              type="email"
              name="Email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={user.Email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="nombre" className="mt-2 form-label">
              Nombre:{" "}
            </label>
            <input
              type="text"
              name="Nombre"
              className="form-control"
              placeholder="Nombre"
              value={user.Nombre}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="apellido" className="mt-2 form-label">
              Apellido:{" "}
            </label>
            <input
              type="text"
              name="Apellido"
              className="form-control"
              placeholder="Apellido"
              value={user.Apellido}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="contrasena" className="mt-2 form-label">
              Contraseña:{" "}
            </label>
            <input
              type="password"
              name="Contrasena"
              className="form-control"
              value={user.Contrasena}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="mt-4 w-100 btn btn-primary">
              Registrar
            </button>
            <div className="mt-2">
              <a className="text-decoration-none" href="/">
                Si ya tienes cuenta, inicia sesión
              </a>
            </div>
          </form>
        </div>
      </main>

      {snackbar && (
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
          <div
            className={`toast show bg-${snackbarType}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
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

export default Registre;
