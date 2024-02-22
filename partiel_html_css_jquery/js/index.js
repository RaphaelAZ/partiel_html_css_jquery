$(document).ready(function() {
    var $slider = $('#slider');
    var $sliderImage = $slider.find('img');
    var $sliderCaption = $slider.find('figcaption');
    var $previousButton = $('#slider-previous');
    var $nextButton = $('#slider-next');
    var $randomButton = $('#slider-random');
    var $toggleButton = $('#slider-toggle');
    var slideInterval;


    var images = ['./images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg', './images/5.jpg', './images/6.jpg'];
    var description = ['Art de rue', 'Autoroute', 'Entreprise', 'Bureaux', 'Ville', 'Tour Eiffel'];

    var currentIndex = 0;

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlider();
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateSlider();
    }

    function showRandomImage() {
        var randomIndex = Math.floor(Math.random() * images.length);
        currentIndex = randomIndex;
        updateSlider();
    }

    function startSlideShow() {
        slideInterval = setInterval(function() {
            showNextImage();
        }, 2000);
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    function updateSlider() {
        $sliderImage.attr('src', images[currentIndex]);
        $sliderCaption.text(description[currentIndex]);
    }

    $previousButton.on('click', showPreviousImage);
    $nextButton.on('click', showNextImage);
    $randomButton.on('click', showRandomImage);

    $('#toolbar-toggle').click(function(e) {
        e.preventDefault();
        $('.toolbar-buttons').toggle();
    });

    $toggleButton.on('click', function() {
        var $icon = $(this).find('i');
        if ($icon.hasClass('fa-play')) {
            startSlideShow();
            $icon.removeClass('fa-play').addClass('fa-pause');
        } else {
            stopSlideShow();
            $icon.removeClass('fa-pause').addClass('fa-play');
        }
    });
    
    $(document).keydown(function(e) {
        if (e.keyCode === 37) { // Flèche gauche
            stopSlideShow(); // Arrête le défilement automatique lorsque l'utilisateur interagit avec les touches du clavier
            showPreviousImage();
        } else if (e.keyCode === 39) { // Flèche droite
            stopSlideShow(); // Arrête le défilement automatique lorsque l'utilisateur interagit avec les touches du clavier
            showNextImage();
        }
    });

    updateSlider();
});