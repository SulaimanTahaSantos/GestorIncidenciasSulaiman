let dades_tiquets = [
    {Codigo: 1, Fecha: "2021-01-01", Aula: "T6", Grupo: "DAW1", Ordenador: "PC3", Descripcion: "Error de impresora", Alumno: "Ana Martínez", Estado: "Pendiente", fechaResuelto: ""},
    {Codigo: 2, Fecha: "2021-01-02", Aula: "T7", Grupo: "DAW2", Ordenador: "PC4", Descripcion: "Pantalla azul", Alumno: "Luis García", Estado: "Resuelto", fechaResuelto: ""},
    {Codigo: 3, Fecha: "2021-01-03", Aula: "T8", Grupo: "SMX1", Ordenador: "PC5", Descripcion: "Teclado no funciona", Alumno: "María López", Estado: "Pendiente", fechaResuelto: ""},
    {Codigo: 4, Fecha: "2021-01-04", Aula: "T9", Grupo: "SMX2", Ordenador: "PC6", Descripcion: "Ratón no funciona", Alumno: "Carlos Pérez", Estado: "Resuelto", fechaResuelto: ""},
    {Codigo: 5, Fecha: "2021-01-05", Aula: "T10", Grupo: "ARI1", Ordenador: "PC7", Descripcion: "No hay conexión a internet", Alumno: "Laura Sánchez", Estado: "Pendiente", fechaResuelto: ""},
]

if(localStorage.getItem("dades_tiquets") === true) {
    localStorage.setItem("dades_tiquets", JSON.stringify(dades_tiquets));
}

let dades_usuaris = [
    {Nombre: "Ana", Apellido: "Martínez", Email: "ana.martinez@gmail.com", Contrasena: "password123", Rol: "Alumno"},
    {Nombre: "Luis", Apellido: "García", Email: "luis.garcia@outlook.com", Contrasena: "password456", Rol: "Alumno"},
    {Nombre: "María", Apellido: "López", Email: "maria.lopez@outlook.es", Contrasena: "password789", Rol: "Alumno"},
    {Nombre: "Carlos", Apellido: "Pérez", Email: "carlos.perez@gmail.com", Contrasena: "password101", Rol: "Alumno"},
    {Nombre: "Laura", Apellido: "Sánchez", Email: "laura.sanchez@gmail.com", Contrasena: "password102", Rol: "Alumno"}
]

if(localStorage.getItem("dades_usuaris") === true) {
    localStorage.setItem("dades_usuaris", JSON.stringify(dades_usuaris));
}

export {dades_tiquets, dades_usuaris};
