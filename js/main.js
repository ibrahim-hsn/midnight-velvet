// Roast & Ritual — shared behaviour
(function () {
  // Mobile menu
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = menu.classList.toggle('hidden') === false;
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // Lazy-load below-the-fold videos with data-src
  const videoIo = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const v = e.target;
        if (v.dataset.src && !v.getAttribute('src')) {
          v.src = v.dataset.src;
          v.load();
          v.play().catch(() => {});
        }
        videoIo.unobserve(v);
      }
    });
  }, { rootMargin: '300px' }) : null;

  document.querySelectorAll('video[data-src]').forEach((v) => {
    if (videoIo) {
      videoIo.observe(v);
    } else {
      v.src = v.dataset.src;
    }
  });

  // Asset slots: reveal media when it loads, keep the placeholder if the file is missing
  document.querySelectorAll('.asset-slot').forEach((slot) => {
    const rawMedia = slot.querySelector('.asset-media');
    if (!rawMedia) return;
    const media = rawMedia.tagName === 'PICTURE' ? rawMedia.querySelector('img') : rawMedia;
    if (!media) return;

    const ok = () => slot.classList.add('is-loaded');
    const fail = () => (media.closest('picture') || media).remove();

    if (media.tagName === 'IMG') {
      if (media.complete && media.naturalWidth) {
        ok();
      } else {
        media.addEventListener('load', ok, { once: true });
        media.addEventListener('error', fail, { once: true });
      }
    } else if (media.tagName === 'VIDEO') {
      if (media.hasAttribute('poster') || media.readyState >= 2) {
        ok();
      }
      media.addEventListener('loadeddata', ok, { once: true });
      media.addEventListener('error', fail, { once: true });
    }
  });

  // Reveal on scroll (only for elements that still need it)
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 }) : null;

  document.querySelectorAll('.reveal').forEach((el) => {
    if (io) {
      io.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  });

  // Footer year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
