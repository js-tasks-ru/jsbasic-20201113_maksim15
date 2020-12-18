function initCarousel() {
    let iconRight = document.querySelector('.carousel__arrow_right');
    let iconLeft = document.querySelector('.carousel__arrow_left');

    let carousel = document.querySelector('.carousel__inner');

    let slide = 1;
    let position = 0;

    if (slide === 1) {
        iconLeft.style.display = 'none';
        iconRight.style.display = '';
    }

    iconRight.addEventListener('click', function () {
        position = position + carousel.offsetWidth;
        carousel.style.transform = `translateX(-${position}px)`;
        slide = slide + 1;
        if (slide !== 4) {
            iconLeft.style.display = '';
            iconRight.style.display = '';
        } else {
            iconLeft.style.display = '';
            iconRight.style.display = 'none';
        }
    });

    iconLeft.addEventListener('click', function () {
        position = position - carousel.offsetWidth;
        carousel.style.transform = `translateX(-${position}px)`;
        slide = slide - 1;
        if (slide !== 1) {
            iconLeft.style.display = '';
            iconRight.style.display = '';
        } else {
            iconLeft.style.display = 'none';
            iconRight.style.display = '';
        }
    });
}
