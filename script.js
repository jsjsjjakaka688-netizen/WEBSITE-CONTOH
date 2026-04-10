// ========================================
// AYAM GEPREK NUSANTARA - JAVASCRIPT
// ========================================

// Data Menu
const menuItems = [
    {
        id: 1,
        name: "Ayam Geprek Original",
        description: "Ayam goreng crispy dengan sambal merah pedas khas",
        price: 25000,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop",
        spicy: 2,
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Ayam Geprek Keju",
        description: "Ayam geprek dengan melted mozzarella cheese",
        price: 32000,
        image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400&h=300&fit=crop",
        spicy: 1,
        badge: "Favorit"
    },
    {
        id: 3,
        name: "Ayam Geprek Mozarella",
        description: "Keju mozarella stretchy yang menggoda selera",
        price: 35000,
        image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=400&h=300&fit=crop",
        spicy: 2,
        badge: null
    },
    {
        id: 4,
        name: "Sambal Matah",
        description: "Ayam geprek dengan sambal matah khas Bali",
        price: 28000,
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400&h=300&fit=crop",
        spicy: 2,
        badge: null
    },
    {
        id: 5,
        name: "Sambal Ijo",
        description: "Ayam geprek dengan sambal ijo yang nikmat",
        price: 27000,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
        spicy: 3,
        badge: "Pedas"
    },
    {
        id: 6,
        name: "Sambal Terasi",
        description: "Ayam geprek dengan sambal terasi tradisional",
        price: 26000,
        image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
        spicy: 2,
        badge: null
    },
    {
        id: 7,
        name: "Paket Komplit",
        description: "Ayam, nasi, tahu, tempe, dan sayuran segar",
        price: 38000,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
        spicy: 2,
        badge: "Hemat"
    },
    {
        id: 8,
        name: "Salted Egg",
        description: "Ayam geprek dengan saus telur asin creamy",
        price: 34000,
        image: "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop",
        spicy: 1,
        badge: null
    }
];

// Data Testimonials
const testimonials = [
    {
        id: 1,
        name: "Dewi Santika",
        role: "Food Blogger",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        rating: 5,
        text: "Ayam geprek terenak yang pernah saya coba! Sambalnya pedasnya pas dan ayamnya super crispy. Recommended banget!"
    },
    {
        id: 2,
        name: "Andi Wijaya",
        role: "Pelanggan Setia",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        rating: 5,
        text: "Pelayanan cepat, harga terjangkau, dan rasanya luar biasa. Sudah 3 bulan jadi langganan di sini."
    },
    {
        id: 3,
        name: "Maya Sari",
        role: "Ibu Rumah Tangga",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        rating: 5,
        text: "Anak-anak suka banget sama Ayam Geprek Keju-nya. Porsinya juga pas dan higienis."
    }
];

// ========================================
// CART STATE
// ========================================

let cart = [];
let selectedPaymentMethod = 'dana';
let uploadedProof = null;

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format price to Indonesian Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

// Generate spicy level icons
function generateSpicyIcons(level) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        const className = i < level ? 'active' : 'inactive';
        html += `<svg class="spicy-icon ${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;
    }
    return html;
}

// Generate star rating icons
function generateStarRating(rating) {
    let html = '';
    for (let i = 0; i < 5; i++) {
        const className = i < rating ? 'filled' : 'empty';
        html += `<svg class="star-icon ${className}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    return html;
}

// ========================================
// RENDER FUNCTIONS
// ========================================

// Render menu items
function renderMenu() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    menuGrid.innerHTML = menuItems.map((item, index) => `
        <div class="menu-card" data-id="${item.id}" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="menu-image-wrapper">
                <img src="${item.image}" alt="${item.name}" class="menu-image" loading="lazy">
                ${item.badge ? `<span class="menu-badge">${item.badge}</span>` : ''}
                <div class="menu-spicy">
                    ${generateSpicyIcons(item.spicy)}
                </div>
            </div>
            <div class="menu-content">
                <h3 class="menu-name">${item.name}</h3>
                <p class="menu-desc">${item.description}</p>
                <div class="menu-footer-card">
                    <p class="menu-price">${formatPrice(item.price)}</p>
                    <button class="menu-add-btn" onclick="addToCart(${item.id})" aria-label="Tambah ke keranjang">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Render testimonials
function renderTestimonials() {
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (!testimonialsGrid) return;

    testimonialsGrid.innerHTML = testimonials.map((testi, index) => `
        <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="testimonial-stars">
                ${generateStarRating(testi.rating)}
            </div>
            <p class="testimonial-text">"${testi.text}"</p>
            <div class="testimonial-author">
                <img src="${testi.image}" alt="${testi.name}" class="testimonial-avatar" loading="lazy">
                <div>
                    <h4 class="testimonial-name">${testi.name}</h4>
                    <p class="testimonial-role">${testi.role}</p>
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// CART FUNCTIONALITY
// ========================================

function addToCart(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    if (!item) return;

    const existingItem = cart.find(c => c.id === itemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1
        });
    }

    updateCartUI();
    showNotification(`${item.name} ditambahkan ke keranjang!`);
    
    // Animate cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('bounce');
    setTimeout(() => cartBtn.classList.remove('bounce'), 500);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update cart count
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    
    // Animate count
    if (totalItems > 0) {
        cartCount.classList.add('pulse');
        setTimeout(() => cartCount.classList.remove('pulse'), 300);
    }

    // Update cart items
    if (cart.length === 0) {
        cartEmpty.style.display = 'flex';
        cartItems.style.display = 'none';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'flex';
        cartFooter.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <div class="cart-item-actions">
                        <div class="cart-quantity">
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                            <span class="cart-qty-value">${item.quantity}</span>
                            <button class="cart-qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        cartTotalPrice.textContent = formatPrice(totalPrice);
    }
}

function openCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCartModal() {
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// PAYMENT MODAL
// ========================================

function openPaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    const paymentItems = document.getElementById('paymentItems');
    const paymentTotal = document.getElementById('paymentTotal');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    paymentItems.innerHTML = cart.map(item => `
        <div class="payment-item">
            <span class="payment-item-name">${item.name} x${item.quantity}</span>
            <span class="payment-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    paymentTotal.textContent = formatPrice(totalPrice);

    closeCartModal();
    setTimeout(() => {
        paymentModal.classList.add('active');
    }, 300);
}

function closePaymentModal() {
    const paymentModal = document.getElementById('paymentModal');
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// PAYMENT DETAIL MODAL
// ========================================

function openPaymentDetailModal() {
    const paymentDetailModal = document.getElementById('paymentDetailModal');
    const paymentDetailAmount = document.getElementById('paymentDetailAmount');
    const danaSection = document.getElementById('danaSection');
    const qrisSection = document.getElementById('qrisSection');
    const shopeepaySection = document.getElementById('shopeepaySection');
    const paymentDetailTitle = document.getElementById('paymentDetailTitle');

    // Hide all sections first
    danaSection.style.display = 'none';
    qrisSection.style.display = 'none';
    shopeepaySection.style.display = 'none';

    // Show selected payment section
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    paymentDetailAmount.textContent = formatPrice(totalPrice);

    const paymentNames = {
        'dana': 'Pembayaran DANA',
        'qris': 'Pembayaran QRIS',
        'shopeepay': 'Pembayaran ShopeePay'
    };

    paymentDetailTitle.textContent = paymentNames[selectedPaymentMethod];

    switch(selectedPaymentMethod) {
        case 'dana':
            danaSection.style.display = 'block';
            break;
        case 'qris':
            qrisSection.style.display = 'block';
            break;
        case 'shopeepay':
            shopeepaySection.style.display = 'block';
            break;
    }

    closePaymentModal();
    setTimeout(() => {
        paymentDetailModal.classList.add('active');
    }, 300);
}

function closePaymentDetailModal() {
    const paymentDetailModal = document.getElementById('paymentDetailModal');
    paymentDetailModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// COPY TO CLIPBOARD
// ========================================

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const text = element.textContent.replace(/-/g, '');
    
    navigator.clipboard.writeText(text).then(() => {
        // Find the button and show copied state
        const btn = element.parentElement.querySelector('.copy-btn');
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Tersalin!
        `;
        btn.classList.add('copied');
        
        showNotification('Nomor berhasil disalin!');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        showNotification('Gagal menyalin nomor', 'error');
    });
}

// ========================================
// FILE UPLOAD
// ========================================

function initFileUpload() {
    const uploadArea = document.getElementById('uploadArea');
    const paymentProof = document.getElementById('paymentProof');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    const uploadRemove = document.getElementById('uploadRemove');

    if (!uploadArea) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        if (!uploadedProof) {
            paymentProof.click();
        }
    });

    // File input change
    paymentProof.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFileUpload(file);
        } else {
            showNotification('Hanya file gambar yang diperbolehkan', 'error');
        }
    });

    // Remove upload
    uploadRemove.addEventListener('click', (e) => {
        e.stopPropagation();
        uploadedProof = null;
        paymentProof.value = '';
        uploadPlaceholder.style.display = 'block';
        uploadPreview.style.display = 'none';
        uploadArea.classList.remove('has-file');
    });

    function handleFileUpload(file) {
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showNotification('Ukuran file maksimal 5MB', 'error');
            return;
        }

        // Check file type
        if (!file.type.startsWith('image/')) {
            showNotification('Hanya file gambar yang diperbolehkan', 'error');
            return;
        }

        uploadedProof = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
            uploadPlaceholder.style.display = 'none';
            uploadPreview.style.display = 'block';
            uploadArea.classList.add('has-file');
            showNotification('Bukti pembayaran berhasil diupload!');
        };
        reader.readAsDataURL(file);
    }
}

// ========================================
// CONFIRM PAYMENT
// ========================================

