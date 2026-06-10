// Shared nav + footer injected on every page
// Replace LOGO_SRC with path relative to each page

(function () {
  const logoSrc = window.__LOGO_SRC__ || '../logos/corelab.png';
  const rootPath = window.__ROOT__ || '../';

  // NAV
  const navHTML = `
  <nav id="navbar">
    <div class="logo">
      <a href="${rootPath}index.html">
        <img src="${logoSrc}" alt="CoreLab" style="height:34px;display:block;" />
      </a>
    </div>
    <ul>
      <li><a href="${rootPath}index.html#servicios" data-i18n="nav.servicios">Servicios</a></li>
      <li><a href="${rootPath}index.html#casos" data-i18n="nav.casos">Casos</a></li>
      <li><a href="${rootPath}inmobiliaria.html" data-i18n="nav.inmobiliaria">Inmobiliaria</a></li>
      <li><a href="${rootPath}marca.html" data-i18n="nav.marca">Marca</a></li>
      <li><a href="${rootPath}ia.html" data-i18n="nav.ia">IA</a></li>
      <li><a href="${rootPath}index.html#nosotros" data-i18n="nav.nosotros">Nosotros</a></li>
    </ul>
    <div style="display:flex;align-items:center;gap:16px;">
      <button id="lang-toggle" onclick="window.__setLang && window.__setLang(window.__lang==='es'?'en':'es')" class="lang-toggle">EN</button>
      <a href="${rootPath}index.html#contacto" class="nav-cta" data-i18n="nav.cta">Escríbenos</a>
    </div>
  </nav>`;

  // FOOTER
  const footerHTML = `
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <img src="${logoSrc}" alt="CoreLab" style="height:24px;opacity:0.85;" />
        <p data-i18n="footer.tagline">Ayudamos a las empresas a crear mejores marcas. Estrategia, diseño y tecnología en un solo equipo.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h5 data-i18n="footer.col1">Servicios</h5>
          <ul>
            <li><a href="${rootPath}index.html#servicios" data-i18n="footer.col1.l1">Consultoría de Marca</a></li>
            <li><a href="${rootPath}index.html#servicios" data-i18n="footer.col1.l2">Estrategia Digital</a></li>
            <li><a href="${rootPath}index.html#servicios" data-i18n="footer.col1.l3">Branding & Diseño</a></li>
            <li><a href="${rootPath}index.html#servicios" data-i18n="footer.col1.l4">Diseño Web & Software</a></li>
            <li><a href="${rootPath}inmobiliaria.html" data-i18n="footer.col1.l5">Marketing Inmobiliario</a></li>
            <li><a href="${rootPath}marca.html" data-i18n="footer.col1.l6">Estrategia de Marca</a></li>
            <li><a href="${rootPath}ia.html" data-i18n="footer.col1.l7">IA & Automatización</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.col2">Casos</h5>
          <ul>
            <li><a href="${rootPath}casos/arquitectoma.html">Arquitectoma</a></li>
            <li><a href="${rootPath}casos/berger.html">Berger Joyeros</a></li>
            <li><a href="${rootPath}casos/acha.html">ACHA</a></li>
            <li><a href="${rootPath}casos/ediciones-castillo.html">Ediciones Castillo</a></li>
            <li><a href="${rootPath}casos/berger-rolex.html">Berger × Rolex</a></li>
            <li><a href="${rootPath}casos/pyl-studios.html">PYL Studios</a></li>
            <li><a href="${rootPath}casos/fertilidad-integral.html">Fertilidad Integral</a></li>
            <li><a href="${rootPath}casos/moshi-moshi.html">Moshi Moshi</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h5 data-i18n="footer.col3">Empresa</h5>
          <ul>
            <li><a href="${rootPath}index.html#nosotros" data-i18n="footer.col3.l1">Nosotros</a></li>
            <li><a href="${rootPath}marca.html" data-i18n="footer.col3.l2">Estrategia de Marca</a></li>
            <li><a href="mailto:hola@corelab.mx">hola@corelab.mx</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>CoreLab 2026 ©</p>
      <a href="${rootPath}aviso-de-privacidad.html" data-i18n="footer.privacy">Aviso de Privacidad</a>
      <a href="mailto:hola@corelab.mx">hola@corelab.mx</a>
    </div>
  </footer>`;

  document.addEventListener('DOMContentLoaded', function () {
    // Inject nav before first element
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    // Inject footer at end
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Apply translations after injection
    if (window.__applyTranslations) window.__applyTranslations();

    // Scroll nav border
    const nav = document.getElementById('navbar');
    if (nav) {
      window.addEventListener('scroll', () => {
        nav.style.borderBottom = window.scrollY > 80 ? '1px solid #1E1E1E' : 'none';
      });
    }

    // FAQ toggle (if exists)
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', function () {
        const item = this.parentElement;
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
      });
    });

    // ── DYNAMIC SCROLL WINDOW SPEED ──
    // Duration scales with actual rendered image height so every page
    // scrolls at a comfortable reading pace (~320 px/sec).
    const SCROLL_SPEED  = 180;  // px per second
    const MIN_DURATION  = 4;    // seconds  (very short pages)
    const MAX_DURATION  = 42;   // seconds  (very tall pages like acha-4)
    const WINDOW_HEIGHT = 540;  // matches .site-scroll-window height

    function applyScrollDuration(win) {
      const img = win.querySelector('img');
      if (!img) return;

      function setDuration() {
        const scrollable = img.offsetHeight - WINDOW_HEIGHT;
        if (scrollable <= 0) return; // image shorter than window — nothing to scroll
        const seconds = Math.min(MAX_DURATION, Math.max(MIN_DURATION, scrollable / SCROLL_SPEED));
        img.style.transition = `transform ${seconds.toFixed(1)}s cubic-bezier(0.25, 0.05, 0.1, 1)`;
        // Also update the translateY endpoint now we know exact height
        win.style.setProperty('--scroll-end', `calc(-100% + ${WINDOW_HEIGHT}px)`);
      }

      if (img.complete && img.naturalHeight > 0) {
        // Already cached / loaded
        setDuration();
      } else {
        img.addEventListener('load', setDuration);
      }
    }

    document.querySelectorAll('.site-scroll-window').forEach(applyScrollDuration);

    // Re-evaluate on resize (column widths change → rendered heights change)
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        document.querySelectorAll('.site-scroll-window').forEach(applyScrollDuration);
      }, 200);
    });
  });
})();
