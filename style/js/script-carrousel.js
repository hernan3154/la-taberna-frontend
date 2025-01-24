/*Cambios realizados:
Selección de elementos para cada carrusel:

Se seleccionan todos los carouseles con querySelectorAll(".carousel").
Se agregaron las flechas correspondientes a cada carrusel.
Función toggleArrowIcons adaptada para cada carrusel:

Ahora la función recibe como parámetros el carrusel y las flechas, para que cada carrusel tenga sus propias flechas visibles de acuerdo al desplazamiento.
Desplazamiento y arrastre:

Cada carrusel se maneja de forma independiente para el desplazamiento y el arrastre, manteniendo las variables asociadas a cada carrusel específico.
Asignación de event listeners:

Se asignan los event listeners de las flechas y el arrastre a cada carrusel de manera independiente. */


// Seleccionar todos los carouseles
const carousels = document.querySelectorAll(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper i");

// Función auxiliar para alternar la visibilidad de las flechas en cada carrusel
const toggleArrowIcons = (carousel, arrowIcons) => {
  setTimeout(() => {
    const maxScroll = Math.round(carousel.scrollWidth - carousel.clientWidth);
    arrowIcons[0].style.display = carousel.scrollLeft <= 0 ? "none" : "block";
    arrowIcons[1].style.display = Math.round(carousel.scrollLeft) >= maxScroll ? "none" : "block";
  }, 100);
};

// Función auxiliar para desplazar suavemente el carrusel
const scrollCarousel = (carousel, direction) => {
  const firstImage = carousel.querySelector("img");
  const cardWidth = firstImage.clientWidth + 14; // Ancho de la imagen + margen
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  const scrollAmount = direction === "right" ? cardWidth : -cardWidth;

  carousel.scrollLeft = Math.min(Math.max(carousel.scrollLeft + scrollAmount, 0), maxScroll);

  toggleArrowIcons(carousel, arrowIcons);
};

// Lógica de arrastre para cada carrusel
const startDragging = (carousel, event) => {
  carousel.isDragging = true;
  carousel.startX = event.pageX || event.touches[0].pageX;
  carousel.scrollStart = carousel.scrollLeft;
  carousel.classList.add("dragging");
};

const duringDrag = (carousel, event) => {
  if (!carousel.isDragging) return;

  const currentX = event.pageX || event.touches[0].pageX;
  carousel.scrollDiff = currentX - carousel.startX;

  carousel.scrollLeft = carousel.scrollStart - carousel.scrollDiff;
};

const stopDragging = (carousel) => {
  if (!carousel.isDragging) return;

  carousel.isDragging = false;
  carousel.classList.remove("dragging");

  if (Math.abs(carousel.scrollDiff) > 10) {
    autoCenterImage(carousel);
  }
};

// Ajuste automático después de arrastrar
const autoCenterImage = (carousel) => {
  const firstImage = carousel.querySelector("img");
  const cardWidth = firstImage.clientWidth + 14;
  const offset = carousel.scrollLeft % cardWidth;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  if (carousel.scrollLeft > 0 && carousel.scrollLeft < maxScroll) {
    if (offset > cardWidth / 3) {
      carousel.scrollLeft += cardWidth - offset; // Ajustar a la siguiente imagen
    } else {
      carousel.scrollLeft -= offset; // Ajustar a la imagen anterior
    }
  }

  toggleArrowIcons(carousel, arrowIcons);
};

// Adjuntar event listeners a cada carrusel
carousels.forEach((carousel) => {
  const carouselArrowIcons = carousel.closest('.wrapper').querySelectorAll('i');

  // Event listeners para las flechas
  carouselArrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const direction = icon.id === "right" ? "right" : "left";
      scrollCarousel(carousel, direction);
    });
  });

  // Lógica de arrastre
  carousel.addEventListener("mousedown", (event) => startDragging(carousel, event));
  carousel.addEventListener("touchstart", (event) => startDragging(carousel, event));

  document.addEventListener("mousemove", (event) => duringDrag(carousel, event));
  carousel.addEventListener("touchmove", (event) => duringDrag(carousel, event));

  document.addEventListener("mouseup", () => stopDragging(carousel));
  carousel.addEventListener("touchend", () => stopDragging(carousel));
  
  // Initial setup
  toggleArrowIcons(carousel, carouselArrowIcons);
});
