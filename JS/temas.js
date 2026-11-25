
const themes = ["manana", "atardecer", "noche"];

const themeNames = {
  manana: "☀️ Mañana",
  atardecer: "🌇 Atardecer",
  noche: "🌙 Noche"
};

// Nombre con el que se guarda la elección en el navegador
const STORAGE_KEY = "tema-portafolio";

// Cambia el modo
function setTheme(theme) {
  if (theme === "manana") {
    document.body.removeAttribute("data-tema");
  } else {
    document.body.setAttribute("data-tema", theme);
  }

  // guarda el modo para que se mantenga al recargar la página
  localStorage.setItem(STORAGE_KEY, theme);

  // marca como activo solo el botón del modo actual
  const buttons = document.querySelectorAll(".theme-button");
  buttons.forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.theme === theme);
  });
}

// Crea los tres botones y los pone en la página
function buildSwitcher() {
  const box = document.createElement("div");
  box.className = "theme-switcher";

  themes.forEach(function (theme) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "theme-button";
    button.dataset.theme = theme;
    button.textContent = themeNames[theme];

    // al hacer clic, cambia al modo de este botón
    button.addEventListener("click", function () {
      setTheme(theme);
    });

    box.appendChild(button);
  });

  document.body.appendChild(box);
}

buildSwitcher();

// busca el último modo elegido si no hay ninguno, usa mañana
let savedTheme = localStorage.getItem(STORAGE_KEY);
if (!themes.includes(savedTheme)) {
  savedTheme = "manana";
}
setTheme(savedTheme);