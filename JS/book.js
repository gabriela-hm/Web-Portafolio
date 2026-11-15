const SPREADS = [
  { id: "toc", title: "TABLA DE CONTENIDOS" },
  { id: "about", title: "SOBRE MÍ" },
  { id: "skills", title: "MI CAJA DE HERRAMIENTAS" },
  { id: "frontend", title: "PROYECTOS FRONTEND" },
  { id: "backend1", title: "PROYECTOS BACKEND (01 & 02)" },
  { id: "backend2", title: "PROYECTOS BACKEND (03 & 04)" },
  { id: "contact", title: "SIGAMOS CONSTRUYENDO" },
];

let isOpen = false;
let currentSpreadIdx = 0;

// DOM elementos
const bookStage = document.getElementById("book-container");
const bookClosed = document.getElementById("book-closed");
const bookOpen = document.getElementById("book-open");
const spreadTitle = document.getElementById("spread-title");
const pageCounterBadge = document.getElementById("page-counter-badge");
const spreadBody = document.getElementById("spread-body");
const btnPrev = document.getElementById("btn-prev-page");
const btnNext = document.getElementById("btn-next-page");
const btnClose = document.getElementById("btn-close-book");
const dotsContainer = document.getElementById("dots-container");
// puntos de navegacion
function buildDots() {
  //Limpia el contenedor para evitar duplicados al redibujar
  dotsContainer.innerHTML = "";
  SPREADS.forEach((spread, index) => {
    const dot = document.createElement("button");
    //Asigna clases, estado activo y metadatos de accesibilidad
    dot.className = `dot-item ${index === currentSpreadIdx ? "active" : ""}`;
    dot.title = spread.title;
    dot.setAttribute("aria-label", `Ir a página ${index + 1}: ${spread.title}`);
    //Define la acción de salto de página al hacer clic
    dot.addEventListener("click", () => {
      currentSpreadIdx = foundIdx;
      updateView();
    });
    dotsContainer.appendChild(dot);
  });
}

// abrir
function openBook() {
  if (isOpen) return;

  isOpen = true;

  // Mostrar la página interior detrás de la portada
  bookOpen.style.display = "flex";
  bookStage.classList.add("open-stage");

  // Permitir que el navegador pinte primero la página
  requestAnimationFrame(() => {
    // Comienza el giro físico de la portada
    bookClosed.classList.add("page-turning");

    // Entrada suave de la página interior
    bookOpen.classList.add("page-opening");
  });

  updateView();
}

bookClosed.addEventListener("transitionend", (event) => {
  // Solo detectar el final del giro de la portada
  if (event.target !== bookClosed) return;
  if (event.propertyName !== "transform") return;

  if (isOpen) {
    // Libro abierto: ocultar la portada
    bookClosed.style.display = "none";
  } else {
    // Libro cerrado: ocultar completamente el contenido interior
    bookOpen.style.display = "none";
  }
});

//cerrar
function closeBook() {
  if (!isOpen) return;

  isOpen = false;

  bookOpen.classList.remove("page-opening");

  // Mostrar nuevamente la portada
  bookClosed.style.display = "flex";

  requestAnimationFrame(() => {
    bookClosed.classList.remove("page-turning");
  });

  bookStage.classList.remove("open-stage");
}

// Actualiza la vista interior del libro o pliego activo
function updateView() {
  // Oculta todos los paneles de contenido eliminando la clase 'active'
  document.querySelectorAll(".book-panel").forEach((panel) => {
    panel.classList.remove("active");
  });
// Obtiene los datos actual y muestra su panel correspondiente
  const current = SPREADS[currentSpreadIdx];
  const activePanel = document.getElementById(`panel-${current.id}`);
  if (activePanel) {
    activePanel.classList.add("active");
    spreadBody.scrollTop = 0;
  }

  // Actualiza el título en el encabezado y el contador de páginas con formato de dos dígitos
  spreadTitle.textContent = current.title;
  const formattedCur = String(currentSpreadIdx + 1).padStart(2, "0");
  const formattedTotal = String(SPREADS.length).padStart(2, "0");
  pageCounterBadge.textContent = `${formattedCur} / ${formattedTotal}`;

  // Habilita o deshabilita los botones de navegación
  btnPrev.disabled = currentSpreadIdx === 0;
  btnNext.disabled = currentSpreadIdx === SPREADS.length - 1;

  // Actualiza el punto indicador activo sincronizándolo con el índice actual
  document.querySelectorAll(".dot-item").forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentSpreadIdx);
  });
}

// Salta directamente a una página específica
window.goToSpread = function (targetId) {
  //Busca el índice
  const foundIdx = SPREADS.findIndex((s) => s.id === targetId);
  // Si el libro está cerrado, lo abre primero
  if (foundIdx !== -1) {
    if (!isOpen) openBook();
    // Actualiza el índice actual y refresca la vista
    currentSpreadIdx = foundIdx;
    updateView();
  }
};

//Abre el libro al hacer clic en la portada cerrada
bookClosed.addEventListener("click", openBook);
// Cierra el libro al hacer clic en el botón de cierre
btnClose.addEventListener("click", (e) => {
  e.stopPropagation();
  closeBook();
});
//Retrocede a la página anterior
btnPrev.addEventListener("click", () => {
  if (currentSpreadIdx > 0) {
    currentSpreadIdx--;
    updateView();
  }
});
//Avanza a la siguiente página
btnNext.addEventListener("click", () => {
  if (currentSpreadIdx < SPREADS.length - 1) {
    currentSpreadIdx++;
    updateView();
  }
});

//navegación mediante el teclado
document.addEventListener("keydown", (e) => {
  //Si el libro está cerrado, permite abrirlo presionando 'Enter' o la barra espaciadora
  if (!isOpen) {
    if (e.key === "Enter" || e.key === " ") {
      openBook();
    }
    return;
  }
//Navega hacia adelante con la flecha derecha, hacia atrás con la izquierda, o cierra con Escape
  if (e.key === "ArrowRight" && currentSpreadIdx < SPREADS.length - 1) {
    currentSpreadIdx++;
    updateView();
  } else if (e.key === "ArrowLeft" && currentSpreadIdx > 0) {
    currentSpreadIdx--;
    updateView();
  } else if (e.key === "Escape") {
    closeBook();
  }
});

// inicializa al cargar la pagina
buildDots();


