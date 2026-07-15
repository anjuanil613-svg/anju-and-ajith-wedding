// ═══════════════════════════════════════════════════════════════
// KERALA WEDDING INVITATION - MAIN SCRIPT
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    populateContent();
    initCountdown();
    initScrollAnimations();
    initNavbar();
    initMusic();
    initWishesForm();
    initGalleryLightbox();
});

// ── Preloader ───────────────────────────────────────────────
function initPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('hidden');
        }, 1500);
    });
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 4000);
}

// ── Populate All Content from Config ────────────────────────
function populateContent() {
    const C = WEDDING_CONFIG;

    // Hero
    document.getElementById('hero-groom-name').textContent = C.groom.name;
    document.getElementById('hero-bride-name').textContent = C.bride.name;
    document.getElementById('hero-malayalam-names').textContent =
        C.bride.malayalamName + '  &  ' + C.groom.malayalamName;

    const weddingDate = new Date(C.wedding.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('hero-date').textContent = weddingDate.toLocaleDateString('en-IN', options);
    document.getElementById('hero-muhurtham').textContent = 'Muhurtham: ' + C.wedding.muhurtham;

    // Couple
    setPhoto('groom-photo', C.groom.photo, 'Groom\'s Photo');
    setPhoto('bride-photo', C.bride.photo, 'Bride\'s Photo');
    document.getElementById('groom-name').textContent = C.groom.name;
    document.getElementById('bride-name').textContent = C.bride.name;
    document.getElementById('groom-malayalam').textContent = C.groom.malayalamName;
    document.getElementById('bride-malayalam').textContent = C.bride.malayalamName;
    document.getElementById('groom-description').textContent = C.groom.description;
    document.getElementById('bride-description').textContent = C.bride.description;
    document.getElementById('groom-family').textContent = C.groom.family;
    document.getElementById('bride-family').textContent = C.bride.family;

    // Events
    const eventsContainer = document.getElementById('events-container');
    const eventIcons = ['fa-ring', 'fa-snowflake', 'fa-champagne-glasses'];
    C.events.forEach((evt, i) => {
        const dateObj = new Date(evt.date);
        const dateStr = dateObj.toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
        eventsContainer.innerHTML += `
            <div class="event-item animate-on-scroll">
                <div class="event-dot"><i class="fas ${eventIcons[i] || 'fa-calendar'}"></i></div>
                <div class="event-details">
                    <div class="event-name">${evt.name}</div>
                    <div class="event-name-malayalam">${evt.nameMalayalam}</div>
                    <div class="event-info">
                        <span><i class="fas fa-calendar-day"></i> ${dateStr}</span>
                        <span><i class="fas fa-clock"></i> ${evt.time}</span>
                        <span><i class="fas fa-location-dot"></i> ${evt.venue}</span>
                    </div>
                </div>
            </div>`;
    });

    // Family
    const groomFam = document.getElementById('groom-family-list');
    const brideFam = document.getElementById('bride-family-list');
    if (groomFam && brideFam) {
        C.family.groomSide.forEach(m => {
            groomFam.innerHTML += familyMemberHTML(m);
        });
        C.family.brideSide.forEach(m => {
            brideFam.innerHTML += familyMemberHTML(m);
        });
    }

    // Gallery
    const galleryContainer = document.getElementById('gallery-container');
    C.gallery.forEach((src, i) => {
        galleryContainer.innerHTML += `
            <div class="gallery-item animate-on-scroll" data-index="${i}">
                <img src="${src}" alt="Gallery ${i + 1}" onerror="this.parentElement.innerHTML='<div class=\\'gallery-placeholder\\'><i class=\\'fas fa-image\\'></i><span>Photo ${i + 1}</span></div>'">
            </div>`;
    });

    // Venue
    document.getElementById('venue-name').textContent = C.wedding.venue.name;
    document.getElementById('venue-address').textContent = C.wedding.venue.address;
    document.getElementById('venue-maps-link').href = C.wedding.venue.mapsUrl;
    document.getElementById('venue-map').src = C.wedding.venue.embedUrl;

    // Contact
    const contactGroomName = document.getElementById('contact-groom-name');
    const contactBrideName = document.getElementById('contact-bride-name');
    if (contactGroomName) contactGroomName.textContent = C.groom.name;
    if (contactBrideName) contactBrideName.textContent = C.bride.name;
    const groomCall = document.getElementById('groom-call');
    const brideCall = document.getElementById('bride-call');
    const groomWa = document.getElementById('groom-whatsapp');
    const brideWa = document.getElementById('bride-whatsapp');
    if (groomCall) groomCall.href = 'tel:' + C.contact.groomPhone;
    if (brideCall) brideCall.href = 'tel:' + C.contact.bridePhone;
    if (groomWa) groomWa.href = 'https://wa.me/' + C.contact.groomWhatsApp;
    if (brideWa) brideWa.href = 'https://wa.me/' + C.contact.brideWhatsApp;

    // Footer
    document.getElementById('footer-names').textContent = C.bride.name + ' & ' + C.groom.name;
    document.getElementById('footer-date').textContent = weddingDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

    // Page title
    document.title = C.bride.name + ' & ' + C.groom.name + ' - Wedding Invitation';
}

function setPhoto(elementId, src, alt) {
    const el = document.getElementById(elementId);
    el.innerHTML = `<img src="${src}" alt="${alt}" onerror="this.parentElement.innerHTML='<div class=\\'photo-placeholder\\'><i class=\\'fas fa-user\\'></i><span>${alt}</span></div>'">`;
}

function familyMemberHTML(member) {
    return `
        <div class="family-member">
            <div class="family-member-icon"><i class="fas fa-user"></i></div>
            <div class="family-member-info">
                <span class="family-member-name">${member.name}</span>
                <span class="family-member-relation">${member.relation}</span>
            </div>
        </div>`;
}

// ── Countdown Timer ─────────────────────────────────────────
function initCountdown() {
    const target = new Date(WEDDING_CONFIG.wedding.date).getTime();

    function update() {
        const now = Date.now();
        const diff = target - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.querySelector('.save-the-date').textContent = '~ Wedding Day! ~';
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        document.getElementById('days').textContent = String(d).padStart(2, '0');
        document.getElementById('hours').textContent = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

// ── Scroll Animations ──────────────────────────────────────
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ── Navbar ──────────────────────────────────────────────────
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === current) {
                link.classList.add('active');
            }
        });
    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ── Music ───────────────────────────────────────────────────
