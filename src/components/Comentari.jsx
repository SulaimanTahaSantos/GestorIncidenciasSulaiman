import React, { useState } from "react";

function Comentari({ onComentarioSubmit, comentarios = [], idTicket }) {
  const [comentario, setComentario] = useState("");
  const [fecha, setFecha] = useState("");

  const handleComentarioChange = (e) => {
    setComentario(e.target.value);
  };

  const handleFechaChange = (e) => {
    setFecha(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onComentarioSubmit(comentario, fecha);
    setComentario("");
    setFecha("");
  };

  console.log(comentarios);

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="form card p-3 shadow">
        <label htmlFor="comentario" className="form-label">
          Comentario:
        </label>
        <textarea
          id="comentario"
          className="form-control"
          cols="3"
          value={comentario}
          onChange={handleComentarioChange}
        ></textarea>

        <label htmlFor="fecha" className="form-label me-2 mt-3">
          Fecha:
        </label>
        <div className="d-flex align-items-center">
          <input
            type="date"
            className="form-control w-50"
            value={fecha}
            onChange={handleFechaChange}
          />
          <button className="btn btn-success ms-auto">Añadir comentario</button>
        </div>
      </form>

      <div className="mt-4">
        {comentarios.length === 0 ? (
          <p>No hay comentarios disponibles.</p>
        ) : (
          comentarios.map((coment, index) => (
            <div className="card p-3 mt-2" key={index}>
              <h5 className="text-end">
                Autor:{" "}
                <span>
                  {coment.nombre} {coment.apellido}
                </span>
                <span className="ms-4">{coment.fecha}</span>
              </h5>
              <p>{coment.comentari}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Comentari;
