;(function () {
    
    'use strict';

    // iPad and iPod detection
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) || 
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

// Main Menu Superfish
    var mainMenu = function() {
        $('#fh5co-primary-menu').superfish({
            delay: 0,
            animation: {
                opacity: 'show'
            },
            speed: 'fast',
            cssArrows: true,
            disableHI: true
        });
    };

    // Parallax
    var parallax = function() {
        $(window).stellar();
    };

    // Offcanvas and cloning of the main menu
    var offcanvas = function() {
        var $clone = $('#fh5co-menu-wrap').clone();
        $clone.attr({
            'id' : 'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class' : '',
            'id' : ''
        });

        $('#fh5co-page').prepend($clone);

        // click the burger
        $('.js-fh5co-nav-toggle').on('click', function(){
            if ($('body').hasClass('fh5co-offcanvas')) {
                $('body').removeClass('fh5co-offcanvas');
            } else {
                $('body').addClass('fh5co-offcanvas');
            }
        });

        $('#offcanvas-menu').css('height', $(window).height());

        $(window).resize(function() {
            var w = $(window);
            $('#offcanvas-menu').css('height', w.height());

            if (w.width() > 769 && $('body').hasClass('fh5co-offcanvas')) {
                $('body').removeClass('fh5co-offcanvas');
            }
        });
    }

    // Click outside of the Mobile Menu
    var mobileMenuOutsideClick = function() {
        $(document).click(function(e) {
            var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }
        });
    };

    // Animations
    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, { offset: '85%' });
    };

    var stickyBanner = function() {
        var $stickyElement = $('.sticky-banner');
        if ($stickyElement.length) {
            new Waypoint.Sticky({
                element: $stickyElement[0],
                offset: 0
            });
        }
    };

    // Document on load.
    $(function(){
        mainMenu();
        parallax();
        offcanvas();
        mobileMenuOutsideClick();
        contentWayPoint();
        stickyBanner();
    });

    // Slider Code
    document.addEventListener("DOMContentLoaded", function() {
        let currentSlide = 0; // Index de la diapositive actuelle
        const slides = document.querySelectorAll('.slide'); // Sélectionner toutes les diapositives
        const totalSlides = slides.length; // Nombre total de diapositives

        // Vérifier que les éléments existent avant de les utiliser
        const slidesContainer = document.querySelector('.slides');
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');

        if (!slidesContainer || !nextButton || !prevButton) {
            console.warn("Éléments de navigation du slider non trouvés.");
            return; // Arrêter l'exécution si les éléments nécessaires ne sont pas présents
        }

        // Fonction pour afficher la diapositive actuelle
        function showSlide(index) {
            // Si l'index dépasse le nombre total de diapositives, retourner à la première
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1; // Si l'index est inférieur à 0, afficher la dernière diapositive
            } else {
                currentSlide = index;
            }

            // Appliquer une transformation pour faire glisser les diapositives
            slidesContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
        }

        // Fonction pour passer à la diapositive suivante
        nextButton.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });

        // Fonction pour revenir à la diapositive précédente
        prevButton.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        // Optionnel: changer automatiquement de diapositive toutes les 5 secondes
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    });

}());