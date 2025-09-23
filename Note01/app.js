// NotebookLM Guide Interactive Functions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initFeatureCards();
    initUseCaseTabs();
    initScrollAnimations();
    initHeroCTA();
    initMobileNav();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            let targetElement;
            
            // Special handling for overview which should go to hero
            if (targetId === 'overview') {
                targetElement = document.querySelector('.hero');
            } else {
                targetElement = document.getElementById(targetId);
            }
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Highlight active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = 'overview';
        const scrollPos = window.scrollY + 100;
        
        const sections = [
            { id: 'overview', element: document.querySelector('.hero') },
            { id: 'core-features', element: document.getElementById('core-features') },
            { id: 'version-comparison', element: document.getElementById('version-comparison') },
            { id: 'new-features', element: document.getElementById('new-features') },
            { id: 'use-cases', element: document.getElementById('use-cases') },
            { id: 'download', element: document.getElementById('download') }
        ];
        
        sections.forEach(section => {
            if (section.element && 
                section.element.offsetTop <= scrollPos && 
                section.element.offsetTop + section.element.offsetHeight > scrollPos) {
                current = section.id;
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
        
        // Add scroll effect to nav
        const nav = document.querySelector('.nav-fixed');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(19, 52, 59, 0.98)';
                nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(19, 52, 59, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }
    });
}

// Feature cards expand/collapse functionality
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const details = card.querySelector('.feature-details');
        
        if (expandBtn && details) {
            expandBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isHidden = details.classList.contains('hidden');
                
                if (isHidden) {
                    // Expand
                    details.classList.remove('hidden');
                    details.style.display = 'block';
                    details.classList.add('fade-in');
                    expandBtn.textContent = '收起';
                    expandBtn.classList.remove('btn--secondary');
                    expandBtn.classList.add('btn--primary');
                } else {
                    // Collapse
                    details.classList.add('hidden');
                    details.style.display = 'none';
                    expandBtn.textContent = '了解更多';
                    expandBtn.classList.remove('btn--primary');
                    expandBtn.classList.add('btn--secondary');
                }
            });
        }
    });
}

// Use case tabs functionality
function initUseCaseTabs() {
    const caseTabs = document.querySelectorAll('.case-tab');
    const casePanels = document.querySelectorAll('.case-panel');
    
    caseTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetCase = this.getAttribute('data-case');
            
            // Remove active class from all tabs and panels
            caseTabs.forEach(t => t.classList.remove('active'));
            casePanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Find and activate the corresponding panel
            const targetPanel = document.querySelector(`[data-case="${targetCase}"].case-panel`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Scroll animations for elements
function initScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        const animateElements = document.querySelectorAll(`
            .overview-card,
            .feature-card,
            .timeline-item,
            .download-card,
            .comparison-column
        `);
        animateElements.forEach(el => {
            el.classList.add('fade-in');
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .overview-card,
        .feature-card,
        .timeline-item,
        .download-card,
        .comparison-column
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Hero CTA button functionality
function initHeroCTA() {
    const heroCTA = document.querySelector('.hero-cta');
    
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            const overviewSection = document.getElementById('overview');
            if (overviewSection) {
                const offsetTop = overviewSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Mobile navigation toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('active');
            
            // Update toggle icon
            if (navMenu.classList.contains('active')) {
                this.innerHTML = '✕';
            } else {
                this.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            }
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            });
        });
    }
}

// Enhanced smooth scrolling for all internal links
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        if (link.classList.contains('nav-link')) return; // Skip nav links (handled separately)
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add parallax effect to hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            
            if (scrolled < hero.offsetHeight) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
}

// Loading animation
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero content
        const heroContent = document.querySelector('.hero-content');
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroContent) {
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateX(0)';
            }, 200);
        }
        
        if (heroVisual) {
            setTimeout(() => {
                heroVisual.style.opacity = '1';
                heroVisual.style.transform = 'translateX(0)';
            }, 400);
        }
    });
}

// Enhanced feature card interactions
function initEnhancedFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key to close expanded cards
        if (e.key === 'Escape') {
            const expandedDetails = document.querySelectorAll('.feature-details:not(.hidden)');
            expandedDetails.forEach(detail => {
                detail.classList.add('hidden');
                detail.style.display = 'none';
                const card = detail.closest('.feature-card');
                const btn = card.querySelector('.expand-btn');
                if (btn) {
                    btn.textContent = '了解更多';
                    btn.classList.remove('btn--primary');
                    btn.classList.add('btn--secondary');
                }
            });
            
            // Close mobile menu
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.innerHTML = '☰';
            }
        }
        
        // Arrow keys for tab navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.case-tab.active');
            if (activeTab) {
                const tabs = Array.from(document.querySelectorAll('.case-tab'));
                const currentIndex = tabs.indexOf(activeTab);
                let nextIndex;
                
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % tabs.length;
                } else {
                    nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[nextIndex].click();
            }
        }
    });
}

// Initialize enhanced features after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure all elements are rendered
    setTimeout(() => {
        initSmoothScrolling();
        initParallaxEffect();
        initEnhancedFeatureCards();
        initKeyboardNavigation();
    }, 100);
});

// Initialize on page load for fallback
window.addEventListener('load', function() {
    initLoadingAnimation();
});

// Add CSS for better interactions
const additionalStyles = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        background: rgba(19, 52, 59, 0.98);
        backdrop-filter: blur(12px);
        flex-direction: column;
        padding: var(--space-16);
        gap: var(--space-16);
        transform: translateY(-100%);
        opacity: 0;
        transition: all var(--duration-normal) var(--ease-standard);
        border-bottom: 1px solid var(--color-border);
        z-index: 999;
    }
    
    .nav-menu.active {
        transform: translateY(0);
        opacity: 1;
        display: flex;
    }
    
    .nav-link {
        font-size: var(--font-size-lg);
        padding: var(--space-12) 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-link:last-child {
        border-bottom: none;
    }
}

.feature-details {
    transition: all var(--duration-normal) var(--ease-standard);
}

.feature-details.hidden {
    display: none !important;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.fade-in {
    animation: fadeIn 0.6s var(--ease-standard) forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.case-panel {
    transition: all var(--duration-normal) var(--ease-standard);
}

.case-panel:not(.active) {
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
}

.case-panel.active {
    opacity: 1;
    pointer-events: all;
    transform: translateY(0);
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Debug function for troubleshooting
function debugElements() {
    console.log('Navigation links:', document.querySelectorAll('.nav-link'));
    console.log('Feature cards:', document.querySelectorAll('.feature-card'));
    console.log('Case tabs:', document.querySelectorAll('.case-tab'));
    console.log('Case panels:', document.querySelectorAll('.case-panel'));
}

// Export functions for potential external use
window.NotebookLMGuide = {
    initNavigation,
    initFeatureCards,
    initUseCaseTabs,
    initScrollAnimations,
    debugElements
};