let dades_tiquets = [
    {Codigo: 1, Fecha: "2021-01-01", Aula: "T6", Grupo: "DAW1", Ordenador: "PC3", Descripcion: "Error de impresora", Alumno: "Ana Martínez", Estado: "Pendiente", fechaResuelto: "", comentarios: []},
    {Codigo: 2, Fecha: "2021-01-02", Aula: "T7", Grupo: "DAW2", Ordenador: "PC4", Descripcion: "Pantalla azul", Alumno: "Luis García", Estado: "Resuelto", fechaResuelto: "", comentarios: []},
    {Codigo: 3, Fecha: "2021-01-03", Aula: "T8", Grupo: "SMX1", Ordenador: "PC5", Descripcion: "Teclado no funciona", Alumno: "María López", Estado: "Pendiente", fechaResuelto: "", comentarios: []},
    {Codigo: 4, Fecha: "2021-01-04", Aula: "T9", Grupo: "SMX2", Ordenador: "PC6", Descripcion: "Ratón no funciona", Alumno: "Carlos Pérez", Estado: "Resuelto", fechaResuelto: "", comentarios: []},
    {Codigo: 5, Fecha: "2021-01-05", Aula: "T10", Grupo: "ARI1", Ordenador: "PC7", Descripcion: "No hay conexión a internet", Alumno: "Laura Sánchez", Estado: "Pendiente", fechaResuelto: "", comentarios: []},
];

if (!localStorage.getItem("dades_tiquets")) {
    localStorage.setItem("dades_tiquets", JSON.stringify(dades_tiquets));
}

let dades_usuaris = [
    {Nombre: "Ana", Apellido: "Martínez", Email: "ana.martinez@gmail.com", Contrasena: "password123", Rol: "Admin"},
    {Nombre: "Luis", Apellido: "García", Email: "luis.garcia@outlook.com", Contrasena: "password456", Rol: "Alumno"},
    {Nombre: "María", Apellido: "López", Email: "maria.lopez@outlook.es", Contrasena: "password789", Rol: "Alumno"},
    {Nombre: "Carlos", Apellido: "Pérez", Email: "carlos.perez@gmail.com", Contrasena: "password101", Rol: "Alumno"},
    {Nombre: "Laura", Apellido: "Sánchez", Email: "laura.sanchez@gmail.com", Contrasena: "password102", Rol: "Alumno"},
];

let dadesUsuarisStorage = JSON.parse(localStorage.getItem("dades_usuaris")) || [];

dades_usuaris.forEach(nuevoUsuario => {
    if (!dadesUsuarisStorage.some(user => user.Email === nuevoUsuario.Email)) {
        dadesUsuarisStorage.push(nuevoUsuario);
    }
});

localStorage.setItem("dades_usuaris", JSON.stringify(dadesUsuarisStorage));

function getDadesTiquets() {
    return JSON.parse(localStorage.getItem("dades_tiquets")) || [];
}

function setDadesTiquets(dades) {
    localStorage.setItem("dades_tiquets", JSON.stringify(dades));
}

function getDadesUsuaris() {
    return JSON.parse(localStorage.getItem("dades_usuaris")) || [];
}

function setDadesUsuaris(dades) {
    localStorage.setItem("dades_usuaris", JSON.stringify(dades));
}

export { dades_tiquets, dades_usuaris, getDadesTiquets, setDadesTiquets, getDadesUsuaris, setDadesUsuaris };
