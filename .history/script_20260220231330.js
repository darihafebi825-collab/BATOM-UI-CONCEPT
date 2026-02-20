// ===== NATURA CATALOG — SCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // ── Intersection Observer: animate cards in on scroll ──
  const cards = document.querySelectorAll('.card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  cards.forEach((card) => observer.observe(card));


  // ── Parallax: subtle bg shift on mouse move ──
  const products = document.querySelector('.products');

  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;  // -1 to 1
    const dy = (e.clientY - cy) / cy;

    cards.forEach((card, i) => {
      const depth = 0.6 + i * 0.15;
      const bg = card.querySelector('.card-bg');
      if (bg) {
        bg.style.transform = `translate(${dx * depth * 8}px, ${dy * depth * 6}px)`;
      }
    });
  });

  // Reset on leave
  document.addEventListener('mouseleave', () => {
    cards.forEach((card) => {
      const bg = card.querySelector('.card-bg');
      if (bg) bg.style.transform = '';
    });
  });


  // ── Card click: ripple effect ──
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0; height: 0;
        border-radius: 50%;
        background: rgba(255,255,255,0.25);
        transform: translate(-50%,-50%);
        animation: rippleOut 0.7s ease-out forwards;
        pointer-events: none;
        z-index: 20;
      `;

      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleOut {
      to { width: 400px; height: 400px; opacity: 0; }
    }
  `;
  document.head.appendChild(style);

});