import { SlotMachine } from './components/slot/slotMachine.js';
import heroTick from './components/part-hero.js'
import {Header} from './components/header.js'
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
    on: {
      slideChangeTransitionStart: function () {
        let videos = document.querySelectorAll('.swiper-slide video');
        videos.forEach((video) => {
          video.pause();
          video.currentTime = 0;
       
        });

        let activeSlideVideo = this.slides[this.activeIndex].querySelector('video');
        if (activeSlideVideo) {
          activeSlideVideo.play();
        }
      }
    }
  });
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 1,
    slideToClickedSlide: true,

    allowTouchMove: false,
    loop: true,
  });


  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;
  Header()
  SlotMachine()
  heroTick()
});