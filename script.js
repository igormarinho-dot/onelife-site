// PRELOADER & REVEAL
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 800);
    }, 1200);
  }
  reveal();
});

const reveal = () => {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) el.classList.add("active");
  });
};

window.addEventListener("scroll", reveal);

// CARROSSEL AUTOMÁTICO
document.addEventListener("DOMContentLoaded", () => {
  const teamGrid = document.querySelector(".team-grid");
  const teamCards = document.querySelectorAll(".team-card");

  if (teamGrid && teamCards.length > 0) {
    // Duplicar os cards para criar um efeito de loop infinito suave
    teamCards.forEach((card) => {
      const clone = card.cloneNode(true);
      teamGrid.appendChild(clone);
    });

    const totalCards = teamCards.length;
    const cardWidth = 280 + 20; // Largura do card (280px) + gap (20px)
    let currentIndex = 0;

    function slideCarousel() {
      currentIndex++;

      // Se chegar ao final da primeira cópia dos cards, resetar para o início sem transição
      if (currentIndex >= totalCards) {
        teamGrid.style.transition = "none";
        teamGrid.style.transform = `translateX(0)`;
        currentIndex = 0;

        // Forçar um reflow para que a transição 'none' seja aplicada antes de reativá-la
        void teamGrid.offsetWidth;
        teamGrid.style.transition = "transform 0.5s ease-in-out";
      } else {
        teamGrid.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    }

    setInterval(slideCarousel, 2000); // Slide a cada 2 segundos
  }
});
