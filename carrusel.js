document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".comic-img .slide");
    const dots = document.querySelectorAll(".comic-img .dot");
    let currentIndex = 0;
    let slideInterval;
    const intervalTime = 3000; // 3000 ms = 3 segundos

    // Función principal para cambiar a una imagen específica
    function showSlide(index) {
        // Quitamos la clase 'active' de todas las fotos y puntos
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        // Si llegamos al final, volvemos a la primera (0)
        currentIndex = index >= slides.length ? 0 : index;

        // Activamos la foto y el punto correspondientes
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    // Avanzar a la siguiente imagen
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Iniciar o reiniciar el ciclo automático de 3 segundos
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Evento de clic para cada círculo
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetInterval(); // Reinicia el conteo de 3s al hacer clic
        });
    });

    // Arranca el carrusel al cargar la página
    resetInterval();
});