import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Comentari from "../components/Comentari";
import supabase from "../config/config";

function Comentaris() {
  const [comentarios, setComentarios] = useState([]);
  const { id } = useParams();
  const [userId, setUserId] = useState(null);
  const [snackbar, setSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  // Obtener el usuario logueado
  const getUsuario = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error al obtener el usuario:", error);
      return null;
    }

    if (data.user) {
      const { data: userData, error: userError } = await supabase
        .from("dades_usuaris")
        .select("id, nombre, apellido ")
        .eq("email", data.user.email)
        .single();

      if (userError) {
        console.error("Error al obtener datos del usuario:", userError);
        return null;
      }

      setUserId(userData ? userData.id : null);
      console.log("User ID:", userData);
    }
  };

  useEffect(() => {
    const obtenerComentarios = async () => {
      const { data, error } = await supabase
        .from("comentaris")
        .select("comentari, fecha, user_id")
        .eq("ticket_id", id);

      if (error) {
        console.error("Error al obtener los comentarios:", error);
      } else {
        // Para cada comentario, obtenemos el nombre del usuario
        const comentariosConNombre = await Promise.all(
          data.map(async (comentario) => {
            const { data: userData, error: userError } = await supabase
              .from("dades_usuaris")
              .select("nombre, apellido")
              .eq("id", comentario.user_id)
              .single();

            if (userError) {
              console.error("Error al obtener datos del usuario:", userError);
              return null;
            }

            return {
              ...comentario,
              nombre: userData.nombre,
              apellido: userData.apellido,
            };
          })
        );

        setComentarios(comentariosConNombre.filter(Boolean));
      }
    };

    obtenerComentarios();
    getUsuario();
  }, [id]);

  const handleComentarioSubmit = async (comentari, fecha) => {
    if (!userId) {
      console.error("No hay un usuario logueado.");
      return;
    }

    const newComentario = {
      comentari,
      fecha,
      ticket_id: id,
      user_id: userId,
    };

    const { data: insertedComentario, error } = await supabase
      .from("comentaris")
      .insert([newComentario])
      .single();

    if (error) {
      console.error("Error al insertar el comentario:", error);
      setSnackbarMessage("Error al enviar el comentario.");
      setSnackbarType("danger");
      setSnackBar(true);
      return;
    } else {
      const { data: userData, error: userError } = await supabase
        .from("dades_usuaris")
        .select("nombre, apellido")
        .eq("id", userId)
        .single();

      if (userError) {
        console.error("Error al obtener el nombre del usuario:", userError);
      } else {
        const comentarioConAutor = {
          ...insertedComentario,
          nombre: userData.nombre,
          apellido: userData.apellido,
          fecha: newComentario.fecha,
          comentari: newComentario.comentari,
        };

        setComentarios((prevComentarios) => [
          ...prevComentarios,
          comentarioConAutor,
        ]);

        setSnackbarMessage("Comentario enviado exitosamente.");
        setSnackbarType("success");
        setSnackBar(true);

        // Desaparecer el snackbar después de 2 segundos
        setTimeout(() => setSnackBar(false), 2000);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="container mt-5">
        <div className="d-flex">
          <h1>Comentarios</h1>
        </div>

        <h2 className="my-4">
          Código ticket: <span>{id}</span>
        </h2>

        <Comentari
          comentarios={comentarios}
          onComentarioSubmit={handleComentarioSubmit}
          idTicket={id}
        />
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
}

export default Comentaris;
