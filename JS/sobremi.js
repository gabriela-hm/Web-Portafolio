document.addEventListener("DOMContentLoaded", () => {

    //CARRUSEL DE FOTOS
    const slides = document.querySelectorAll(".comic-img .slide");
    const dots = document.querySelectorAll(".comic-img .dot");
    const aboutPanel = document.querySelector("#panel-about");
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

    function syncCarouselWithPanel() {
        if (aboutPanel.classList.contains("active")) {
            showSlide(0);
            resetInterval();
        } else {
            clearInterval(slideInterval);
        }
    }

    // Evento de clic para cada círculo
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            resetInterval(); // Reinicia el conteo de 3s al hacer clic
        });
    });

    showSlide(0);
    new MutationObserver(syncCarouselWithPanel).observe(aboutPanel, {
        attributes: true,
        attributeFilter: ["class"]
    });
    syncCarouselWithPanel();

    //---------------------------------------------------------------------------------------------------------
    //ANIMACIÓN FRASE---FILOSOFÍA
    const element = document.getElementById("vision");
    const wrapper = element.parentElement;
    const fullText = element.textContent.trim();

    let index = 0;
    const writeSpeed = 80; // milisegundos por letra
    const staticTime = 3500; // tiempo que se queda quieto con fondo


    function startAnimation() {
        element.textContent = "";
        element.classList.remove("resaltado"); // quitar fondo al reiniciar
        wrapper.classList.remove("resaltado");
        index = 0;
        writeLetter();
    }

    function writeLetter() {
        if (index < fullText.length) {
            element.textContent += fullText.charAt(index);
            index++;
            setTimeout(writeLetter, writeSpeed);
        } else {
            element.classList.add("resaltado");
            wrapper.classList.add("resaltado");
            setTimeout(startAnimation, staticTime);
        }
    }

    startAnimation();

    
   

    //-------------------------------------------------------------------------------------------------------
    //ANIMACION CARTAS, BOTONES --FLUJO SECUENCIAL
    const cards = document.querySelectorAll(".star-card");
    const sequenceOrder = [0,1,2,3,4];
    let stepIndex = 0;

    //actualizar qué boton debe tener la animacion de movimiento
    function updateActiveButton() {
        cards.forEach((card, index) => {
            const btn = card.querySelector(".star-flip-btn");
            if (btn){
                if (stepIndex < sequenceOrder.length && index === sequenceOrder[stepIndex]) {
                    btn.classList.add("active-pulse");
                } else {
                    btn.classList.remove("active-pulse"); 
                }
            }
        });
    }

    //inicializa el primer botón
    updateActiveButton();

    cards.forEach((card, index) => {
        const btn = card.querySelector(".star-flip-btn");
        if (!btn) return;

        btn.addEventListener("click", () => {
            // Voltear la tarjeta 
            card.classList.toggle("is-flipped");

            // Controlar el flujo secuencial 
            if (stepIndex < sequenceOrder.length && index === sequenceOrder[stepIndex]) {
                btn.classList.remove("active-pulse");
                stepIndex++; 
                
                // Activar el siguiente botón si aún hay tarjetas pendientes
                if (stepIndex < sequenceOrder.length) {
                    updateActiveButton();
                }
            }
        });
    });

  
});