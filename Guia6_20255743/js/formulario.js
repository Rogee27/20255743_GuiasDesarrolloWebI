
// Accediendo a los elementos HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");
const tablaPacientes = document.getElementById("idTablaPacientes");

// Arreglo global de pacientes
let arrayPaciente = [];

// Variable para saber si estamos editando un paciente
let indiceEditar = -1;

// Recuperamos los datos almacenados en LocalStorage
const datosGuardados = JSON.parse(
    localStorage.getItem("pacientes") || "[]"
);

if (Array.isArray(datosGuardados)) {
    arrayPaciente = datosGuardados;
}

// Recuperamos los paises agregados
const paisesGuardados = JSON.parse(
    localStorage.getItem("paises") || "[]"
);

paisesGuardados.forEach((pais) => {
    agregarOpcionPais(pais);
});

// Funcion para guardar los pacientes en LocalStorage
const guardarLocalStorage = () => {
    localStorage.setItem("pacientes", JSON.stringify(arrayPaciente));
};

// Funcion para guardar los paises en LocalStorage
const guardarPaises = () => {
    let paises = [];

    for (let i = 8; i < cmbPais.options.length; i++) {
        paises.push(cmbPais.options[i].text);
    }

    localStorage.setItem("paises", JSON.stringify(paises));
};

// Funcion para mostrar notificaciones
const mostrarNotificacion = (texto) => {
    mensaje.textContent = texto;
    toast.show();
};

// Funcion para limpiar el formulario
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    indiceEditar = -1;
    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-person-plus-fill"></i> Guardar Datos';

    inputNombre.focus();
};

// Funcion para agregar o actualizar pacientes
const addPaciente = function () {
    let nombre = inputNombre.value.trim();
    let apellido = inputApellido.value.trim();
    let fechaNacimiento = inputFechaNacimiento.value;

    let sexo = inputRdMasculino.checked
        ? "Hombre"
        : inputRdFemenino.checked
        ? "Mujer"
        : "";

    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value.trim();

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        let paciente = new Array(
            nombre,
            apellido,
            fechaNacimiento,
            sexo,
            labelPais,
            direccion
        );

        if (indiceEditar == -1) {
            // Agregando un nuevo paciente
            arrayPaciente.push(paciente);
            mostrarNotificacion("Se ha registrado un nuevo paciente");
        } else {
            // Actualizando el paciente seleccionado
            arrayPaciente[indiceEditar] = paciente;
            mostrarNotificacion("Paciente actualizado correctamente");
        }

        // Guardamos los cambios en LocalStorage
        guardarLocalStorage();

        // Actualizamos la tabla
        imprimirPacientes();

        // Limpiamos el formulario
        limpiarForm();
    } else {
        mostrarNotificacion("Faltan campos por completar");
    }
};

// EJERCICIO 1: Funcion para editar un paciente
function editarPaciente(indice) {
    let paciente = arrayPaciente[indice];

    if (!paciente) return;

    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];

    inputRdMasculino.checked = paciente[3] == "Hombre";
    inputRdFemenino.checked = paciente[3] == "Mujer";

    // Seleccionamos el pais del paciente
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text == paciente[4]) {
            cmbPais.selectedIndex = i;
            break;
        }
    }

    inputDireccion.value = paciente[5];

    // Guardamos la posicion que se esta editando
    indiceEditar = indice;

    buttonAgregarPaciente.innerHTML =
        '<i class="bi bi-pencil-square"></i> Actualizar Datos';

    inputNombre.focus();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// EJERCICIO 1: Funcion para eliminar un paciente
function eliminarPaciente(indice) {
    let confirmar = confirm("¿Desea eliminar este paciente?");

    if (confirmar) {
        // Eliminamos el paciente del arreglo
        arrayPaciente.splice(indice, 1);

        // Actualizamos LocalStorage
        guardarLocalStorage();

        // Mostramos nuevamente la tabla
        imprimirPacientes();

        limpiarForm();
        mostrarNotificacion("Paciente eliminado correctamente");
    }
}

// Funcion que imprime las filas de pacientes
function imprimirFilas() {
    let filas = "";

    arrayPaciente.forEach((element, indice) => {
        filas += `<tr>
            <td class="text-center fw-bold">${indice + 1}</td>
            <td>${escaparHTML(element[0])}</td>
            <td>${escaparHTML(element[1])}</td>
            <td>${escaparHTML(element[2])}</td>
            <td>${escaparHTML(element[3])}</td>
            <td>${escaparHTML(element[4])}</td>
            <td>${escaparHTML(element[5])}</td>
            <td>
                <button type="button"
                    class="btn btn-primary"
                    onclick="editarPaciente(${indice})">
                    <i class="bi bi-pencil-square"></i>
                </button>

                <button type="button"
                    class="btn btn-danger"
                    onclick="eliminarPaciente(${indice})">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
    });

    return filas;
}

// Evitamos interpretar los datos del paciente como HTML
function escaparHTML(valor) {
    return String(valor)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

// Funcion para mostrar la tabla de pacientes
const imprimirPacientes = () => {
    if (arrayPaciente.length == 0) {
        tablaPacientes.textContent = "Ninguno";
        return;
    }

    let tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha nacimiento</th>
                    <th>Sexo</th>
                    <th>Pais</th>
                    <th>Direccion</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                ${imprimirFilas()}
            </tbody>
        </table>
    </div>`;

    tablaPacientes.innerHTML = tabla;
};

// Funcion para crear una opcion del select
function agregarOpcionPais(pais) {
    let option = document.createElement("option");
    option.textContent = pais;
    option.value = cmbPais.options.length;

    cmbPais.appendChild(option);
}

// Funcion para agregar paises
const addPais = () => {
    let paisNew = inputNombrePais.value.trim();

    if (paisNew != "") {
        agregarOpcionPais(paisNew);

        // Guardamos el nuevo pais
        guardarPaises();

        mostrarNotificacion("Pais agregado correctamente");
        inputNombrePais.value = "";
    } else {
        mostrarNotificacion("Faltan campos por completar");
    }
};

// Eventos de los botones
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Focus del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Evitamos que el formulario recargue la pagina
document.getElementById("idForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

// Ejecutar funciones al cargar la pagina
limpiarForm();
imprimirPacientes();
