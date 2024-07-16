import { SlotMachine } from './components/slot/slotMachine.js';
import heroTick from './components/part-hero.js';
import { Header } from './components/header.js';

document.addEventListener('DOMContentLoaded', function () {
  var galleryTop = new Swiper('.gallery-top', {
    navigation: {
      nextEl: '.services-slider-nav-next',
      prevEl: '.services-slider-nav-prev',
    },
    maxBackfaceHiddenSlides:true,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },
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
          activeSlideVideo.pause();
          activeSlideVideo.currentTime = 0;
          activeSlideVideo.load(); // Добавляем загрузку видео перед воспроизведением
          activeSlideVideo.addEventListener('loadeddata', function onLoadedData() {
            activeSlideVideo.play();
            activeSlideVideo.removeEventListener('loadeddata', onLoadedData);
          });
        }
      },
      init: function () {
        // Воспроизведение первого видео при загрузке
        let activeSlideVideo = this.slides[this.activeIndex].querySelector('video');
        if (activeSlideVideo) {
          activeSlideVideo.load(); // Добавляем загрузку видео перед воспроизведением
          activeSlideVideo.addEventListener('loadeddata', function onLoadedData() {
            activeSlideVideo.play();
            activeSlideVideo.removeEventListener('loadeddata', onLoadedData);
          });
        }
      }
    }
  });

  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
    maxBackfaceHiddenSlides:true,
  });

  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;

  Header();
  SlotMachine();
  heroTick();
});
