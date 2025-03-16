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
  const sortedTickets = tickets
    .filter((ticket) => ticket.estado === "Resuelto")
    .sort((a, b) => {
      if (a.id !== b.id) {
        return a.id - b.id;
      }
      return new Date(a.fecha_resuelto) - new Date(b.fecha_resuelto);
    });

  return (
    <>
      {rol === "Admin" && (
        <>
          <h2 className="mt-5">Tickets resueltos</h2>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
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
                {sortedTickets.map((ticket) => (
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
                      <div className="action-buttons">
                        <button
                          onClick={() => {
                            handleModal();
                            setCurrentTicket(ticket);
                            editTicket(ticket);
                          }}
                          className="btn btn-warning btn-sm me-1"
                          title="Añadir comentario"
                        >
                          <i
                            className="bi bi-pencil"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          ></i>
                        </button>

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

                        <button
                          className="btn btn-danger btn-sm me-1"
                          title="Eliminar ticket"
                          onClick={() => deleteTicket(ticket.id)}
                        >
                          <i className="bi bi-trash3"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default TiquetsResolts;
