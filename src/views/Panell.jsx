import React, { useState, useEffect } from "react";
import Header from '../components/Header';
import { dades_tiquets } from '../database/gestionTickets';
import Comentari from "../components/Comentari";
import Comentaris from "./Comentaris";
import { useNavigate } from "react-router-dom";

const Panell = () => {
  const storedTickets = JSON.parse(localStorage.getItem("tickets")) || dades_tiquets;

  let navigate = useNavigate();

  const [tickets, setTickets] = useState(storedTickets);
  const [showModal, setShowModal] = useState(false);  // Estado para controlar la visibilidad del modal
  const [currentTicket, setCurrentTicket] = useState(null);
  const updateLocalStorage = (updatedTickets) => {
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
  };

  const resolveTicket = (codigo) => {
    const nuevosTickets = tickets.map((ticket) => {
      if (ticket.Codigo === codigo && ticket.Estado === "Pendiente") {
        return { ...ticket, Estado: "Resuelto", fechaResuelto: new Date().toLocaleDateString() }; 
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
  };

  const handleAddComentario = (comentario) => {
    if (currentTicket) {  
      const nuevosTickets = tickets.map((ticket) => {
        if (ticket.Codigo === currentTicket.Codigo) {
          return {
            ...ticket,
            comentarios: [...(ticket.comentarios ?? []), { autor: currentTicket.Alumno, texto: comentario, fecha: new Date().toLocaleDateString() }]
          };
        }
        return ticket;
      });


  
      setTickets(nuevosTickets);
      updateLocalStorage(nuevosTickets);

      console.log(nuevosTickets);
      console.log(currentTicket);
      console.log(comentario)
    } else {
      alert('No se seleccionó ningún ticket.');
    }
  }

  const handleNavigateToComentarios = (ticketId) => {
    navigate(`/comentaris/${ticketId}`, {
    });
  };
  
  

  return (
    <>
      <Header />
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
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
            {tickets.map((ticket) =>
              ticket.Estado === "Pendiente" && (
                <tr key={ticket.Codigo}>
                  <td>{ticket.Codigo}</td>
                  <td>{ticket.Fecha}</td>
                  <td>{ticket.Aula}</td>
                  <td>{ticket.Grupo}</td>
                  <td>{ticket.Ordenador}</td>
                  <td>{ticket.Descripcion}</td>
                  <td>{ticket.Alumno}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      title="Resolver ticket"
                      onClick={() => resolveTicket(ticket.Codigo)}
                    >
                      Resolver
                    </button>
                  </td>
                  <td>
                    <button onClick={()=> {
                      handleModal();
                      setCurrentTicket(ticket);
                    }} className="btn btn-warning" title="Añadir comentario">
                      <i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </button>
                  </td>
                  <td>
                    <button onClick={()=>{
                      handleNavigateToComentarios(ticket.Codigo)
                      handleModal();
                      setCurrentTicket(ticket);
                    }} className="btn btn-info" title="Ver comentarios">
                      <i className="bi bi-chat-left-text"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      title="Eliminar ticket"
                      onClick={() => deleteTicket(ticket.Codigo)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

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
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) =>
              ticket.Estado === "Resuelto" && (
                <tr key={ticket.Codigo}>
                  <td>{ticket.Codigo}</td>
                  <td>{ticket.Fecha}</td>
                  <td>{ticket.fechaResuelto}</td>
                  <td>{ticket.Aula}</td>
                  <td>{ticket.Grupo}</td>
                  <td>{ticket.Ordenador}</td>
                  <td>{ticket.Descripcion}</td>
                  <td>{ticket.Alumno}</td>
                  <td>
                    <button className="btn btn-success" title="Resolver ticket">
                      Resolver
                    </button>
                  </td>
                  <td>
                    <button onClick={handleModal} className="btn btn-warning" title="Añadir comentario">
                      <i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-info" title="Ver comentarios">
                      <i className="bi bi-chat-left-text"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      title="Eliminar ticket"
                      onClick={() => deleteTicket(ticket.Codigo)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* {showModal && <Comentari 
          show={showModal} 
          handleClose={closeModal} 
          onSubmit={handleAddComentario} 
            />

        } */}
      

  
      </main>
   


      {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label>
              <input className="form-control" defaultValue="Este es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div> */}

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default Panell;
