import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { getDadesTiquets } from "../database/gestionTickets";
import { useNavigate } from "react-router-dom";
import Tiquet from "./tiquet";
import TiquetsPendents from "../components/TiquetsPendents";
import TiquetsResolts from "../components/TiquetsResolts";

const Panell = () => {
  const storedTickets = getDadesTiquets();
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const rol = userLogged?.Rol;

  let navigate = useNavigate();

  const [tickets, setTickets] = useState(storedTickets);
  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  const updateLocalStorage = (updatedTickets) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const updateTickets = (updatedTickets) => {
    setTickets(updatedTickets);
  };

  const resolveTicket = (codigo) => {
    const nuevosTickets = tickets.map((ticket) => {
      if (ticket.Codigo === codigo && ticket.Estado === "Pendiente") {
        return {
          ...ticket,
          Estado: "Resuelto",
          fechaResuelto: new Date().toLocaleDateString(),
        };
      }
      return ticket;
    });
    setTickets(nuevosTickets);
    updateLocalStorage(nuevosTickets);
  };

  const deleteTicket = (codigo) => {
    const nuevosTickets = tickets.filter((ticket) => ticket.Codigo !== codigo);
    setTickets(nuevosTickets);
    updateLocalStorage(nuevosTickets);
  };

  useEffect(() => {
    updateLocalStorage(tickets);
  }, [tickets]);

  const handleModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTicket(null); // Limpiar al cerrar el modal
  };

  const handleNavigateToComentarios = (ticketId) => {
    navigate(`/comentaris/${ticketId}`, {});
  };

  const editTicket = (ticket) => {
    setCurrentTicket(ticket);
    setShowModal(true); // Abrir modal de edición
  };

  return (
    <>
      <Header />
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <div>
          <button
            className="btn btn-success mt-4"
            title="Añadir ticket"
            onClick={handleModal}
          >
            Añadir ticket
          </button>
        </div>
        <Tiquet
          show={showModal}
          handleClose={closeModal}
          onAddTicket={updateTickets}
          currentTicket={currentTicket} // Enviar el ticket actual a editar
        />

        <TiquetsPendents
          tickets={tickets}
          resolveTicket={resolveTicket}
          deleteTicket={deleteTicket}
          rol={rol}
          handleNavigateToComentarios={handleNavigateToComentarios}
          handleModal={handleModal}
          setCurrentTicket={setCurrentTicket}
          editTicket={editTicket}
        />

        <TiquetsResolts
          tickets={tickets}
          resolveTicket={resolveTicket}
          deleteTicket={deleteTicket}
          rol={rol}
          handleNavigateToComentarios={handleNavigateToComentarios}
          handleModal={handleModal}
          setCurrentTicket={setCurrentTicket}
          editTicket={editTicket}
        />
      </main>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default Panell;
