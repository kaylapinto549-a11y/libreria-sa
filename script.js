const productos = [
  {
    id: 1,
    nombre: "Cuaderno escolar 100 hojas",
    categoria: "cuadernos",
    precio: 6500,
    descripcion: "Ideal para apuntes, tareas y clases.",
    imagen: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 2,
    nombre: "Cuaderno argollado",
    categoria: "cuadernos",
    precio: 12500,
    descripcion: "Organiza tus notas con comodidad.",
    imagen: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 3,
    nombre: "Cuaderno cuadriculado",
    categoria: "cuadernos",
    precio: 7500,
    descripcion: "Perfecto para matemáticas y ciencias.",
    imagen: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 4,
    nombre: "Diccionario de español",
    categoria: "libros",
    precio: 22000,
    descripcion: "Aprende nuevas palabras y significados.",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 5,
    nombre: "Libro de cuentos infantiles",
    categoria: "libros",
    precio: 18000,
    descripcion: "Historias para imaginar y disfrutar.",
    imagen: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 6,
    nombre: "Atlas escolar",
    categoria: "libros",
    precio: 25000,
    descripcion: "Explora mapas, países y continentes.",
    imagen: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 7,
    nombre: "Caja de colores x12",
    categoria: "papeleria",
    precio: 8500,
    descripcion: "Doce colores para dibujos y proyectos.",
    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 8,
    nombre: "Lápices y borrador",
    categoria: "papeleria",
    precio: 5500,
    descripcion: "Esenciales para el trabajo escolar.",
    imagen: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 9,
    nombre: "Marcadores de colores",
    categoria: "papeleria",
    precio: 12000,
    descripcion: "Resalta tus apuntes y decora tus trabajos.",
    imagen: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 10,
    nombre: "Calculadora escolar",
    categoria: "tecnologia",
    precio: 18000,
    descripcion: "Una ayuda práctica para tus operaciones.",
    imagen: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 11,
    nombre: "Memoria USB 32 GB",
    categoria: "tecnologia",
    precio: 25000,
    descripcion: "Almacena tus tareas y archivos.",
    imagen: "https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=650&q=85"
  },
  {
    id: 12,
    nombre: "Audífonos escolares",
    categoria: "tecnologia",
    precio: 22000,
    descripcion: "Para escuchar clases y contenido educativo.",
    imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=650&q=85"
  }
];

const categorias = {
  cuadernos: "Cuadernos",
  libros: "Libros",
  papeleria: "Papelería",
  tecnologia: "Tecnología"
};

const WHATSAPP = "573001640580";

const dinero = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});

const productosGrid = document.getElementById("productosGrid");
const busqueda = document.getElementById("busqueda");
const filtroCategoria = document.getElementById("filtroCategoria");
const resultado = document.getElementById("resultado");
const sinResultados = document.getElementById("sinResultados");

const panelLista = document.getElementById("panelLista");
const fondoPanel = document.getElementById("fondoPanel");
const listaProductos = document.getElementById("listaProductos");
const listaVacia = document.getElementById("listaVacia");
const resumen = document.getElementById("resumen");

const contador = document.getElementById("contador");
const cantidadTotal = document.getElementById("cantidadTotal");
const precioTotal = document.getElementById("precioTotal");

// Cada entrada contiene el producto y la cantidad seleccionada.
const miLista = new Map();

// Fallback si alguna fotografía no carga.
function vigilarImagenes(contenedor) {
  contenedor.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => {
      img.onerror = null;
      img.src =
        "https://placehold.co/600x400/eaf2ff/173b70?text=El+Saber";
    }, { once: true });
  });
}

