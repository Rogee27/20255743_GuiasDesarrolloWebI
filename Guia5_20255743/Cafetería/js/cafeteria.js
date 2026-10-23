let pedidos = [];

const inputProducto = document.querySelector("#idProducto");
const inputPrecio = document.querySelector("#idPrecio");
const inputCantidad = document.querySelector("#idCantidad");
const btnAgregar = document.querySelector("#btnAgregar");

const inputPrecioMax = document.querySelector("#idPrecioMax");
const btnFiltrar = document.querySelector("#btnFiltrar");
const btnMostrar = document.querySelector("#btnMostrar");
const btnLimpiar = document.querySelector("#btnLimpiar");

const tbCuerpoPedidos = document.querySelector("#tbCuerpoPedidos");
const lblUnidades = document.querySelector("#lblUnidades");
const lblMonto = document.querySelector("#lblMonto");

function registrarPedido() {
    const producto = inputProducto.value.trim();
    const precio = parseFloat(inputPrecio.value);
    const cantidad = parseInt(inputCantidad.value);

    if (!producto || isNaN(precio) || precio <= 0 || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese datos válidos. El precio y cantidad deben ser mayores a cero.");
        return;
    }

    pedidos.push({
        producto: producto,
        precio: precio,
        cantidad: cantidad
    });

    inputProducto.value = "";
    inputPrecio.value = "";
    inputCantidad.value = "";

    actualizarTablaYTotales(pedidos);
}

function actualizarTablaYTotales(arregloMostrar) {
    const filasHTML = arregloMostrar.map(pedido => {
        const subtotal = pedido.precio * pedido.cantidad;
        return `
            <tr>
                <td>${pedido.producto}</td>
                <td>$${pedido.precio.toFixed(2)}</td>
                <td>${pedido.cantidad}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
    }).join('');
    
    tbCuerpoPedidos.innerHTML = filasHTML;

    const totalUnidades = arregloMostrar.reduce((acumulador, pedido) => acumulador + pedido.cantidad, 0);
    const montoTotal = arregloMostrar.reduce((acumulador, pedido) => acumulador + (pedido.precio * pedido.cantidad), 0);

    lblUnidades.textContent = totalUnidades;
    lblMonto.textContent = `$${montoTotal.toFixed(2)}`;
}

function filtrarPorPrecio() {
    const precioMax = parseFloat(inputPrecioMax.value);
    
    if (isNaN(precioMax) || precioMax <= 0) {
        alert("Ingrese un precio máximo válido para filtrar.");
        return;
    }

    const pedidosFiltrados = pedidos.filter(pedido => pedido.precio <= precioMax);
    actualizarTablaYTotales(pedidosFiltrados);
}

function mostrarTodosLosPedidos() {
    inputPrecioMax.value = "";
    actualizarTablaYTotales(pedidos);
}

function limpiarTodosLosPedidos() {
    if(confirm("¿Está seguro de eliminar todos los pedidos?")){
        pedidos = [];
        actualizarTablaYTotales(pedidos);
    }
}

btnAgregar.addEventListener("click", registrarPedido);
btnFiltrar.addEventListener("click", filtrarPorPrecio);
btnMostrar.addEventListener("click", mostrarTodosLosPedidos);
btnLimpiar.addEventListener("click", limpiarTodosLosPedidos);