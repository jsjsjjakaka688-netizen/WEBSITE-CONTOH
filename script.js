// ==================== AOS INIT (OPTIMIZED) ====================
AOS.init({
  once: true,
  duration: 500,
  easing: 'ease-out',
  disable: window.innerWidth < 768 ? true : false,
  startEvent: 'DOMContentLoaded'
});

// ==================== DEBOUNCE FUNCTION ====================
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ==================== HEADER SCROLL EFFECT ====================
const header = document.getElementById('mainHeader');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
});

// ==================== MOBILE MENU TOGGLE ====================
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

// ==================== FAQ ACCORDION ====================
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const faqItem = this.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!isActive) {
      faqItem.classList.add('active');
    }
  });
});

// ==================== WHATSAPP INTEGRATION ====================
const phone = '6281548282195';

function waMessage(paket = '') {
  let msg = `Halo PTStore,%0A%0ASaya tertarik dengan jasa pembuatan website profesional.`;
  if (paket) msg += `%0A%0APaket pilihan: *${paket}*`;
  msg += `%0A%0ABisa infokan detail dan proses selanjutnya?%0A%0ATerima kasih.`;
  return msg;
}

function openWA(paket = '') {
  window.open(`https://wa.me/${phone}?text=${waMessage(paket)}`, '_blank');
}

const waMainBtn = document.getElementById('waMainBtn');
const floatingWa = document.getElementById('floatingWa');

if (waMainBtn) {
  waMainBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openWA();
  });
}

if (floatingWa) {
  floatingWa.addEventListener('click', (e) => {
    e.preventDefault();
    openWA();
  });
}

// Tombol Pilih Paket (Pricing) -> WhatsApp
document.querySelectorAll('.btn-paket').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const paket = btn.getAttribute('data-paket') || '';
    openWA(paket);
  });
});

// CATATAN: Link "Kunjungi Website" di section Demo sekarang langsung mengarah ke
// demo_ayam.html dan demo_pertanian.html (lihat href di index.html)
// Jadi TIDAK PERLU event listener khusus untuk demo link lagi

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

// ==================== TYPING ANIMATION ====================
const typingElement = document.querySelector('.typing-text');

if (typingElement) {
  const texts = ['Full-Stack Developer', 'Web Developer', 'UI/UX Designer'];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let delay = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      delay = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 300;
    }
    
    setTimeout(typeEffect, delay);
  }
  
  setTimeout(typeEffect, 800);
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 1200) {
  const start = 0;
  const startTime = performance.now();
  const hasPlus = element.textContent.includes('+');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);
    
    element.textContent = current + (hasPlus && current === target ? '+' : '');
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

const metricsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const metricNumbers = entry.target.querySelectorAll('.metric-number[data-target]');
      metricNumbers.forEach(metric => {
        const target = parseInt(metric.getAttribute('data-target'));
        if (!isNaN(target) && !metric.dataset.animated) {
          metric.dataset.animated = 'true';
          animateCounter(metric, target);
        }
      });
      metricsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroMetrics = document.querySelector('.hero-metrics');
if (heroMetrics) metricsObserver.observe(heroMetrics);

// ==================== LAZY LOADING ====================
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.loading = 'lazy';
  });
}

// ==================== SMOOTH HEADER HIDE/SHOW ====================
let lastScrollTop = 0;
const scrollThreshold = 80;

window.addEventListener('scroll', debounce(() => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 10), { passive: true });

header.style.transition = 'transform 0.3s ease, background 0.3s ease';

// ==================== CONSOLE GREETING ====================
console.log('%c🚀 PTStore — Jasa Website Profesional', 'font-size: 14px; font-weight: bold; color: #6366f1;');