document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".tech-badge").forEach((badge) => {
    badge.addEventListener("mouseenter", () => {
      badge.classList.toggle("marcada");
    });
  });
});