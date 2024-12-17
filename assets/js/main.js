document.addEventListener('DOMContentLoaded', function() {
    const sliderImages = document.querySelectorAll('.section2__slider-images img');
    const prevBtn = document.querySelector('.section__slider-prevBtn');
    const nextBtn = document.querySelector('.section__slider-nextBtn');
    let currentIndex = 0;

    function showImage(index) {
        sliderImages.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
        showImage(currentIndex);
    }

    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    showImage(currentIndex);
});


