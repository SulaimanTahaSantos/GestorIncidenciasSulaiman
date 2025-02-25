import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Comentari({ show, handleClose, onSubmit }) {
  const [comentario, setComentario] = useState('');

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleSave = () => {
    if (comentario.trim()) {
      onSubmit(comentario);
      handleClose(); 
    } else {
      alert('Por favor ingrese un comentario.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Insertar Comentario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="comentario">Comentario</label>
            <textarea 
              className="form-control" 
              id="comentario" 
              name="comentario" 
              placeholder="Indica tu comentario para la incidencia"
              rows="3"
              value={comentario}
              onChange={handleComentarioChange}
            ></textarea>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Comentari;
