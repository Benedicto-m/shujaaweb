let currentSlide = 0; // Index de la diapositive actuelle
const slides = document.querySelectorAll('.slide'); // Sélectionner toutes les diapositives
const totalSlides = slides.length; // Nombre total de diapositives

// Fonction pour afficher la diapositive actuelle
function showSlide(index) {
  // Si l'index dépasse le nombre total de diapositives, retourner à la première
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1; // Si l'index est inférieur à 0, afficher la dernière diapositive
  } else {
    currentSlide = index;
  }

  // Appliquer une transformation pour faire glisser les diapositives
  document.querySelector('.slides').style.transform = `translateX(${-currentSlide * 100}%)`;
}

// Fonction pour passer à la diapositive suivante
document.querySelector('.next').addEventListener('click', () => {
  showSlide(currentSlide + 1);
});

// Fonction pour revenir à la diapositive précédente
document.querySelector('.prev').addEventListener('click', () => {
  showSlide(currentSlide - 1);
});

// Optionnel: changer automatiquement de diapositive toutes les 5 secondes
setInterval(() => {
  showSlide(currentSlide + 1);
}, 5000);