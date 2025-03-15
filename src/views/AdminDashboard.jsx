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
import supabase from "../config/config"; // Asegúrate de importar supabase

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("dades_usuaris").select();
    if (error) {
      console.error("Error obteniendo usuarios:", error);
    } else {
      setUsers(data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
    } else {
      const updatedUsers = users.map((user) =>
        user.id === id ? { ...user, rol: newRole } : user
      );
      setUsers(updatedUsers);
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
