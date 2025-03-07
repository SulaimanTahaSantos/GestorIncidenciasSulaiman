import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import Comentari from "../components/Comentari";


function Comentaris() {
  const [comentarios, setComentarios] = useState([]);
  const { id } = useParams();

  const getUsuario = () => {
    const userLogged = JSON.parse(localStorage.getItem("userLogged"));
    return userLogged ? userLogged.Nombre + " " + userLogged.Apellido : "Desconocido";
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dades_tiquets"));
    if (storedData) {
      const ticket = storedData.find((ticket) => ticket.Codigo === parseInt(id));
      if (ticket) {
        setComentarios(ticket.comentarios);
      }
    }
  }, [id]);

  const handleComentarioSubmit = (comentario, fecha) => {
    const newComentario = {
      comentario,
      fecha,
      autor: getUsuario(),
    };

    const updatedComentarios = [...comentarios, newComentario];
    setComentarios(updatedComentarios);

    const storedData = JSON.parse(localStorage.getItem("dades_tiquets"));
    if (storedData) {
      const updatedData = storedData.map((ticket) => {
        if (ticket.Codigo === parseInt(id)) {
          ticket.comentarios = updatedComentarios;
        }
        return ticket;
      });
      localStorage.setItem("dades_tiquets", JSON.stringify(updatedData));
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
    </>
  );
}

export default Comentaris;
