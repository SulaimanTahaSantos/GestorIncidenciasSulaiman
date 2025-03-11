import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { getDadesTiquets, setDadesTiquets } from "../database/gestionTickets";

const Tiquet = ({ show, handleClose, onAddTicket, currentTicket }) => {
  const [tickets, setTickets] = useState(getDadesTiquets());

  const nextCodigo =
    tickets.length > 0 ? tickets[tickets.length - 1].Codigo + 1 : 6;

  const [codigo, setCodigo] = useState(currentTicket?.Codigo || nextCodigo);
  const [fecha, setFecha] = useState(currentTicket?.Fecha || "");
  const [aula, setAula] = useState(currentTicket?.Aula || "");
  const [grupo, setGrupo] = useState(currentTicket?.Grupo || "");
  const [ordenador, setOrdenador] = useState(currentTicket?.Ordenador || "");
  const [descripcion, setDescripcion] = useState(
    currentTicket?.Descripcion || ""
  );
  const [alumno, setAlumno] = useState(currentTicket?.Alumno || "");

  useEffect(() => {
    if (currentTicket) {
      setCodigo(currentTicket.Codigo);
      setFecha(currentTicket.Fecha);
      setAula(currentTicket.Aula);
      setGrupo(currentTicket.Grupo);
      setOrdenador(currentTicket.Ordenador);
      setDescripcion(currentTicket.Descripcion);
      setAlumno(currentTicket.Alumno);
    }
  }, [currentTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTicket = {
      Codigo: codigo,
      Fecha: fecha,
      Aula: aula,
      Grupo: grupo,
      Ordenador: ordenador,
      Descripcion: descripcion,
      Alumno: alumno,
      Estado: currentTicket ? currentTicket.Estado : "Pendiente",
      fechaResuelto: currentTicket ? currentTicket.fechaResuelto : "",
      comentarios: currentTicket ? currentTicket.comentarios : [],
    };

    let updatedTickets;
    if (currentTicket) {
      updatedTickets = tickets.map((ticket) =>
        ticket.Codigo === currentTicket.Codigo ? updatedTicket : ticket
      );
    } else {
      updatedTickets = [...tickets, updatedTicket];
    }

    setDadesTiquets(updatedTickets);
    onAddTicket(updatedTickets);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {currentTicket ? "Editar Ticket" : "Nuevo Ticket"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCodigo">
            <Form.Label>Código</Form.Label>
            <Form.Control type="number" value={codigo} disabled />
          </Form.Group>

          <Form.Group controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAula">
            <Form.Label>Aula</Form.Label>
            <Form.Control
              type="text"
              value={aula}
              onChange={(e) => setAula(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGrupo">
            <Form.Label>Grupo</Form.Label>
            <Form.Control
              type="text"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formOrdenador">
            <Form.Label>Ordenador</Form.Label>
            <Form.Control
              type="text"
              value={ordenador}
              onChange={(e) => setOrdenador(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAlumno">
            <Form.Label>Alumno</Form.Label>
            <Form.Control
              type="text"
              value={alumno}
              onChange={(e) => setAlumno(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {currentTicket ? "Actualizar Ticket" : "Guardar Ticket"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Tiquet;
