let bienvenida;

// DOM de inicio
document.addEventListener("DOMContentLoaded", function () {

    let usuario;
    let usuarioEnLS = JSON.parse(localStorage.getItem('usuario'))
    
    usuario = usuarioEnLS ? usuarioEnLS : null;

    if (usuarioEnLS) {
        usuario = usuarioEnLS
        inicializarBotones(usuario)
    } else {
        inicializar()
    }

    function inicializar() {
        const contenedorB = document.getElementById('contenedorB');

        const divB = document.createElement('div');
        divB.id = 'divB';

        const mensajeB = document.createElement('h3');
        mensajeB.innerText = 'Te damos la bienvenida al portal de Casa del Sur, por favor ingresa tu n° de alumna/o'; 

        const InputB = document.createElement('input');
        InputB.type = 'number';
        InputB.id = 'bienvenida-input';

        const botonB = document.createElement('button');
        botonB.innerText = 'Ingresar';
        botonB.addEventListener('click', function () {
            bienvenida = parseInt(document.getElementById('bienvenida-input').value);
            corroborarAlumno(bienvenida);
        });


        divB.appendChild(mensajeB);
        divB.appendChild(InputB);
        divB.appendChild(botonB);
        contenedorB.appendChild(divB);
    }
});
// local de inicio
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, JSON.stringify(valor)) };
const guardarSession = (clave, valor) => { sessionStorage.setItem(clave, JSON.stringify(valor)) };

const carrito = JSON.parse(localStorage.getItem('carrito')) ?? []; 
function guardarCarritoEnLocalStorage(carrito) {
    guardarLocal("carrito", carrito.map(curso => curso.id)); 
}

/* Cursos  -------------------------------------------------*/
class claseCursos {
    constructor(id, nombre, valor, cupo, virtual) {
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
        this.cupo = cupo;
        this.virtual = virtual;
    }
}
const curso1 = new claseCursos(1, "arte", 75000, 20, false);
const curso2 = new claseCursos(2, "historia", 65000, 10, false);
const curso3 = new claseCursos(3, "ingles", 15000, 8, true);
const curso4 = new claseCursos(4, "matematicas", 60000, 5, false);
const curso5 = new claseCursos(5, "ciencias", 65000, 10, true);

const arrayCursos = [curso1, curso2, curso3, curso4, curso5];

/* Alumnos -------------------------------------------------*/
class claseAlumnos {
    constructor(id, nombre, apellido) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.curso = [];
    }
    agregarCursos(curso) {

        this.curso.push(curso);
        reducirCupo(curso);
        guardarCarritoEnLocalStorage(this.curso); 

    }
    quitarCursos(idCurso) {
        const index = this.curso.findIndex(curso => curso.id === idCurso);
        if (index !== -1) {
            const cursoEliminado = this.curso[index];
            this.curso.splice(index, 1);
            aumentarCupo(cursoEliminado)
            guardarCarritoEnLocalStorage(this.curso)
        } else {
            console.log(`Curso con ID ${idCurso} no encontrado.`);
        }
    }
}
const alumno1 = new claseAlumnos(1001, "marina", "caceres");
const alumno2 = new claseAlumnos(1002, "pedro", "perez");
const alumno3 = new claseAlumnos(1003, "maria", "lopez");
const alumno4 = new claseAlumnos(1004, "justina", "estrada");
const alumno5 = new claseAlumnos(1005, "gerarda", "levi");
const alumno6 = new claseAlumnos(1006, "sasha", "suarez");
const alumno7 = new claseAlumnos(1007, "nicolas", "moyano");
const alumno8 = new claseAlumnos(1008, "killa", "aracuyu");

const arrayAlumnos = [alumno1, alumno2, alumno3, alumno4, alumno5, alumno6, alumno7, alumno8];

/* Menu -------------------------------------------------*/
const contenedorContenido = document.getElementById('contenido');

function mostrarAlumno(a) {
    contenedorContenido.innerHTML = '';

    const divMostrarAlum = document.createElement('div');
    divMostrarAlum.id = 'divMostrarAlum';

    const mostrarH4 = document.createElement('h4');
    mostrarH4.id = 'mostrarH4';
    mostrarH4.innerText = 'Mi Perfil';

    const mostrarP = document.createElement('p');
    mostrarP.id = 'mostrarP';
    mostrarP.innerText = `Código: ${a.id} \nNombre: ${a.nombre} \nApellido: ${a.apellido}`;


    contenedorContenido.appendChild(divMostrarAlum);
    divMostrarAlum.appendChild(mostrarH4);
    divMostrarAlum.appendChild(mostrarP);
}

function reducirCupo(e) {
    e.cupo--;
}
function aumentarCupo(e) {
    e.cupo++;
}

