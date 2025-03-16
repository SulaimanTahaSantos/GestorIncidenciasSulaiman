import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import supabase from "../config/config";
import "../styles.css";

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
  const [showEmailVerification, setShowEmailVerification] = useState(false);

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
        // 1. Comprobar si el email ya existe en la base de datos
        const { data: existingUser, error: fetchError } = await supabase
          .from("dades_usuaris")
          .select("*")
          .eq("email", user.Email)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          setSnackbarMessage(
            `Error verificando el usuario: ${fetchError.message}`
          );
          setSnackbarType("danger");
          setSnackBar(true);
          return;
        }

        if (existingUser) {
          setSnackbarMessage("Este correo ya está registrado.");
          setSnackbarType("danger");
          setSnackBar(true);
          return;
        }

        // 2. Registrar el usuario en Supabase Authentication
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
          setSnackBar(true);
          return;
        }

        // 3. Insertar el usuario en la tabla 'dades_usuaris'
        const { error: insertError } = await supabase
          .from("dades_usuaris")
          .insert([
            {
              nombre: user.Nombre,
              apellido: user.Apellido,
              email: user.Email,
              password: user.Contrasena,
              rol: user.Rol || "Alumno",
            },
          ]);

        if (insertError) {
          setSnackbarMessage(
            `Error al guardar en la base de datos: ${insertError.message}`
          );
          setSnackbarType("danger");
          setSnackBar(true);
          return;
        }

        // 4. Mostrar mensaje de éxito
        setSnackbarMessage("Usuario registrado exitosamente");
        setSnackbarType("success");
        setShowEmailVerification(true); 

        setTimeout(() => {
          setShowEmailVerification(false);
        }, 10000); 
      } catch (err) {
        setSnackbarMessage(`Error inesperado: ${err.message}`);
        setSnackbarType("danger");
      }
    } else {
      setSnackbarMessage("Faltan datos para completar el registro");
      setSnackbarType("danger");
    }

    // Limpiar el formulario
    setUser({
      Nombre: "",
      Apellido: "",
      Email: "",
      Contrasena: "",
      Rol: "Alumno",
    });

    setSnackBar(true);
    setTimeout(() => {
      setSnackBar(false);
    }, 2000); 
  };

  return (
    <>
      <main className="container mt-5">
        {showEmailVerification && (
          <div className="alert alert-info mb-4">
            <strong>¡Verifica tu correo electrónico!</strong>
            <p>
              Hemos enviado un enlace de verificación a tu correo electrónico.
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace
              para activar tu cuenta.
            </p>
            <p className="mb-0">
              Una vez verificado, podrás iniciar sesión con tus credenciales.
            </p>
          </div>
        )}
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

export default Registre;
