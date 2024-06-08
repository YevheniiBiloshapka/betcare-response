import { SlotMachine } from './components/slot/slotMachine.js';

document.addEventListener('DOMContentLoaded', function () {
  var galleryTop = new Swiper('.gallery-top', {
    navigation: {
      nextEl: '.services-slider-nav-next',
      prevEl: '.services-slider-nav-prev',
    },
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
    // allowTouchMove: false,
    loop: true,
  });
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 1,
    slideToClickedSlide: true,

    allowTouchMove: false,
    loop: true,
  });
  var heroSwiper = new Swiper('.heroPageSwiper', {
    effect: 'fade',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    allowTouchMove: false,
    loop: true,
  });

  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
  SlotMachine()
});