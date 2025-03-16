import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Navbar,
  Table,
  Form,
} from "react-bootstrap";
import { getDadesUsuaris, setDadesUsuaris } from "../database/gestionTickets";
import Header from "../components/Header";
import supabase from "../config/config";
import "../styles.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("dades_usuaris").select();
    if (error) {
      console.error("Error obteniendo usuarios:", error);
    } else {
      const sortedUsers = data.sort((a, b) => {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;

        return a.id - b.id;
      });
      setUsers(sortedUsers);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (snackbar) {
      const timer = setTimeout(() => {
        setSnackbar(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [snackbar]);

  const handleRoleChange = async (id, newRole) => {
    const { data, error } = await supabase
      .from("dades_usuaris")
      .update({ rol: newRole })
      .eq("id", id)
      .select();

    if (!data) {
      console.log("Error al obtener el usuario:", error);
    }

    if (error) {
      console.error("Error actualizando el rol:", error);
      setSnackbarMessage("Error actualizando el rol.");
      setSnackbarType("danger");
      setSnackbar(true);
    } else {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, rol: newRole } : user
      );
      setUsers(updatedUsers);

      setSnackbarMessage("Rol actualizado exitosamente.");
      setSnackbarType("success");
      setSnackbar(true);
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div style={{ marginLeft: "220px", padding: "20px", width: "100%" }}>
          <h1>Administració d’Usuaris</h1>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <Form.Select
                      value={user.rol}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option value="Admin">Admin</option>
                      <option value="Alumno">Alumno</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
