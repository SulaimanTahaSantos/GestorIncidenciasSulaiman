import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import supabase from "../config/config";

const RememberPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    // Llamar al método de Supabase para enviar el correo de recuperación
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Revisa tu correo para restablecer la contraseña.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Recuperar Contraseña</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Button variant="primary" type="submit">
          Enviar Correo
        </Button>
      </Form>
    </div>
  );
};

export default RememberPassword;
