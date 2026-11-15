document.addEventListener("DOMContentLoaded", () => {
    const element = document.getElementById("vision");
    const wrapper = element.parentElement;
    const fullText = element.textContent.trim();

    let index = 0;
    const writeSpeed = 45; // milisegundos por letra
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
})