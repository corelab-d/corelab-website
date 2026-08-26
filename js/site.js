// Shared nav + footer injected on every page
// Replace LOGO_SRC with path relative to each page

(function () {
  const logoSrc = window.__LOGO_SRC__ || '../logos/corelab.png';
  const rootPath = window.__ROOT__ || '../';

  // NAV
  const navHTML = `
  <style>
    li.has-dropdown { position: relative; align-self: stretch; display: flex; align-items: center; }
    li.has-dropdown > a { cursor: pointer; user-select: none; display: flex; align-items: center; gap: 5px; }
    li.has-dropdown > a::after {
      content: '';
      width: 4px; height: 4px;
      border-right: 1px solid currentColor;
      border-bottom: 1px solid currentColor;
      transform: rotate(45deg) translateY(-1px);
      display: inline-block;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    li.has-dropdown.open > a::after { transform: rotate(-135deg) translateY(1px); }
    .nav-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #1A1A1A;
      border: 1px solid rgba(255,255,255,0.1);
      min-width: 140px;
      width: max-content;
      z-index: 500;
      flex-direction: column;
    }
    li.has-dropdown.open .nav-dropdown { display: flex; }
    .nav-dropdown a {
      display: block !important;
      padding: 12px 20px !important;
      font-size: 11px !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
      color: rgba(255,255,255,0.6) !important;
      text-decoration: none !important;
      white-space: nowrap;
      transition: color 0.15s, background 0.15s;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .nav-dropdown a:last-child { border-bottom: none; }
    .nav-dropdown a:hover { color: #EBB22C !important; background: rgba(255,255,255,0.04); }
  </style>
  <nav id="navbar">
    <div class="logo">
      <a href="${rootPath}index.html">
        <img src="${logoSrc}" alt="CoreLab" style="height:34px;display:block;" />
      </a>
    </div>
    <ul>
      <li><a href="${rootPath}index.html#marca-highlight">Marca</a></li>
      <li><a href="${rootPath}index.html#inmobiliaria-highlight">Real Estate</a></li>
      <li><a href="${rootPath}index.html#ia-highlight">IA</a></li>
      <li class="has-dropdown" id="nav-productos">
        <a id="nav-productos-btn">Productos</a>
        <div class="nav-dropdown">
          <a href="https://lava.corelab.mx" target="_blank">LAVA</a>
          <a href="${rootPath}lava-db.html" target="_blank">LAVA DB</a>
        </div>
      </li>
    </ul>
    <div class="nav-right">
      <button id="lang-toggle" onclick="window.__setLang && window.__setLang(window.__lang==='es'?'en':'es')" class="lang-toggle">EN</button>
      <a href="${rootPath}index.html#contacto" class="nav-cta" data-i18n="nav.cta">Escríbenos</a>
      <button class="nav-ham" id="nav-ham" aria-label="Menú" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-mobile-menu" id="nav-mobile-menu" aria-hidden="true">
    <ul class="nav-mobile-links">
      <li><a href="${rootPath}index.html#marca-highlight">Marca</a></li>
      <li><a href="${rootPath}index.html#inmobiliaria-highlight">Real Estate</a></li>
      <li><a href="${rootPath}index.html#ia-highlight">IA</a></li>
      <li><a href="https://lava.corelab.mx" target="_blank">LAVA</a></li>
      <li><a href="${rootPath}lava-db.html">LAVA DB</a></li>
    </ul>
    <div class="nav-mobile-bottom">
      <button onclick="window.__setLang && window.__setLang(window.__lang==='es'?'en':'es')" class="lang-toggle">EN</button>
      <a href="${rootPath}index.html#contacto" class="nav-cta" data-i18n="nav.cta">Escríbenos</a>
    </div>
  </div>`;

  // FOOTER
  const footerHTML = `
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <img src="${logoSrc}" alt="CoreLab" style="height:24px;opacity:0.85;" />
        <p data-i18n="footer.tagline">Ayudamos a las empresas a crear mejores marcas. Estrategia, diseño y tecnología en un solo equipo.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/corelab.mx" target="_blank" rel="noopener" aria-label="Instagram" class="footer-social-link">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/corelabmx" target="_blank" rel="noopener" aria-label="LinkedIn" class="footer-social-link">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
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
      <p>CoreLab — Proyecto Core SA de CV 2026 ©</p>
      <a href="${rootPath}aviso-de-privacidad.html" data-i18n="footer.privacy">Aviso de Privacidad</a>
      <a href="mailto:hola@corelab.mx">hola@corelab.mx</a>
    </div>
  </footer>`;

  // LinkedIn Insight Tag
  (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);
  window._linkedin_partner_id="9252194";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(window._linkedin_partner_id);

  document.addEventListener('DOMContentLoaded', function () {
    // Inject nav before first element
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    // Inject footer at end
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Apply translations after injection
    if (window.__applyTranslations) window.__applyTranslations();

    // Hamburger menu
    const ham = document.getElementById('nav-ham');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    if (ham && mobileMenu) {
      function openMenu() {
        ham.classList.add('is-open');
        ham.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('is-open');
        mobileMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      function closeMenu() {
        ham.classList.remove('is-open');
        ham.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
      ham.addEventListener('click', () => {
        ham.classList.contains('is-open') ? closeMenu() : openMenu();
      });
      // Close on any link click inside the menu
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', closeMenu);
      });
      // Close on resize back to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
      });
    }

    // Dropdown PRODUCTOS — click toggle
    const prodBtn = document.getElementById('nav-productos-btn');
    const prodLi  = document.getElementById('nav-productos');
    if (prodBtn && prodLi) {
      prodBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        prodLi.classList.toggle('open');
      });
      // Cerrar al click fuera
      document.addEventListener('click', function () {
        prodLi.classList.remove('open');
      });
    }

    // Sync lang button text in mobile menu
    const origLang = document.getElementById('lang-toggle');
    const mobileLangBtns = document.querySelectorAll('.nav-mobile-bottom .lang-toggle');
    if (origLang && mobileLangBtns.length) {
      const obs = new MutationObserver(() => {
        mobileLangBtns.forEach(b => b.textContent = origLang.textContent);
      });
      obs.observe(origLang, { childList: true, characterData: true, subtree: true });
    }

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