// Crear las tarjetas del catálogo.
function mostrarProductos() {
  const texto = busqueda.value.trim().toLocaleLowerCase("es");
  const categoriaSeleccionada = filtroCategoria.value;

  const filtrados = productos.filter((producto) => {
    const coincideTexto = [
      producto.nombre,
      producto.descripcion,
      categorias[producto.categoria]
    ].some((dato) => dato.toLocaleLowerCase("es").includes(texto));

    const coincideCategoria =
      categoriaSeleccionada === "todos" ||
      producto.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  productosGrid.innerHTML = filtrados.map((producto) => {
    const cantidad = miLista.get(producto.id)?.cantidad || 0;

    return `
      <article class="producto">
        <div class="producto-imagen">
          <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            loading="lazy"
          >
          <span class="producto-categoria">
            ${categorias[producto.categoria]}
          </span>
        </div>

        <div class="producto-info">
          <h3>${producto.nombre}</h3>
          <p class="producto-descripcion">${producto.descripcion}</p>

          <div class="producto-pie">
            <div class="producto-precio">
              ${dinero.format(producto.precio)}
              <span class="producto-unidad">Precio estimado</span>
            </div>

            <button
              class="agregar ${cantidad ? "en-lista" : ""}"
              data-agregar="${producto.id}"
              aria-label="Agregar ${producto.nombre} a mi lista"
            >
              ${cantidad ? `✓ En lista (${cantidad})` : "+ Agregar"}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  resultado.textContent =
    `${filtrados.length} producto${filtrados.length === 1 ? "" : "s"} encontrado${filtrados.length === 1 ? "" : "s"}`;

  sinResultados.hidden = filtrados.length !== 0;
  productosGrid.hidden = filtrados.length === 0;

  vigilarImagenes(productosGrid);
}

// Agregar un producto a la lista o incrementar su cantidad.
productosGrid.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-agregar]");
  if (!boton) return;

  const id = Number(boton.dataset.agregar);
  const producto = productos.find((p) => p.id === id);

  if (!producto) return;

  if (miLista.has(id)) {
    miLista.get(id).cantidad += 1;
  } else {
    miLista.set(id, {
      producto,
      cantidad: 1
    });
  }

  mostrarProductos();
  mostrarLista();
});

// Búsqueda instantánea.
busqueda.addEventListener("input", mostrarProductos);

// Sincronizar los botones de categorías.
function sincronizarFiltros() {
  document.querySelectorAll(".filtro").forEach((boton) => {
    boton.classList.toggle(
      "activo",
      boton.dataset.categoria === filtroCategoria.value
    );
  });
}

filtroCategoria.addEventListener("change", () => {
  sincronizarFiltros();
  mostrarProductos();
});

document.querySelectorAll(".filtro").forEach((boton) => {
  boton.addEventListener("click", () => {
    filtroCategoria.value = boton.dataset.categoria;
    sincronizarFiltros();
    mostrarProductos();
  });
});

// Las cuatro tarjetas superiores permiten filtrar por categoría.
document.querySelectorAll("[data-ir-categoria]").forEach((enlace) => {
  enlace.addEventListener("click", () => {
    filtroCategoria.value = enlace.dataset.irCategoria;
    sincronizarFiltros();
    mostrarProductos();
  });
});

// Limpiar la búsqueda y mostrar todo.
document.getElementById("limpiarBusqueda").addEventListener("click", () => {
  busqueda.value = "";
  filtroCategoria.value = "todos";
  sincronizarFiltros();
  mostrarProductos();
});

// Mostrar la lista lateral, cantidades y total.
function mostrarLista() {
  const items = Array.from(miLista.values());

  const unidades = items.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const total = items.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );

  contador.textContent = unidades;
  cantidadTotal.textContent = unidades;
  precioTotal.textContent = dinero.format(total);

  listaVacia.hidden = items.length > 0;
  resumen.hidden = items.length === 0;

  listaProductos.innerHTML = items.map(({ producto, cantidad }) => `
    <article class="item-lista">
      <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        loading="lazy"
      >

      <div>
        <h4>${producto.nombre}</h4>
        <p class="item-subtotal">
          ${dinero.format(producto.precio * cantidad)}
        </p>

        <div class="controles-cantidad">
          <button
            class="cambiar-cantidad"
            data-cambio="-1"
            data-id="${producto.id}"
            aria-label="Reducir cantidad"
          >−</button>

          <span>${cantidad}</span>

          <button
            class="cambiar-cantidad"
            data-cambio="1"
            data-id="${producto.id}"
            aria-label="Aumentar cantidad"
          >+</button>
        </div>
      </div>

      <button
        class="eliminar"
        data-eliminar="${producto.id}"
        aria-label="Eliminar ${producto.nombre}"
      >Eliminar</button>
    </article>
  `).join("");

  vigilarImagenes(listaProductos);
}

// Manejar los botones de cantidad y eliminar.
listaProductos.addEventListener("click", (evento) => {
  const botonEliminar = evento.target.closest("[data-eliminar]");
  const botonCambio = evento.target.closest("[data-cambio]");

  if (botonEliminar) {
    miLista.delete(Number(botonEliminar.dataset.eliminar));
  } else if (botonCambio) {
    const id = Number(botonCambio.dataset.id);
    const item = miLista.get(id);

    if (!item) return;

    item.cantidad += Number(botonCambio.dataset.cambio);

    if (item.cantidad <= 0) {
      miLista.delete(id);
    }
  } else {
    return;
  }

  mostrarLista();
  mostrarProductos();
});

// Abrir y cerrar el panel lateral.
function abrirLista() {
  panelLista.classList.add("abierto");
  fondoPanel.classList.add("visible");
  panelLista.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-abierto");
}

function cerrarLista() {
  panelLista.classList.remove("abierto");
  fondoPanel.classList.remove("visible");
  panelLista.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-abierto");
}

document.getElementById("abrirLista").addEventListener("click", abrirLista);
document.getElementById("cerrarLista").addEventListener("click", cerrarLista);
fondoPanel.addEventListener("click", cerrarLista);

document.getElementById("seguirComprando").addEventListener("click", () => {
  cerrarLista();
  document.getElementById("catalogo").scrollIntoView({
    behavior: "smooth"
  });
});

// Vaciar todos los artículos seleccionados.
document.getElementById("vaciarLista").addEventListener("click", () => {
  miLista.clear();
  mostrarLista();
  mostrarProductos();
});

// Preparar un pedido con el detalle de los productos.
document.getElementById("enviarPedido").addEventListener("click", () => {
  const items = Array.from(miLista.values());

  if (items.length === 0) {
    alert("Agrega productos a tu lista antes de solicitar un pedido.");
    return;
  }

  const total = items.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );

  let mensaje = "¡Hola, Librería Escolar El Saber! 📚\n\n";
  mensaje += "Quiero consultar disponibilidad de estos productos:\n\n";

  items.forEach(({ producto, cantidad }) => {
    mensaje += `• ${producto.nombre}\n`;
    mensaje += `  Cantidad: ${cantidad}\n`;
    mensaje += `  Precio unitario estimado: ${dinero.format(producto.precio)}\n`;
    mensaje += `  Subtotal: ${dinero.format(producto.precio * cantidad)}\n\n`;
  });

  mensaje += `TOTAL ESTIMADO: ${dinero.format(total)}\n\n`;
  mensaje += "Ubicación: Canalete, Córdoba.\n";
  mensaje += "Por favor, confirmen los precios y la disponibilidad. ¡Gracias!";

  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank", "noopener,noreferrer");
});

// Año automático en el pie de página.
document.getElementById("anio").textContent = new Date().getFullYear();

// Inicializar el catálogo.
mostrarProductos();
mostrarLista();