function mostrarCursos(a) {
    contenedorContenido.innerHTML = '';

    const divMostrarCursos = document.createElement('div');
    divMostrarCursos.id = 'divMostrarCursos';
    const mostrarH4 = document.createElement('h4');
    mostrarH4.id = 'mostrarH4';
    mostrarH4.innerText = 'Nuestros Cursos';
    const mostrarDiv = document.createElement('div');
    mostrarDiv.id = 'mostrardiv';

    arrayCursos.forEach(curso => {
        let cursoDiv = document.createElement('div');
        cursoDiv.innerHTML += `Codigo: ${curso.id}. ${curso.nombre} - $${curso.valor} - Cupo: ${curso.cupo} \n`;
        mostrarDiv.appendChild(cursoDiv);
    });

    contenedorContenido.appendChild(divMostrarCursos);
    divMostrarCursos.appendChild(mostrarH4);
    divMostrarCursos.appendChild(mostrarDiv);
}

function tomarCursos(a) {
    contenedorContenido.innerHTML = '';

    const tomarH4 = document.createElement('h4');
    tomarH4.id = 'tomarH4';
    tomarH4.innerText = 'Cursos Disponibles';

    const divTomarCursos = document.createElement('div');
    divTomarCursos.id = 'divTomarCursos';

    const arrayCursosAlumno = a.curso.map(c => c.id)
    const arrayCursosDisponibles = arrayCursos.filter(curso => !arrayCursosAlumno.includes(curso.id));


    if (arrayCursosDisponibles.length === 0) {
        let vacioP = document.createElement('p');
        vacioP.id = 'mensajeVacio';
        vacioP.innerText = 'No hay cursos disponibles para agregar';
        divTomarCursos.appendChild(vacioP);
    } else {
        arrayCursosDisponibles.forEach(curso => {
            let cursoDiv = document.createElement('div');
            cursoDiv.innerHTML = `Codigo: ${curso.id}. ${curso.nombre} - $${curso.valor} - Cupo: ${curso.cupo} \n`;

            let botonTomar = document.createElement('button');
            botonTomar.innerText = 'Agregar';
            botonTomar.addEventListener('click', () => {
                a.agregarCursos(curso);
                tomarCursos(a);
                sacarCursos(a);
                alert("Curso de " + curso.nombre + " agregado con exito");
            });

            cursoDiv.appendChild(botonTomar);
            divTomarCursos.appendChild(cursoDiv);
        });
    }
    contenedorContenido.appendChild(tomarH4);
    contenedorContenido.appendChild(divTomarCursos);
}

function sacarCursos(a) {
    contenedorContenido.innerHTML = '';

    const sacarH4 = document.createElement('h4');
    sacarH4.id = 'sacarH4';
    sacarH4.innerText = 'Cursos Agregados';

    const divSacarCursos = document.createElement('div');
    divSacarCursos.id = 'divSacarCursos';

    const cursosAgregados = a.curso;

    if (cursosAgregados.length !== 0) {
        cursosAgregados.forEach(curso => {
            let cursoDiv = document.createElement('div');
            cursoDiv.innerHTML = `Codigo: ${curso.id}. ${curso.nombre} - $${curso.valor} - Cupo: ${curso.cupo} \n`;

            let botonQuitar = document.createElement('button');
            botonQuitar.innerText = 'Remover';
            botonQuitar.addEventListener('click', () => {
                a.quitarCursos(curso.id);
                tomarCursos(a);
                sacarCursos(a);
                alert("Curso de " + curso.nombre + " removido con exito");
            });

            cursoDiv.appendChild(botonQuitar);
            divSacarCursos.appendChild(cursoDiv);
        });
    } else {
        let vacioP = document.createElement('p');
        vacioP.id = 'mensajeVacio';
        vacioP.innerText = 'No hay cursos disponibles para quitar';
        divSacarCursos.appendChild(vacioP);
    }
    contenedorContenido.appendChild(sacarH4);
    contenedorContenido.appendChild(divSacarCursos);
}


function verCarrito(a) {
    contenedorContenido.innerHTML = '';

    const verH4 = document.createElement('h4');
    verH4.id = 'verH4';
    verH4.innerText = 'Mi Carrito';

    const divVerCarrito = document.createElement('div');
    divVerCarrito.id = 'divVerCarrito';

    const cursosAgregados = a.curso;

    if (cursosAgregados.length !== 0) {
        const total = cursosAgregados.reduce((acumulador, curso) => acumulador + curso.valor, 0);

        cursosAgregados.forEach(curso => {
            const mensajeCarro = document.createElement('div');
            mensajeCarro.innerHTML = `Codigo: ${curso.id}. ${curso.nombre} - $${curso.valor} \n`;
            divVerCarrito.appendChild(mensajeCarro);
        });

        const divTotalCarrito = document.createElement('div');
        divTotalCarrito.id = 'divTotalCarrito';
        divTotalCarrito.innerText = `Total: $${total}`;
        divVerCarrito.appendChild(divTotalCarrito);
    } else {
        let vacioP = document.createElement('p');
        vacioP.id = 'mensajeVacio';
        vacioP.innerText = 'Carrito Vacío';
        divVerCarrito.appendChild(vacioP);
    }

    contenedorContenido.appendChild(verH4);
    contenedorContenido.appendChild(divVerCarrito);

}

