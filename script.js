// Navbar Hide on Scroll Down, Show on Scroll Up
(function () {
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    const scrollThreshold = 5; // minimum scroll to trigger

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Scrolling DOWN past header height → hide
            header.classList.add('header--hidden');
        } else {
            // Scrolling UP → show
            header.classList.remove('header--hidden');
        }

        lastScrollY = currentScrollY;
    });
})();

// Services Tabs Logic
(function () {
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabItems.forEach(tab => tab.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked tab
            item.classList.add('active');

            // Show corresponding panel
            const targetId = item.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
})();

// Mega Menu Hover Logic
(function () {
    const megaTabs = document.querySelectorAll('.mega-menu-tab');
    const megaPanels = document.querySelectorAll('.mega-menu-panel');

    megaTabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            // Remove active class from all tabs and panels
            megaTabs.forEach(t => t.classList.remove('active'));
            megaPanels.forEach(p => p.classList.remove('active'));

            // Add active class to hovered tab
            tab.classList.add('active');

            // Show corresponding panel
            const targetId = tab.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
})();

// ========================================
// Mobile Hamburger Menu
// ========================================
(function () {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.mobile-overlay');
    const megaMenu = document.querySelector('.dropdown-menu.mega-menu');

    if (!hamburger || !nav) return;

    function openMenu() {
        hamburger.classList.add('active');
        nav.classList.add('mobile-open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('mobile-open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
        // Collapse services dropdown
        if (megaMenu) {
            megaMenu.classList.remove('mobile-expanded');
            const parentLink = megaMenu.closest('.has-dropdown').querySelector('.nav-link');
            if (parentLink) parentLink.classList.remove('accordion-open');
        }
    }

    hamburger.addEventListener('click', () => {
        if (nav.classList.contains('mobile-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    if (overlay) {
        overlay.addEventListener('click', closeMenu);
    }

    // Close menu when a nav link (non-Services) is clicked
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Don't close if it's the Services link on mobile (let accordion handle it)
            const parentItem = link.closest('.has-dropdown');
            if (parentItem && window.innerWidth <= 768) {
                e.preventDefault();
                if (megaMenu) megaMenu.classList.toggle('mobile-expanded');
                link.classList.toggle('accordion-open');
                return;
            }
            closeMenu();
        });
    });

    // Close menu when a mega-menu link is clicked
    const megaLinks = nav.querySelectorAll('.mega-menu-item');
    megaLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close on window resize past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
})();

// ========================================
// Gallery Filtering Logic
// ========================================
(function () {
    const filterButtons = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to current
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    item.classList.remove('hide');
                    // Add a tiny delay for animation to trigger
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 300); // Wait for transition
                }
            });
        });
    });
})();
