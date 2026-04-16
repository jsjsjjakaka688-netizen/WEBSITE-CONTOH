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
if (toggle) {
  toggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
}
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('active'));
});

// Full Height Hero
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) hero.style.minHeight = window.innerHeight + 'px';
}
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);
setHeroHeight();

// WhatsApp Order
const phone = '6281234567890';
function orderMessage(menu = '') {
  return `Halo Geprek Sambal Bawang!%0A%0A${menu ? `Saya mau pesan: *${menu}*%0A%0A` : ''}Mohon infokan total harga dan estimasi.%0A%0ATerima kasih! 🍗`;
}
function openOrder(menu = '') { window.open(`https://wa.me/${phone}?text=${orderMessage(menu)}`, '_blank'); }

document.querySelectorAll('.order-btn, .btn-card, #mainOrderBtn, #floatingOrder').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const menu = btn.getAttribute('data-menu') || '';
    openOrder(menu);
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.remove('active');
    }
  });
});

// Parallax
window.addEventListener('scroll', () => {
  const overlay = document.querySelector('.hero-overlay');
  if (overlay) overlay.style.transform = `translateY(${window.pageYOffset * 0.15}px)`;
});

console.log('%c🍗 GEPREK SAMBAL BAWANG — Spicy Chicken', 'font-size: 16px; font-weight: bold; color: #d4a017;');
console.log('%cDemo by PT STORE', 'font-size: 12px; color: #888;');