import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import supabase from "../config/config";
import "../styles.css";

const Tiquet = ({ show, handleClose, onAddTicket, currentTicket }) => {
  const [tickets, setTickets] = useState([]);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

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

  const [fecha, setFecha] = useState(currentTicket?.fecha || "");
  const [aula, setAula] = useState(currentTicket?.aula || "");
  const [grupo, setGrupo] = useState(currentTicket?.grupo || "");
  const [ordenador, setOrdenador] = useState(currentTicket?.ordenador || "");
  const [descripcion, setDescripcion] = useState(
    currentTicket?.descripcion || ""
  );
  const [alumno, setAlumno] = useState(currentTicket?.alumno || "");

  useEffect(() => {
    if (currentTicket) {
      setFecha(currentTicket.fecha || "");
      setAula(currentTicket.aula || "");
      setGrupo(currentTicket.grupo || "");
      setOrdenador(currentTicket.ordenador || "");
      setDescripcion(currentTicket.descripcion || "");
      setAlumno(currentTicket.alumno || "");
    }
  }, [currentTicket]);

  const insertTicket = async (ticket) => {
    const { data, error } = await supabase
      .from("dades_tiquets")
      .insert([
        {
          fecha: ticket.fecha,
          aula: ticket.aula,
          grupo: ticket.grupo,
          ordenador: ticket.ordenador,
          descripcion: ticket.descripcion,
          alumno: ticket.alumno,
          estado: "Pendiente",
          fecha_resuelto: null,
        },
      ])
      .select()
      .single();

    if (error) {
      setSnackbarMessage(`Error insertando ticket: ${error.message}`);
      setSnackbarType("danger");
      setSnackbar(true);
      return null;
    }

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTicket = {
      fecha,
      aula,
      grupo,
      ordenador,
      descripcion,
      alumno,
    };

    let updatedTickets;

    if (currentTicket) {
      const { data, error } = await supabase
        .from("dades_tiquets")
        .update(updatedTicket)
        .eq("id", currentTicket.id)
        .select()
        .single();

      if (error) {
        setSnackbarMessage(`Error actualizando ticket: ${error.message}`);
        setSnackbarType("danger");
        setSnackbar(true);
        return;
      }

      updatedTickets = tickets.map((ticket) =>
        ticket.id === currentTicket.id ? data : ticket
      );

      setSnackbarMessage("Ticket actualizado exitosamente");
      setSnackbarType("success");
      setSnackbar(true);
    } else {
      const insertedTicket = await insertTicket(updatedTicket);
      if (insertedTicket) {
        updatedTickets = [...tickets, insertedTicket];
        setSnackbarMessage("Ticket guardado exitosamente");
        setSnackbarType("success");
        setSnackbar(true);
      }
    }

    setTickets(updatedTickets);
    onAddTicket(updatedTickets);
    handleClose();

    setFecha("");
    setAula("");
    setGrupo("");
    setOrdenador("");
    setDescripcion("");
    setAlumno("");
  };

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentTicket ? "Editar Ticket" : "Nuevo Ticket"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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

            <Button className="mt-4" variant="primary" type="submit">
              {currentTicket ? "Actualizar Ticket" : "Guardar Ticket"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {snackbar && (
        <div
          className={`toast-container position-fixed top-0 start-50 translate-middle-x p-3 fadeInUp`}
        >
          <div
            className={`toast show bg-${snackbarType} text-white rounded-3 shadow-lg`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ animation: "slideIn 0.5s ease-out" }}
          >
            <div className="toast-header">
              <strong className="me-auto">
                {snackbarType === "success" ? "Éxito" : "Error"}
              </strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
                onClick={() => setSnackbar(false)}
              ></button>
            </div>
            <div className="toast-body">{snackbarMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tiquet;
