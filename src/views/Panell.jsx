import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Tiquet from "./tiquet";
import TiquetsPendents from "../components/TiquetsPendents";
import TiquetsResolts from "../components/TiquetsResolts";
import supabase from "../config/config";
import "../styles.css";

const Panell = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  const [snackbar, setSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  let navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      const { data, error } = await supabase.from("dades_tiquets").select();
      if (error) {
        console.error("Error obteniendo tickets:", error);
      } else {
        setTickets(data);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        setSnackbarMessage(`Error obteniendo el usuario: ${error.message}`);
        setSnackbarType("danger");
        setSnackBar(true);
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
          setSnackbarMessage(
            `Error obteniendo el rol del usuario: ${error.message}`
          );
          setSnackbarType("danger");
          setSnackBar(true);
          return;
        }

        setUserRole(data?.rol);
      };

      fetchRole();
    }
  }, [userEmail]);

  const resolveTicket = async (id) => {
    const { data, error } = await supabase
      .from("dades_tiquets")
      .update({ estado: "Resuelto", fecha_resuelto: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      setSnackbarMessage(`Error resolviendo ticket: ${error.message}`);
      setSnackbarType("danger");
      setSnackBar(true);
    } else {
      setTickets(tickets.map((ticket) => (ticket.id === id ? data : ticket)));
      setSnackbarMessage("Ticket resuelto exitosamente");
      setSnackbarType("success");
      setSnackBar(true);
    }
  };

  const deleteTicket = async (id) => {
    const { error } = await supabase
      .from("dades_tiquets")
      .delete()
      .eq("id", id);
    if (error) {
      setSnackbarMessage(`Error eliminando ticket: ${error.message}`);
      setSnackbarType("danger");
      setSnackBar(true);
    } else {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
      setSnackbarMessage("Ticket eliminado exitosamente");
      setSnackbarType("success");
      setSnackBar(true);
    }
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTicket(null);
  };

  const handleNavigateToComentarios = (ticketId) => {
    navigate(`/comentaris/${ticketId}`);
  };

  const editTicket = (ticket) => {
    setCurrentTicket(ticket);
    setShowModal(true);
  };

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackBar(false);
      }, 2000); 

      return () => clearTimeout(timer); 
    }
  }, [snackbar]);

  return (
    <>
      <Header />
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <button className="btn btn-success mt-4" onClick={handleModal}>
          Añadir ticket
        </button>

        <Tiquet
          show={showModal}
          handleClose={closeModal}
          onAddTicket={setTickets}
          currentTicket={currentTicket}
        />

        <TiquetsPendents
          tickets={tickets}
          resolveTicket={resolveTicket}
          deleteTicket={deleteTicket}
          rol={userRole}
          handleNavigateToComentarios={handleNavigateToComentarios}
          handleModal={handleModal}
          editTicket={editTicket}
          setCurrentTicket={setCurrentTicket}
        />
        <TiquetsResolts
          tickets={tickets}
          resolveTicket={resolveTicket}
          deleteTicket={deleteTicket}
          rol={userRole}
          handleNavigateToComentarios={handleNavigateToComentarios}
          handleModal={handleModal}
          setCurrentTicket={setCurrentTicket}
          editTicket={editTicket}
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
};

export default Panell;
