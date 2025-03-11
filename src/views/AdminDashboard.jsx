import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Nav, Navbar, Table, Form } from 'react-bootstrap';
import { getDadesUsuaris, setDadesUsuaris } from '../database/gestionTickets';
import Header from '../components/Header';

const AdminDashboard = () => {
    const [users, setUsers] = useState(getDadesUsuaris());

    const handleRoleChange = (Email, newRole) => {
        const updatedUsers = users.map(user =>
            user.Email === Email ? { ...user, Rol: newRole } : user
        );
        
        setUsers(updatedUsers);
        
        setDadesUsuaris(updatedUsers);
    };

    return (
        <div>
          <Header />

            <div className="d-flex">
                <div style={{ marginLeft: '220px', padding: '20px', width: '100%' }}>
                    <h1>Administració d’Usuaris</h1>
                    <Table striped bordered hover className="mt-4">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Contraseña</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.Email}>
                                    <td>{user.Nombre}</td>
                                    <td>{user.Apellido}</td>
                                    <td>{user.Email}</td>
                                    <td>{user.Contrasena}</td>
                                    <td>
                                        <Form.Select 
                                            value={user.Rol} 
                                            onChange={(e) => handleRoleChange(user.Email, e.target.value)}
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