function confirmPayment() {
    if (!uploadedProof) {
        showNotification('Silakan upload bukti pembayaran terlebih dahulu!', 'error');
        return;
    }

    const btnConfirmPayment = document.getElementById('btnConfirmPayment');
    btnConfirmPayment.disabled = true;
    btnConfirmPayment.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        Memproses...
    `;

    // Simulate processing
    setTimeout(() => {
        closePaymentDetailModal();
        
        // Show success modal with details
        const successDetails = document.getElementById('successDetails');
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const paymentNames = {
            'dana': 'DANA',
            'qris': 'QRIS',
            'shopeepay': 'ShopeePay'
        };

        successDetails.innerHTML = `
            <div class="success-detail-item">
                <span>Metode Pembayaran</span>
                <span>${paymentNames[selectedPaymentMethod]}</span>
            </div>
            <div class="success-detail-item">
                <span>Total Pembayaran</span>
                <span>${formatPrice(totalPrice)}</span>
            </div>
            <div class="success-detail-item">
                <span>Status</span>
                <span style="color: #10B981;">Menunggu Verifikasi</span>
            </div>
        `;

        setTimeout(() => {
            showSuccessModal();
            
            // Reset everything
            cart = [];
            uploadedProof = null;
            updateCartUI();
            
            // Reset upload area
            const uploadPlaceholder = document.getElementById('uploadPlaceholder');
            const uploadPreview = document.getElementById('uploadPreview');
            const uploadArea = document.getElementById('uploadArea');
            const paymentProof = document.getElementById('paymentProof');
            
            if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
            if (uploadPreview) uploadPreview.style.display = 'none';
            if (uploadArea) uploadArea.classList.remove('has-file');
            if (paymentProof) paymentProof.value = '';
            
            // Reset button
            btnConfirmPayment.disabled = false;
            btnConfirmPayment.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Konfirmasi Pembayaran
            `;
        }, 300);
    }, 1500);
}

// ========================================
// SUCCESS MODAL
// ========================================

function showSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.add('active');
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// NOTIFICATION
// ========================================

function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${type === 'success' 
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
            }
        </svg>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = mobileToggle?.querySelector('.menu-icon');
    const closeIcon = mobileToggle?.querySelector('.close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileToggle?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('active');
        menuIcon?.classList.toggle('hidden');
        closeIcon?.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            menuIcon?.classList.remove('hidden');
            closeIcon?.classList.add('hidden');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// CART MODAL EVENTS
// ========================================

function initCartModal() {
    const cartBtn = document.getElementById('cartBtn');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const btnOrder = document.getElementById('btnOrder');

    cartBtn?.addEventListener('click', openCartModal);
    cartClose?.addEventListener('click', closeCartModal);
    cartOverlay?.addEventListener('click', closeCartModal);
    btnOrder?.addEventListener('click', openPaymentModal);
}

// ========================================
// PAYMENT MODAL EVENTS
// ========================================

function initPaymentModal() {
    const paymentBack = document.getElementById('paymentBack');
    const paymentOverlay = document.getElementById('paymentOverlay');
    const btnContinue = document.getElementById('btnContinue');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    paymentBack?.addEventListener('click', () => {
        closePaymentModal();
        setTimeout(() => openCartModal(), 300);
    });

    paymentOverlay?.addEventListener('click', closePaymentModal);
    
    btnContinue?.addEventListener('click', () => {
        openPaymentDetailModal();
    });

    // Track selected payment method
    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            selectedPaymentMethod = e.target.value;
        });
    });
}

// ========================================
// PAYMENT DETAIL MODAL EVENTS
// ========================================

function initPaymentDetailModal() {
    const paymentDetailBack = document.getElementById('paymentDetailBack');
    const paymentDetailOverlay = document.getElementById('paymentDetailOverlay');
    const btnConfirmPayment = document.getElementById('btnConfirmPayment');

    paymentDetailBack?.addEventListener('click', () => {
        closePaymentDetailModal();
        setTimeout(() => {
            const paymentModal = document.getElementById('paymentModal');
            paymentModal.classList.add('active');
        }, 300);
    });

    paymentDetailOverlay?.addEventListener('click', closePaymentDetailModal);
    btnConfirmPayment?.addEventListener('click', confirmPayment);
}

// ========================================
// SUCCESS MODAL EVENTS
// ========================================

function initSuccessModal() {
    const btnSuccess = document.getElementById('btnSuccess');
    btnSuccess?.addEventListener('click', closeSuccessModal);
}

// ========================================
// COUNTER ANIMATION
// ========================================

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString('id-ID') + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString('id-ID') + '+';
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// ========================================
// PARALLAX EFFECT
// ========================================

function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    });
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });

    // Render content
    renderMenu();
    renderTestimonials();
    
    // Initialize functions
    initNavigation();
    initCartModal();
    initPaymentModal();
    initPaymentDetailModal();
    initFileUpload();
    initSuccessModal();
    initCounterAnimation();
    initParallax();
    updateCartUI();

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn?.addEventListener('click', () => {
        showNotification('Fitur coming soon!');
    });
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .spin {
        animation: spin 1s linear infinite;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCartModal();
        closePaymentModal();
        closePaymentDetailModal();
        closeSuccessModal();
    }
});
