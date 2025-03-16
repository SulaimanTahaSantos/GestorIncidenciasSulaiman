"use client";
import { MobileView, BrowserView } from "react-device-detect";
import { Badge, Card, Button, Row, Col } from "react-bootstrap";
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

      {/* Mobile view */}
      <MobileView>
        <div className="mobile-cards-container">
          {sortedTickets.map((ticket) => (
            <Card key={ticket.id} className="ticket-card-mobile mb-3">
              <Card.Header className="d-flex justify-content-between align-items-center ticket-header">
                <div className="d-flex align-items-center">
                  <Badge bg="primary" className="ticket-id-badge">
                    #{ticket.id}
                  </Badge>
                  <span className="ms-2 ticket-date">{ticket.fecha}</span>
                </div>
                <Badge bg="warning" text="dark" className="ticket-status">
                  Pendiente
                </Badge>
              </Card.Header>

              <Card.Body>
                <Row className="ticket-info-row">
                  <Col xs={5} className="ticket-label">
                    Aula:
                  </Col>
                  <Col xs={7} className="ticket-value">
                    {ticket.aula}
                  </Col>
                </Row>

                <Row className="ticket-info-row">
                  <Col xs={5} className="ticket-label">
                    Grupo:
                  </Col>
                  <Col xs={7} className="ticket-value">
                    {ticket.grupo}
                  </Col>
                </Row>

                <Row className="ticket-info-row">
                  <Col xs={5} className="ticket-label">
                    Ordenador:
                  </Col>
                  <Col xs={7} className="ticket-value">
                    {ticket.ordenador}
                  </Col>
                </Row>

                <div className="ticket-description mt-3">
                  <div className="ticket-label mb-1">Descripción:</div>
                  <div className="ticket-description-text">
                    {ticket.descripcion}
                  </div>
                </div>

                <div className="ticket-student mt-3">
                  <div className="d-flex align-items-center">
                    <div className="student-avatar">
                      {ticket.alumno.charAt(0).toUpperCase()}
                    </div>
                    <div className="ms-2">
                      <div className="ticket-label">Alumno:</div>
                      <div className="ticket-value">{ticket.alumno}</div>
                    </div>
                  </div>
                </div>
              </Card.Body>

              <Card.Footer className="ticket-actions">
                <div className="d-flex flex-wrap justify-content-between">
                  {rol === "Admin" && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        className="action-button"
                        onClick={() => resolveTicket(ticket.id)}
                      >
                        <i className="bi bi-check-circle me-1"></i>
                        Resolver
                      </Button>

                      <Button
                        variant="warning"
                        size="sm"
                        className="action-button"
                        onClick={() => {
                          setCurrentTicket(ticket);
                          editTicket(ticket);
                          handleModal();
                        }}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Editar
                      </Button>
                    </>
                  )}

                  <Button
                    variant="info"
                    size="sm"
                    className="action-button"
                    onClick={() => {
                      handleNavigateToComentarios(ticket.id);
                      handleModal();
                      setCurrentTicket(ticket);
                    }}
                  >
                    <i className="bi bi-chat-left-text me-1"></i>
                    Comentarios
                  </Button>

                  {rol === "Admin" && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="action-button"
                      onClick={() => deleteTicket(ticket.id)}
                    >
                      <i className="bi bi-trash3 me-1"></i>
                      Eliminar
                    </Button>
                  )}
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </MobileView>

      <BrowserView>
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
      </BrowserView>
    </div>
  );
};

export default TiquetsPendents;
