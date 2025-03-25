// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader animation - show for exactly 2.5 seconds then remove completely
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.remove(); // Completely remove the loader from DOM
            }, 500);
        }, 2500); // Show for 2.5 seconds
    }

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    if (navLinks.length > 0 && nav) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            });
        });
    }

    // Specifications tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });

        // Initialize the first tab as active
        if (tabBtns.length > 0) {
            tabBtns[0].click();
        }
    }

    // Parts catalog filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const partCards = document.querySelectorAll('.part-card');

    if (filterBtns.length > 0 && partCards.length > 0) {
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

        // Initialize the first filter as active
        filterBtns[0].click();
    }

    // Parts search functionality
    const searchInput = document.getElementById('parts-search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn && partCards.length > 0) {
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
    }

    // Gallery filtering
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
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

        // Initialize the first gallery filter as active
        galleryFilterBtns[0].click();
    }

    // Gallery modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    let currentImageIndex = 0;
    let filteredGalleryItems = [];

    if (galleryModal && modalImage && galleryItems.length > 0) {
        // Open modal when clicking on gallery item
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Get currently visible gallery items based on active filter
                const activeFilter = document.querySelector('.gallery-filter-btn.active');
                const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
                
                filteredGalleryItems = Array.from(galleryItems).filter(item => {
                    return filterValue === 'all' || item.getAttribute('data-category') === filterValue;
                });
                
                // Find index in filtered items
                currentImageIndex = filteredGalleryItems.indexOf(item);
                
                // Set modal image and caption
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-info h3').textContent;
                
                modalImage.src = img.src;
                if (modalCaption) modalCaption.textContent = caption;
                
                // Show modal
                galleryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', function() {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }

        // Close modal when clicking outside of content
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Navigate to previous image
        if (modalPrev) {
            modalPrev.addEventListener('click', function() {
                currentImageIndex--;
                if (currentImageIndex < 0) {
                    currentImageIndex = filteredGalleryItems.length - 1;
                }
                updateModalImage();
            });
        }

        // Navigate to next image
        if (modalNext) {
            modalNext.addEventListener('click', function() {
                currentImageIndex++;
                if (currentImageIndex >= filteredGalleryItems.length) {
                    currentImageIndex = 0;
                }
                updateModalImage();
            });
        }

        // Update modal image and caption
        function updateModalImage() {
            const item = filteredGalleryItems[currentImageIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-info h3').textContent;
            
            modalImage.src = img.src;
            if (modalCaption) modalCaption.textContent = caption;
        }

        // Keyboard navigation for gallery modal
        document.addEventListener('keydown', function(e) {
            if (galleryModal.style.display === 'flex') {
                if (e.key === 'Escape') {
                    galleryModal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft' && modalPrev) {
                    modalPrev.click();
                } else if (e.key === 'ArrowRight' && modalNext) {
                    modalNext.click();
                }
            }
        });
    }

    // Maintenance timeline
    const timelineBtns = document.querySelectorAll('.timeline-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (timelineBtns.length > 0 && timelineItems.length > 0) {
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
                    const milestoneElement = item.querySelector('.milestone-value');
                    if (milestoneElement) {
                        const milestone = parseInt(milestoneElement.textContent.replace(/,/g, ''));
                        
                        if (filter === 'basic' && milestone <= 30000) {
                            item.style.display = 'flex';
                        } else if (filter === 'intermediate' && milestone > 30000 && milestone <= 60000) {
                            item.style.display = 'flex';
                        } else if (filter === 'major' && milestone > 60000) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });

        // Initialize the first timeline filter as active
        timelineBtns[0].click();
    }

    // Maintenance tracker
    const currentMileageInput = document.getElementById('current-mileage');
    const lastServiceInput = document.getElementById('last-service');
    const updateTrackerBtn = document.querySelector('.tracker-form .btn');
    const upcomingItems = document.querySelectorAll('.upcoming-item');

    if (currentMileageInput && updateTrackerBtn && upcomingItems.length > 0) {
        updateTrackerBtn.addEventListener('click', function() {
            const currentMileage = parseInt(currentMileageInput.value) || 0;
            
            if (currentMileage > 0) {
                // Update progress bars based on current mileage
                upcomingItems.forEach((item, index) => {
                    let dueInElement = item.querySelector('.upcoming-due');
                    let progressBar = item.querySelector('.progress-bar');
                    
                    if (dueInElement && progressBar) {
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
                    }
                });
                
                // Show success message
                alert('Maintenance tracker updated successfully!');
            } else {
                alert('Please enter a valid current mileage.');
            }
        });
    }

    // Make all "View Details" buttons interactive
    const viewDetailsButtons = document.querySelectorAll('.btn.small');
    if (viewDetailsButtons.length > 0) {
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function() {
                const parentElement = this.closest('.timeline-content, .part-info');
                if (parentElement) {
                    const title = parentElement.querySelector('h3').textContent;
                    alert(`Details for ${title} would be displayed here in a real application.`);
                }
            });
        });
    }

    // Make hero buttons interactive
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length > 0) {
        heroButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonText = this.textContent.trim();
                alert(`You clicked the "${buttonText}" button. This would navigate to the corresponding section in a real application.`);
            });
        });
    }

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
    
    if (sections.length > 0 && navLinks.length > 0) {
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
    }

    // Make sure the loader progress bar animation works
    const loaderProgressBar = document.querySelector('.loader-progress-bar');
    if (loaderProgressBar) {
        loaderProgressBar.style.animation = 'progress 2.5s ease-in-out forwards';
    }

    // Make pagination buttons interactive
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    if (paginationBtns.length > 0) {
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                paginationBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Simulate page change
                const page = this.textContent.trim();
                alert(`Navigated to page ${page}`);
            });
        });
    }

    // Make footer links interactive
    const footerLinks = document.querySelectorAll('.footer-column a');
    if (footerLinks.length > 0) {
        footerLinks.forEach(link => {
            if (link.getAttribute('href') === '#') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const linkText = this.textContent.trim();
                    alert(`You clicked on "${linkText}". This would navigate to the corresponding page in a real application.`);
                });
            }
        });
    }

    // Make social media icons interactive
    const socialIcons = document.querySelectorAll('.social-icons a');
    if (socialIcons.length > 0) {
        socialIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.querySelector('i').className.split('-')[1];
                alert(`You clicked on the ${platform} icon. This would open the corresponding social media page in a real application.`);
            });
        });
    }

    // Add animation to features on scroll
    const features = document.querySelectorAll('.feature');
    if (features.length > 0) {
        const animateFeatures = function() {
            features.forEach(feature => {
                const featurePosition = feature.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (featurePosition < screenPosition) {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state
        features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateY(20px)';
            feature.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run on scroll
        window.addEventListener('scroll', animateFeatures);
        
        // Run once on load
        animateFeatures();
    }

    // Add animation to stats on scroll
    const stats = document.querySelectorAll('.stat');
    if (stats.length > 0) {
        const animateStats = function() {
            stats.forEach(stat => {
                const statPosition = stat.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (statPosition < screenPosition) {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Set initial state
        stats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        // Run on scroll
        window.addEventListener('scroll', animateStats);
        
        // Run once on load
        animateStats();
    }

    // Ensure all buttons have hover effects
    const allButtons = document.querySelectorAll('button, .btn');
    if (allButtons.length > 0) {
        allButtons.forEach(button => {
            if (!button.classList.contains('btn')) {
                button.style.transition = 'all 0.3s ease';
            }
        });
    }

    // Make sure the loader is visible for exactly 2.5 seconds
    // This is a redundant check to ensure the loader works
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }

    // Console log to confirm script is running
    console.log('Virtual Garage script initialized successfully!');
});
