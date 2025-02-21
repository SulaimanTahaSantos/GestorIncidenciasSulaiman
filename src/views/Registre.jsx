import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registre = () => {
  const [user, setUser] = useState({
    Nombre: '',
    Apellido: '',
    Email: '',
    Contrasena: '',
    Rol: 'Alumno'
  });
  const [snackbar, setSnackBar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const nuevaListaDeUsuarios = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
  
    if (user.Nombre && user.Apellido && user.Email && user.Contrasena) {
      nuevaListaDeUsuarios.push(user);
  
      localStorage.setItem('dades_usuaris', JSON.stringify(nuevaListaDeUsuarios));
  
      console.log(nuevaListaDeUsuarios);
      console.log(user);
  
      setSnackbarMessage('Usuario registrado exitosamente');
      setSnackbarType('success'); 
    } else {
      setSnackbarMessage('Faltan datos para completar el registro');
      setSnackbarType('danger'); 
    }
  
    setUser({
      Nombre: '',
      Apellido: '',
      Email: '',
      Contrasena: '',
      Rol: 'Alumno'
    });
  
    setSnackBar(true); 
  
    setTimeout(() => {
      setSnackBar(false);
    }, 3000); 
  };
  

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Registro</h1>
          <form onSubmit={handleSubmit} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
            <label htmlFor="email" className="mt-2 form-label">Email: </label>
            <input
              type="email"
              name="Email"
              className="form-control"
              placeholder="usuario@mail.com"
              value={user.Email}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="nombre" className="mt-2 form-label">Nombre: </label>
            <input
              type="text"
              name="Nombre"
              className="form-control"
              placeholder="Nombre"
              value={user.Nombre}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="apellido" className="mt-2 form-label">Apellido: </label>
            <input
              type="text"
              name="Apellido"
              className="form-control"
              placeholder="Apellido"
              value={user.Apellido}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="contrasena" className="mt-2 form-label">Contraseña: </label>
            <input
              type="password"
              name="Contrasena"
              className="form-control"
              value={user.Contrasena}
              onChange={handleInputChange}
              required
            />
            <button type="submit" className="mt-4 w-100 btn btn-primary">Registrar</button>
            <div className='mt-2'>
            <a className='text-decoration-none' href="/">Si ya tienes cuenta, inicia sesion</a>

            </div>
          </form>
        </div>
      </main>

      {snackbar && (
        <div className="toast-container position-fixed top-0 start-50 translate-middle-x p-3">
          <div className={`toast show bg-${snackbarType}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">{snackbarType === 'success' ? 'Éxito' : 'Error'}</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={() => setSnackBar(false)}></button>
            </div>
            <div className="toast-body">
              {snackbarMessage}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Registre;
