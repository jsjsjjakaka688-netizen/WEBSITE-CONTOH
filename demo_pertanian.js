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

// ==================== WHATSAPP CONTACT ====================
const phone = '6281234567890'; // Ganti dengan nomor WhatsApp bisnis

function contactMessage(produk = '') {
  let msg = `Halo Agro Sejahtera,%0A%0ASaya tertarik dengan produk pertanian Anda.`;
  if (produk) {
    msg += `%0A%0AProduk yang diminati: *${produk}*`;
  }
  msg += `%0A%0ABisa infokan detail dan harga selengkapnya?%0A%0ATerima kasih.`;
  return msg;
}

function openContact(produk = '') {
  window.open(`https://wa.me/${phone}?text=${contactMessage(produk)}`, '_blank');
}

// Main contact button
const mainContactBtn = document.getElementById('mainContactBtn');
const floatingContact = document.getElementById('floatingContact');

if (mainContactBtn) {
  mainContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openContact();
  });
}

if (floatingContact) {
  floatingContact.addEventListener('click', (e) => {
    e.preventDefault();
    openContact();
  });
}

// Produk order buttons
document.querySelectorAll('.produk-order-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const produk = this.getAttribute('data-produk') || '';
    openContact(produk);
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

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 1500) {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Intersection Observer for counters
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number[data-target]');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!isNaN(target) && !stat.dataset.animated) {
          stat.dataset.animated = 'true';
          animateCounter(stat, target);
        }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

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
console.log('%c🌾 Agro Sejahtera — Solusi Pertanian Modern', 'font-size: 16px; font-weight: bold; color: #2e7d32;');
console.log('%cDemo Website by PTStore', 'font-size: 12px; color: #4a6a4a;');