function initMusic() {
    const btn = document.getElementById('music-btn');
    const icon = document.getElementById('music-icon');
    const audio = new Audio(WEDDING_CONFIG.music.src);
    audio.loop = true;
    audio.volume = 1.0;
    let started = false;

    function tryPlay() {
        if (!started) {
            audio.play().then(() => {
                icon.className = 'fas fa-volume-high';
                btn.classList.add('playing');
            }).catch(() => {});
            started = true;
        }
    }

    document.addEventListener('click', tryPlay);
    document.addEventListener('scroll', tryPlay);
    document.addEventListener('touchstart', tryPlay);

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play();
            icon.className = 'fas fa-volume-high';
            btn.classList.add('playing');
        } else {
            audio.pause();
            icon.className = 'fas fa-volume-xmark';
            btn.classList.remove('playing');
        }
    });
}

// ── Wishes Form ─────────────────────────────────────────────
function initWishesForm() {
    const form = document.getElementById('wishes-form');
    const list = document.getElementById('wishes-list');

    // Load existing wishes from localStorage
    let wishes = JSON.parse(localStorage.getItem('wedding-wishes') || '[]');
    renderWishes();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('wish-name').value.trim();
        const message = document.getElementById('wish-message').value.trim();
        if (!name || !message) return;

        wishes.unshift({
            name,
            message,
            time: new Date().toLocaleString('en-IN')
        });

        localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
        form.reset();
        renderWishes();
    });

    function renderWishes() {
        list.innerHTML = '';
        wishes.forEach(w => {
            list.innerHTML += `
                <div class="wish-card animate-on-scroll">
                    <div class="wish-card-name">${escapeHtml(w.name)}</div>
                    <div class="wish-card-message">"${escapeHtml(w.message)}"</div>
                    <div class="wish-card-time">${w.time}</div>
                </div>`;
        });

        // Re-observe new elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        list.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    }
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// ── Gallery Lightbox ────────────────────────────────────────
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    let currentIndex = 0;
    let images = [];

    document.getElementById('gallery-container').addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (!item) return;

        images = Array.from(document.querySelectorAll('.gallery-item img'));
        currentIndex = parseInt(item.dataset.index);
        openLightbox();
    });

    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', () => navigate(-1));
    document.getElementById('lightbox-next').addEventListener('click', () => navigate(1));

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
    });

    function openLightbox() {
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex].src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigate(dir) {
        currentIndex = (currentIndex + dir + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }
}
