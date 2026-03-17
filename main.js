document.querySelectorAll('.tile').forEach(tile => {
  const glare = tile.querySelector('.tile-glare');

  tile.addEventListener('mousemove', e => {
    const rect = tile.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    const rotateX = ((y - cy) / cy) * -2.5;
    const rotateY = ((x - cx) / cx) * 2.5;

    tile.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;

    if (glare) {
      glare.style.opacity = '1';
      glare.style.background =
        `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.025) 0%, transparent 60%)`;
    }
  });

  tile.addEventListener('mouseleave', () => {
    tile.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    tile.style.transition = 'transform 0.4s ease, border-color 0.2s, box-shadow 0.2s';

    if (glare) glare.style.opacity = '0';

    // Reset transition override after snap-back
    tile.addEventListener('transitionend', () => {
      tile.style.transition = '';
    }, { once: true });
  });

  tile.addEventListener('mouseenter', () => {
    // Snappy response on enter, smooth on leave (handled above)
    tile.style.transition = 'border-color 0.2s, box-shadow 0.2s';
  });
});
