import React from "react";
import "../tickets-pendientes.css";

const TiquetsPendents = ({
  tickets,
  resolveTicket,
  deleteTicket,
  rol,
  handleNavigateToComentarios,
  handleModal,
  setCurrentTicket,
  editTicket,
}) => {
  const sortedTickets = tickets
    .filter((ticket) => ticket.estado === "Pendiente")
    .sort((a, b) => {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
      return new Date(a.fecha) - new Date(b.fecha);
    });

  return (
    <div className="tickets-container">
      <h2 className="mt-5 mb-4">Tickets pendientes</h2>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.alumno}</td>
                <td>
                  <div className="action-buttons">
                    {rol === "Admin" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-1"
                          title="Resolver ticket"
                          onClick={() => resolveTicket(ticket.id)}
                        >
                          Resolver
                        </button>
                        <button
                          onClick={() => {
                            setCurrentTicket(ticket);
                            editTicket(ticket);
                            handleModal();
                          }}
                          className="btn btn-warning btn-sm me-1"
                          title="Añadir comentario"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {
                        handleNavigateToComentarios(ticket.id);
                        handleModal();
                        setCurrentTicket(ticket);
                      }}
                      className="btn btn-info btn-sm me-1"
                      title="Ver comentarios"
                    >
                      <i className="bi bi-chat-left-text"></i>
                    </button>
                    {rol === "Admin" && (
                      <button
                        className="btn btn-danger btn-sm"
                        title="Eliminar ticket"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TiquetsPendents;
