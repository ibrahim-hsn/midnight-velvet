// Roast & Ritual — shared behaviour
(function () {
  // Mobile menu
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) btn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    btn.setAttribute('aria-expanded', String(open));
  });

  // Asset slots: reveal media when it loads, keep the placeholder if the file is missing
  document.querySelectorAll('.asset-slot').forEach((slot) => {
    const media = slot.querySelector('.asset-media');
    if (!media) return;
    const ok = () => slot.classList.add('is-loaded');
    const fail = () => media.remove();
    if (media.tagName === 'IMG') {
      if (media.complete && media.naturalWidth) ok();
      media.addEventListener('load', ok); media.addEventListener('error', fail);
    } else {
      if (media.readyState >= 2) ok();
      media.addEventListener('loadeddata', ok); media.addEventListener('error', fail);
    }
  });

  // Reveal on scroll
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.15 }) : null;
  document.querySelectorAll('.reveal').forEach((el) => io ? io.observe(el) : el.classList.add('is-visible'));

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
