// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        setTimeout(function() {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Specifications tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Parts catalog filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const partCards = document.querySelectorAll('.part-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide parts based on filter
            partCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Parts search functionality
    const searchInput = document.getElementById('parts-search-input');
    const searchBtn = document.querySelector('.search-btn');

    function searchParts() {
        const searchTerm = searchInput.value.toLowerCase();
        
        partCards.forEach(card => {
            const partName = card.querySelector('h3').textContent.toLowerCase();
            const partDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (partName.includes(searchTerm) || partDesc.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', searchParts);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchParts();
        }
    });

    // Gallery filtering
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            galleryFilterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    let currentImageIndex = 0;
    let filteredGalleryItems = [];

    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get currently visible gallery items based on active filter
            const activeFilter = document.querySelector('.gallery-filter-btn.active').getAttribute('data-filter');
            filteredGalleryItems = Array.from(galleryItems).filter(item => {
                return activeFilter === 'all' || item.getAttribute('data-category') === activeFilter;
            });
            
            // Find index in filtered items
            currentImageIndex = filteredGalleryItems.indexOf(item);
            
            // Set modal image and caption
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-info h3').textContent;
            
            modalImage.src = img.src;
            modalCaption.textContent = caption;
            
            // Show modal
            galleryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', function() {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside of content
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Navigate to previous image
    modalPrev.addEventListener('click', function() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = filteredGalleryItems.length - 1;
        }
        updateModalImage();
    });

    // Navigate to next image
    modalNext.addEventListener('click', function() {
        currentImageIndex++;
        if (currentImageIndex >= filteredGalleryItems.length) {
            currentImageIndex = 0;
        }
        updateModalImage();
    });

    // Update modal image and caption
    function updateModalImage() {
        const item = filteredGalleryItems[currentImageIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-info h3').textContent;
        
        modalImage.src = img.src;
        modalCaption.textContent = caption;
    }

    // Keyboard navigation for gallery modal
    document.addEventListener('keydown', function(e) {
        if (galleryModal.style.display === 'flex') {
            if (e.key === 'Escape') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (e.key === 'ArrowRight') {
                modalNext.click();
            }
        }
    });

    // Maintenance timeline
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            timelineBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show all items for 'all' filter
            if (filter === 'all') {
                timelineItems.forEach(item => {
                    item.style.display = 'flex';
                });
                return;
            }
            
            // Show/hide timeline items based on filter
            timelineItems.forEach(item => {
                const milestone = parseInt(item.querySelector('.milestone-value').textContent.replace(/,/g, ''));
                
                if (filter === 'basic' && milestone <= 30000) {
                    item.style.display = 'flex';
                } else if (filter === 'intermediate' && milestone > 30000 && milestone <= 60000) {
                    item.style.display = 'flex';
                } else if (filter === 'major' && milestone > 60000) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Maintenance tracker
    const currentMileageInput = document.getElementById('current-mileage');
    const lastServiceInput = document.getElementById('last-service');
    const updateTrackerBtn = document.querySelector('.tracker-form .btn');
    const upcomingItems = document.querySelectorAll('.upcoming-item');

    updateTrackerBtn.addEventListener('click', function() {
        const currentMileage = parseInt(currentMileageInput.value) || 0;
        
        if (currentMileage > 0) {
            // Update progress bars based on current mileage
            upcomingItems.forEach((item, index) => {
                let dueInElement = item.querySelector('.upcoming-due');
                let progressBar = item.querySelector('.progress-bar');
                
                // Simulate different maintenance intervals
                let interval, nextDue;
                
                if (index === 0) { // Oil Change
                    interval = 5000;
                    nextDue = Math.ceil(currentMileage / interval) * interval;
                } else if (index === 1) { // Tire Rotation
                    interval = 5000;
                    nextDue = Math.ceil(currentMileage / interval) * interval;
                } else if (index === 2) { // Cabin Air Filter
                    interval = 15000;
                    nextDue = Math.ceil(currentMileage / interval) * interval;
                }
                
                const remaining = nextDue - currentMileage;
                const progress = 100 - (remaining / interval * 100);
                
                dueInElement.textContent = `Due in: ${remaining.toLocaleString()} miles`;
                progressBar.style.width = `${progress}%`;
                
                // Change color based on urgency
                if (progress > 80) {
                    progressBar.style.backgroundColor = 'var(--danger-color)';
                } else if (progress > 60) {
                    progressBar.style.backgroundColor = 'var(--warning-color)';
                } else {
                    progressBar.style.backgroundColor = 'var(--primary-color)';
                }
            });
            
            // Show success message
            alert('Maintenance tracker updated successfully!');
        } else {
            alert('Please enter a valid current mileage.');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize the first tab as active
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }

    // Initialize the first filter as active
    if (filterBtns.length > 0) {
        filterBtns[0].click();
    }

    // Initialize the first gallery filter as active
    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns[0].click();
    }

    // Initialize the first timeline filter as active
    if (timelineBtns.length > 0) {
        timelineBtns[0].click();
    }
});
