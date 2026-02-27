// Posizionamento dinamico delle pillole bianche in base alla fine della pillola turchese
// Ogni pillola bianca DEVE essere al MEDESIMO left per tutte le card

function positionWhitePills() {
  document.querySelectorAll('.carousel-section').forEach(section => {
    // Ottieni la pillola turchese
    const turquoisePill = section.querySelector('.carousel-pill');
    if (!turquoisePill) return;

    // Ottieni tutte le card nella sezione
    const carousel = section.querySelector('.carousel');
    if (!carousel) return;

    const cards = carousel.querySelectorAll('.carousel-card');

    // Calcola la distanza della fine della pillola turchese INIZIALMENTE
    let pillEndXDistance = null;
    
    function calculateInitialDistance() {
      const pillRect = turquoisePill.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      pillEndXDistance = pillRect.right - sectionRect.left;
    }

    function updatePositions() {
      if (pillEndXDistance === null) {
        calculateInitialDistance();
      }
      
      // Posiziona ogni pillola bianca usando la STESSA distanza iniziale per TUTTE
      cards.forEach(card => {
        const whitePill = card.querySelector('.card-title-pill');
        if (!whitePill) return;

        // La pillola bianca inizia a pillEndXDistance dal bordo sinistro della card
        // Questo valore è IDENTICO per tutte le card
        const leftPosition = pillEndXDistance - 50;
        
        // Applica il left (identico per tutte le pillole)
        whitePill.style.left = `${leftPosition}px`;
        whitePill.style.right = 'auto';
      });
    }

    // Calcola la distanza iniziale al caricamento
    calculateInitialDistance();
    updatePositions();

    // Aggiorna posizioni solo al resize
    window.addEventListener('resize', () => {
      pillEndXDistance = null; // Reset per ricalcolare al resize
      updatePositions();
    });
  });
}

// Aspetta che il DOM sia pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', positionWhitePills);
} else {
  positionWhitePills();
}
