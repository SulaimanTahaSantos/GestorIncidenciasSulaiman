import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Tiquet from "./tiquet";
import TiquetsPendents from "../components/TiquetsPendents";
import TiquetsResolts from "../components/TiquetsResolts";
import supabase from "../config/config";

const Panell = () => {
  // const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  // const rol = userLogged?.Rol;

  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState(null);

  let navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

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

  const resolveTicket = async (id) => {
    const { data, error } = await supabase
      .from("dades_tiquets")
      .update({ estado: "Resuelto", fecha_resuelto: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error resolviendo ticket:", error);
    } else {
      setTickets(tickets.map((ticket) => (ticket.id === id ? data : ticket)));
    }
  };

  const deleteTicket = async (id) => {
    const { error } = await supabase
      .from("dades_tiquets")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("Error eliminando ticket:", error);
    } else {
      setTickets(tickets.filter((ticket) => ticket.id !== id));
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
    </>
  );
};

export default Panell;
