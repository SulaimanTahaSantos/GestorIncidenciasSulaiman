import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Cambiar useHistory por useNavigate
import { Button, Form, Alert } from "react-bootstrap";
import supabase from "../config/config";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Cambiar de history a navigate

  // Obtener el token de la URL
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setError("No se proporcionó un token de restablecimiento.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    // Verificar y restablecer la contraseña usando el token
    const { error } = await supabase.auth.api.updateUser(token, {
      password: newPassword,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage("Tu contraseña ha sido restablecida exitosamente.");
      // Redirigir a la página de inicio de sesión después del éxito
      setTimeout(() => {
        navigate("/"); // Redirigir a la página de inicio de sesión
      }, 2000);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Restablecer Contraseña</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Restableciendo..." : "Restablecer Contraseña"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