function cerrarSesion() {
    localStorage.clear();
    window.location.reload();
}

function inicializarBotones(a) {
    let contenedorMenu = document.getElementById("contenedorMenu");
    let menu = document.createElement("h5");
    menu.innerHTML = "Menu";

    if (!contenedorMenu || contenedorMenu.children.length > 0) return;

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        a.curso = carritoGuardado.map(idCurso => arrayCursos.find(curso => curso.id === idCurso));
    }

    let verPerfilBoton = document.createElement("button");
    verPerfilBoton.innerText = "Ver perfil";
    verPerfilBoton.id = "verPerfilBoton";
    verPerfilBoton.addEventListener("click", respuestaClick1)
    function respuestaClick1() {
        mostrarAlumno(a)
    }

    let verOfertaBoton = document.createElement("button");
    verOfertaBoton.innerText = "Ver oferta de cursos";
    verOfertaBoton.id = "verOfertaBoton";
    verOfertaBoton.addEventListener("click", respuestaClick2)
    function respuestaClick2() {
        mostrarCursos(a)
    }

    let agregarCursoBoton = document.createElement("button");
    agregarCursoBoton.innerText = "Agregar curso a mi carrito";
    agregarCursoBoton.id = "agregarCursoBoton";
    agregarCursoBoton.addEventListener("click", respuestaClick3)
    function respuestaClick3() {
        tomarCursos(a)
    }

    let sacarCursoBoton = document.createElement("button");
    sacarCursoBoton.innerText = "Sacar curso de mi carrito";
    sacarCursoBoton.id = "sacarCursoBoton";
    sacarCursoBoton.addEventListener("click", respuestaClick4)
    function respuestaClick4() {
        sacarCursos(a)
    }

    let verCarritoBoton = document.createElement("button");
    verCarritoBoton.innerText = "Ver carrito";
    verCarritoBoton.id = "verCarritoBoton";
    verCarritoBoton.addEventListener("click", respuestaClick5)
    function respuestaClick5() {
        verCarrito(a)
    }

    let salirBoton = document.createElement("button");
    salirBoton.innerText = "Cerrar Sesión";
    salirBoton.id = "salirBoton";
    salirBoton.addEventListener("click", respuestaClick6)
    function respuestaClick6() {
        cerrarSesion(a)
    }

    contenedorMenu.appendChild(menu);
    contenedorMenu.appendChild(verPerfilBoton);
    contenedorMenu.appendChild(verOfertaBoton);
    contenedorMenu.appendChild(agregarCursoBoton);
    contenedorMenu.appendChild(sacarCursoBoton);
    contenedorMenu.appendChild(verCarritoBoton);
    contenedorMenu.appendChild(salirBoton);
}


function mostrarMenu(a) {
    inicializarBotones(a); // podria puentear esta funcion pero la voy a dejar para seguir probando la app
}

function corroborarAlumno(m) {
    const alumnoExiste = arrayAlumnos.some(alumno => alumno.id === m);
    if (alumnoExiste) {
        const alumno = arrayAlumnos.find(alumno => alumno.id === m);
        guardarLocal("usuario", alumno);

        let divB = document.getElementById('divB');
        if (divB) {
            divB.remove();
        }
        let pErrorYaExiste = document.getElementById("perrorBienvenida");
        if (pErrorYaExiste) {
            pErrorYaExiste.remove();
        }

        const contenedorB = document.getElementById('contenedorB');
        const saludoAlumno = document.createElement('h3');
        saludoAlumno.id = 'saludoAlumno';
        saludoAlumno.innerText = `Hola, ${alumno.nombre}! Bienvenido/a al portal de Casa del Sur`;
        contenedorB.appendChild(saludoAlumno);

        mostrarMenu(alumno);

    } else {
        let pErrorYaExiste = document.getElementById("perrorBienvenida");
        if (pErrorYaExiste) {
            pErrorYaExiste.remove();
        }
        let contenedorError = document.getElementById("error");
        let pError = document.createElement("p");
        pError.id = "perrorBienvenida";
        pError.innerText = "No ingresaste un id válido, vuelve a intentarlo";
        contenedorError.appendChild(pError);
    }
}