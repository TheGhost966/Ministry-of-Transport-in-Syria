// ===================================
// Ministry of Transport - Custom JavaScript
// ===================================

// Initialize Swiper and Sidebar when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper
    const swiper = new Swiper('.mySwiper', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
    });

    // ===== SIDEBAR SCROLL FIX =====
    const sidebar = document.getElementById('sidebar');
    const body = document.body;
    
    if (sidebar) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'class') {
                    if (sidebar.classList.contains('inactive')) {
                        body.classList.remove('sidebar-active');
                    } else {
                        body.classList.add('sidebar-active');
                    }
                }
            });
        });
        
        observer.observe(sidebar, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        const sidebarInner = sidebar.querySelector('.inner');
        if (sidebarInner) {
            sidebarInner.addEventListener('wheel', function(e) {
                const isScrollable = this.scrollHeight > this.clientHeight;
                
                if (isScrollable) {
                    const isAtTop = this.scrollTop === 0;
                    const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight;
                    
                    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                        e.preventDefault();
                    }
                    
                    e.stopPropagation();
                }
            }, { passive: false });
            
            let touchStartY = 0;
            
            sidebarInner.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });
            
            sidebarInner.addEventListener('touchmove', function(e) {
                const touchY = e.touches[0].clientY;
                const touchDelta = touchStartY - touchY;
                const isScrollable = this.scrollHeight > this.clientHeight;
                
                if (isScrollable) {
                    const isAtTop = this.scrollTop === 0;
                    const isAtBottom = this.scrollTop + this.clientHeight >= this.scrollHeight;
                    
                    if ((isAtTop && touchDelta < 0) || (isAtBottom && touchDelta > 0)) {
                        e.preventDefault();
                    }
                    
                    e.stopPropagation();
                }
            }, { passive: false });
        }
    }
});

// ===== MODAL FUNCTIONS =====
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = "none";
        });
        document.body.style.overflow = "auto";
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#menu') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});


let lastScroll = 0;

window.addEventListener("scroll", function() {
    const navbar = document.querySelector(".navbar");
    const current = window.pageYOffset;

    if (current > lastScroll) {
        navbar.style.transform = "translateY(-100%)"; // hide
    } else {
        navbar.style.transform = "translateY(0)"; // show
    }

    lastScroll = current;
});



 function toggleMenu() {
            const menu = document.getElementById('navbarMenu');
            menu.classList.toggle('active');
        }

        // Mobile dropdown toggle
        document.querySelectorAll('.dropdown > a').forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const navbar = document.querySelector('.navbar');
            const menu = document.getElementById('navbarMenu');
            
            if (!navbar.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });

// ===== SCROLL TO TOP BUTTON =====
window.addEventListener('load', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});