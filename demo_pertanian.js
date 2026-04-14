// AOS Init
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// Header Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.08)' : 'none';
});

// Mobile Menu
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle) toggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

// Full Height Hero
function setHeroHeight() { const hero = document.querySelector('.hero'); if (hero && window.innerWidth > 768) hero.style.minHeight = window.innerHeight + 'px'; }
window.addEventListener('load', setHeroHeight); window.addEventListener('resize', setHeroHeight); setHeroHeight();

// WhatsApp Contact
const phone = '6281234567890';
function contactMessage(produk = '') { return `Halo Agro Sejahtera!%0A%0A${produk ? `Saya tertarik dengan produk: *${produk}*%0A%0A` : ''}Bisa infokan detail dan harga?%0A%0ATerima kasih. 🌾`; }
function openContact(produk = '') { window.open(`https://wa.me/${phone}?text=${contactMessage(produk)}`, '_blank'); }
document.querySelectorAll('.order-btn, .btn-card, #mainContactBtn, #floatingContact').forEach(btn => btn.addEventListener('click', e => { e.preventDefault(); openContact(btn.getAttribute('data-produk') || ''); }));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => anchor.addEventListener('click', function(e) {
  const href = this.getAttribute('href'); if (href === '#' || href === '') return;
  const target = document.querySelector(href); if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); mobileMenu?.classList.remove('active'); }
}));

// Counter Animation
function animateCounter(el, target, duration = 1500) {
  const start = 0, startTime = performance.now();
  function update(now) { const progress = Math.min((now - startTime) / duration, 1); el.textContent = Math.floor((1 - Math.pow(1 - progress, 3)) * target); if (progress < 1) requestAnimationFrame(update); }
  requestAnimationFrame(update);
}
const statsObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.querySelectorAll('.stat-number[data-target]').forEach(stat => { const target = parseInt(stat.dataset.target); if (!isNaN(target) && !stat.dataset.animated) { stat.dataset.animated = 'true'; animateCounter(stat, target); } }); statsObserver.unobserve(entry.target); } }), { threshold: 0.3 });
const heroStats = document.querySelector('.hero-stats'); if (heroStats) statsObserver.observe(heroStats);

// Parallax
window.addEventListener('scroll', () => { const overlay = document.querySelector('.hero-overlay'); if (overlay) overlay.style.transform = `translateY(${window.pageYOffset * 0.1}px)`; });

console.log('%c🌾 Agro Sejahtera — Premium Agriculture', 'font-size: 16px; font-weight: bold; color: #2e7d32;');
console.log('%cPremium Demo by PT STORE', 'font-size: 12px; color: #4a6a4a;');