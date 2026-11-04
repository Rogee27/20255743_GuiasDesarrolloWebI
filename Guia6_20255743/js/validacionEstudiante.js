
document.addEventListener("DOMContentLoaded", function () {

    // Accedemos a los elementos HTML
    const inputCarnet = document.getElementById("idCarnet");
    const inputNombre = document.getElementById("idNombre");
    const inputDui = document.getElementById("idDui");
    const inputNit = document.getElementById("idNit");
    const inputFecha = document.getElementById("idFecha");
    const inputCorreo = document.getElementById("idCorreo");
    const inputEdad = document.getElementById("idEdad");

    const btnValidar = document.getElementById("idBtnValidar");
    const btnLimpiar = document.getElementById("idBtnLimpiar");
    const resultado = document.getElementById("idResultado");

    // Definiendo las expresiones regulares

    // Dos letras y tres numeros
    const regexCarnet = /^[A-Za-z]{2}[0-9]{3}$/;

    // Nombre completo con letras y espacios
    const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/;

    // DUI: ocho numeros, guion y un numero
    const regexDui = /^[0-9]{8}-[0-9]{1}$/;

    // NIT: cuatro, seis, tres y un numero
    const regexNit = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;

    // Fecha de nacimiento: dia/mes/año
    const regexFecha = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;

    // Correo electronico
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Edad: solo numeros
    const regexEdad = /^[0-9]+$/;

    // Funcion para mostrar los errores
    const mostrarError = (campo, mensaje) => {
        campo.classList.add("is-invalid");
        campo.classList.remove("is-valid");

        let error = document.getElementById(
            "error" + campo.id.substring(2)
        );

        error.textContent = mensaje;
    };

    // Funcion para indicar que el campo es correcto
    const mostrarCorrecto = (campo) => {
        campo.classList.remove("is-invalid");
        campo.classList.add("is-valid");
    };

    // Funcion para verificar si la fecha existe
    const validarFechaReal = (fecha) => {
        if (!regexFecha.test(fecha)) {
            return false;
        }

        let partes = fecha.split("/");

        let dia = parseInt(partes[0], 10);
        let mes = parseInt(partes[1], 10);
        let anio = parseInt(partes[2], 10);

        let fechaIngresada = new Date(anio, mes - 1, dia);
        fechaIngresada.setFullYear(anio);

        let hoy = new Date();

        return (
            anio >= 1900 &&
            fechaIngresada.getFullYear() === anio &&
            fechaIngresada.getMonth() === mes - 1 &&
            fechaIngresada.getDate() === dia &&
            fechaIngresada <= hoy
        );
    };

    // Funcion para validar todos los datos
    function validarEstudiante() {

        let carnet = inputCarnet.value.trim();
        let nombre = inputNombre.value.trim();
        let dui = inputDui.value.trim();
        let nit = inputNit.value.trim();
        let fecha = inputFecha.value.trim();
        let correo = inputCorreo.value.trim();
        let edad = inputEdad.value.trim();

        // Variable para verificar el formulario
        let valido = true;

        // Validando carnet
        if (!regexCarnet.test(carnet)) {
            mostrarError(inputCarnet,
                "El carnet debe tener dos letras y tres numeros. Ejemplo: AB001");
            valido = false;
        } else {
            mostrarCorrecto(inputCarnet);
        }

        // Validando nombre completo
        if (!regexNombre.test(nombre)) {
            mostrarError(inputNombre,
                "Ingrese nombre y apellido utilizando solamente letras");
            valido = false;
        } else {
            mostrarCorrecto(inputNombre);
        }

        // Validando DUI
        if (!regexDui.test(dui)) {
            mostrarError(inputDui,
                "El DUI debe tener el formato 12345678-9");
            valido = false;
        } else {
            mostrarCorrecto(inputDui);
        }

        // Validando NIT
        if (!regexNit.test(nit)) {
            mostrarError(inputNit,
                "El NIT debe tener el formato 1234-123456-123-1");
            valido = false;
        } else {
            mostrarCorrecto(inputNit);
        }

        // Validando fecha de nacimiento
        if (!validarFechaReal(fecha)) {
            mostrarError(inputFecha,
                "Ingrese una fecha valida en formato DD/MM/AAAA");
            valido = false;
        } else {
            mostrarCorrecto(inputFecha);
        }

        // Validando correo
        if (!regexCorreo.test(correo)) {
            mostrarError(inputCorreo,
                "Ingrese un correo electronico valido");
            valido = false;
        } else {
            mostrarCorrecto(inputCorreo);
        }

        // Validando edad
        if (!regexEdad.test(edad) || parseInt(edad, 10) > 120) {
            mostrarError(inputEdad,
                "La edad debe contener solamente numeros entre 0 y 120");
            valido = false;
        } else {
            mostrarCorrecto(inputEdad);
        }

        // Mostrando el resultado de la validacion
        if (valido) {
            resultado.innerHTML = `
                <div class="alert alert-success">
                    <h5>Datos validados correctamente</h5>
                    <p>La informacion del estudiante cumple
                    con los formatos establecidos.</p>
                </div>
            `;
        } else {
            resultado.innerHTML = `
                <div class="alert alert-danger">
                    Existen campos incorrectos.
                    Revise los mensajes del formulario.
                </div>
            `;
        }
    }

    // Evento click para validar
    btnValidar.addEventListener("click", validarEstudiante);

    // Evento click para limpiar el formulario
    btnLimpiar.addEventListener("click", function () {

        resultado.innerHTML = "";

        const campos = document.querySelectorAll(".form-control");

        campos.forEach((campo) => {
            campo.classList.remove("is-valid", "is-invalid");
        });

        inputCarnet.focus();
    });

    // Validacion cuando el usuario sale de un campo
    const campos = [
        inputCarnet,
        inputNombre,
        inputDui,
        inputNit,
        inputFecha,
        inputCorreo,
        inputEdad
    ];

    campos.forEach((campo) => {
        campo.addEventListener("blur", function () {
            if (campo.value.trim() !== "") {
                validarEstudiante();
            }
        });
    });

});
