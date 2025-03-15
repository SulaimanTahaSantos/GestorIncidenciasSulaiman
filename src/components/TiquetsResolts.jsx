import React, { useState, useEffect } from "react";

const TiquetsResolts = ({
  tickets,
  resolveTicket,
  deleteTicket,
  rol,
  handleNavigateToComentarios,
  handleModal,
  setCurrentTicket,
  editTicket,
}) => {
  return (
    <>
      {rol === "Admin" && (
        <>
          <h2 className="mt-5">Tickets resueltos</h2>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Código</th>
                <th>Fecha</th>
                <th>Fecha resuelto</th>
                <th>Aula</th>
                <th>Grupo</th>
                <th>Ordenador</th>
                <th>Descripción</th>
                <th>Alumno</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) =>
                ticket.estado === "Resuelto" ? (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.fecha}</td>
                    <td>{ticket.fecha_resuelto}</td>
                    <td>{ticket.aula}</td>
                    <td>{ticket.grupo}</td>
                    <td>{ticket.ordenador}</td>
                    <td>{ticket.descripcion}</td>
                    <td>{ticket.alumno}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleModal();
                          setCurrentTicket(ticket);
                          editTicket(ticket);
                        }}
                        className="btn btn-warning"
                        title="Añadir comentario"
                      >
                        <i
                          className="bi bi-pencil"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        ></i>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleNavigateToComentarios(ticket.id);
                          handleModal();
                          setCurrentTicket(ticket);
                        }}
                        className="btn btn-info"
                        title="Ver comentarios"
                      >
                        <i className="bi bi-chat-left-text"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        title="Eliminar ticket"
                        onClick={() => deleteTicket(ticket.id)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default TiquetsResolts;
