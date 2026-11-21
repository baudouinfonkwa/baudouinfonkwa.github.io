(function () {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  function applyPreference() {
    for (const video of document.querySelectorAll('.simulation-video')) {
      video.autoplay = !preference.matches;
      if (preference.matches) video.pause();
      else video.play().catch(() => {});
    }
  }
  preference.addEventListener('change', applyPreference);
  applyPreference();
})();
