
//Carrossel Script
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel img');
const totalSlides = slides.length;

function showSlide(index) {
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }

    const translationValue = -100 * currentIndex + '%';
    document.querySelector('.carousel').style.transform = 'translateX(' + translationValue + ')';
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Autoplay do carrossel
setInterval(function () {
    nextSlide();
}, 5000); // Altere o valor 5000 para ajustar a velocidade do autoplay (em milissegundos)

