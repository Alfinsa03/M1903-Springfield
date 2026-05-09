    // deteksi portrait / landscape otomatis
    document.querySelectorAll('.gallery-item img').forEach(img => {
      const detect = () => {
        const ratio = img.naturalWidth / img.naturalHeight;
        const item = img.closest('.gallery-item');
        if (ratio > 1.1) {
          item.classList.add('landscape');
          item.classList.remove('portrait');
        } else {
          item.classList.add('portrait');
          item.classList.remove('landscape');
        }
      };
      if (img.complete && img.naturalWidth) detect();
      else img.addEventListener('load', detect);
    });

    // scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // cursor vertical line
    const line = document.getElementById('cursorLine');
    let lineX = 0, currentX = 0;
    document.addEventListener('mousemove', (e) => {
      lineX = e.clientX;
      line.style.opacity = '1';
    });
    document.addEventListener('mouseleave', () => { line.style.opacity = '0'; });
    (function animateLine() {
      currentX += (lineX - currentX) * 0.08;
      line.style.transform = `translateX(${currentX}px)`;
      requestAnimationFrame(animateLine);
    })();

    // stat val pop-in
    const styleEl = document.createElement('style');
    styleEl.textContent = `@keyframes stat-pop { 0%{opacity:0;transform:translateY(8px) scale(0.95)} 100%{opacity:1;transform:translateY(0) scale(1)} }`;
    document.head.appendChild(styleEl);
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'stat-pop 0.5s cubic-bezier(0.22,1,0.36,1) forwards';
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-val').forEach(el => statObserver.observe(el));