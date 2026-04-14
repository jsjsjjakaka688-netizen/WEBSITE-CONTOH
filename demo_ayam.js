// ==================== AOS INIT ====================
AOS.init({
  once: true,
  duration: 600,
  easing: 'ease-out'
});

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.03)';
  }
});

// ==================== MOBILE MENU ====================
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (toggle) {
  toggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
}

document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// ==================== WHATSAPP ORDER ====================
const phone = '6281234567890'; // Ganti dengan nomor WhatsApp bisnis

function orderMessage(menu = '') {
  let msg = `Halo Ayam Geprek Sambal Bawang,%0A%0ASaya ingin memesan:%0A`;
  if (menu) {
    msg += `- *${menu}*%0A`;
  } else {
    msg += `- (Lihat menu)%0A`;
  }
  msg += `%0AMohon infokan total harga dan estimasi pengiriman.%0A%0ATerima kasih.`;
  return msg;
}

function openOrder(menu = '') {
  window.open(`https://wa.me/${phone}?text=${orderMessage(menu)}`, '_blank');
}

// Main order button
const mainOrderBtn = document.getElementById('mainOrderBtn');
const floatingOrder = document.getElementById('floatingOrder');

if (mainOrderBtn) {
  mainOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openOrder();
  });
}

if (floatingOrder) {
  floatingOrder.addEventListener('click', (e) => {
    e.preventDefault();
    openOrder();
  });
}

// Menu order buttons
document.querySelectorAll('.menu-order-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const menu = this.getAttribute('data-menu') || '';
    openOrder(menu);
  });
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu) mobileMenu.classList.remove('active');
    }
  });
});

// ==================== FULL HEIGHT HERO FIX ====================
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.minHeight = window.innerHeight + 'px';
  }
}

window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);
setHeroHeight();

// ==================== CONSOLE ====================
console.log('%c🍗 Ayam Geprek Sambal Bawang', 'font-size: 16px; font-weight: bold; color: #e84a2d;');
console.log('%cDemo Website by PTStore', 'font-size: 12px; color: #6b4c3a;');