import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getDadesTiquets, setDadesTiquets } from '../database/gestionTickets'; 

const Tiquet = ({ show, handleClose, onAddTicket }) => {
  const [tickets, setTickets] = useState(getDadesTiquets());

  const nextCodigo = tickets.length > 0 ? tickets[tickets.length - 1].Codigo + 1 : 6;

  const [codigo, setCodigo] = useState(nextCodigo);
  const [fecha, setFecha] = useState('');
  const [aula, setAula] = useState('');
  const [grupo, setGrupo] = useState('');
  const [ordenador, setOrdenador] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [alumno, setAlumno] = useState('');


  useEffect(() => {
    getDadesTiquets();
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTicket = {
      Codigo: codigo,
      Fecha: fecha,
      Aula: aula,
      Grupo: grupo,
      Ordenador: ordenador,
      Descripcion: descripcion,
      Alumno: alumno,
      Estado: "Pendiente",  
      fechaResuelto: "",
      comentarios: []
    };

    const updatedTickets = [...tickets, newTicket];
    setDadesTiquets(updatedTickets); 

    onAddTicket(updatedTickets);
  
    handleClose();
    setCodigo(nextCodigo);
    setFecha('');
    setAula('');
    setGrupo('');
    setOrdenador('');
    setDescripcion('');
    setAlumno('');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCodigo">
            <Form.Label>Código</Form.Label>
            <Form.Control type="number" value={codigo} disabled />
          </Form.Group>

          <Form.Group controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formAula">
            <Form.Label>Aula</Form.Label>
            <Form.Control type="text" value={aula} onChange={(e) => setAula(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formGrupo">
            <Form.Label>Grupo</Form.Label>
            <Form.Control type="text" value={grupo} onChange={(e) => setGrupo(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formOrdenador">
            <Form.Label>Ordenador</Form.Label>
            <Form.Control type="text" value={ordenador} onChange={(e) => setOrdenador(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formAlumno">
            <Form.Label>Alumno</Form.Label>
            <Form.Control type="text" value={alumno} onChange={(e) => setAlumno(e.target.value)} required />
          </Form.Group>

          <Button variant="primary" type="submit">
            Guardar Ticket
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Tiquet;