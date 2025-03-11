import React, { useState, useEffect } from "react";

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
  return (
    <>
      <h2 className="mt-5">Tickets pendientes</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(
            (ticket) =>
              ticket.Estado === "Pendiente" && (
                <tr key={ticket.Codigo}>
                  <td>{ticket.Codigo}</td>
                  <td>{ticket.Fecha}</td>
                  <td>{ticket.Aula}</td>
                  <td>{ticket.Grupo}</td>
                  <td>{ticket.Ordenador}</td>
                  <td>{ticket.Descripcion}</td>
                  <td>{ticket.Alumno}</td>
                  {rol === "Admin" && (
                    <td>
                      <button
                        className="btn btn-success"
                        title="Resolver ticket"
                        onClick={() => resolveTicket(ticket.Codigo)}
                      >
                        Resolver
                      </button>
                    </td>
                  )}

                  {rol === "Admin" && (
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
                  )}
                  <td>
                    <button
                      onClick={() => {
                        handleNavigateToComentarios(ticket.Codigo);
                        handleModal();
                        setCurrentTicket(ticket);
                      }}
                      className="btn btn-info"
                      title="Ver comentarios"
                    >
                      <i className="bi bi-chat-left-text"></i>
                    </button>
                  </td>
                  {rol === "Admin" && (
                    <td>
                      <button
                        className="btn btn-danger"
                        title="Eliminar ticket"
                        onClick={() => deleteTicket(ticket.Codigo)}
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </td>
                  )}
                </tr>
              )
          )}
        </tbody>
      </table>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default TiquetsPendents;
