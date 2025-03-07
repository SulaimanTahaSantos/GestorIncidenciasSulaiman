import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IniciSessio = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logeado, setLogeado] = useState(false);
  const navigate = useNavigate();
  const [snackbar, setSnackBar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); 

  useEffect(() => {
    const updateUsers = () => {
      const users = JSON.parse(localStorage.getItem('dades_usuaris')) || [];
      if (users) {
        setLogeado(true); 
      }
    };

    updateUsers(); 

    window.addEventListener('storage', updateUsers);

    return () => {
      window.removeEventListener('storage', updateUsers);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('dades_usuaris'));  

    if (users) {
      const user = users.find(
        (user) => user.Email === email && user.Contrasena === password
      );
      if (user) {
        setLogeado(true);
        localStorage.setItem("userLogged", JSON.stringify(user));  
        localStorage.setItem("userEmail", user.Email);
        navigate("/panel");
      } else {
        setSnackbarMessage('Credenciales incorrectas');
        setSnackbarType('danger');
      }
    }
    setSnackBar(true);
    setTimeout(() => {
      setSnackBar(false);
    }, 3000);
  };

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Login</h1>
          <form onSubmit={handleSubmit} className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }}>
            <label htmlFor="email" className="mt-2 form-label">User: </label>
            <input
              type="text"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={handleInputChange}
              name="email"
            />
            <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleInputChange}
              name="password"
            />
            <input type="submit" className="mt-3 w-100 btn btn-primary" value="Entrar" id="enviar" />
            <div className='mt-2'>
              <a className='text-decoration-none' href="/Registre">Si no tienes cuenta registrate</a>
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

export default IniciSessio;
