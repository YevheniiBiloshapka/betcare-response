import { SlotMachine } from './components/slot/slotMachine.js';
import heroTick from './components/part-hero.js';
import { Header } from './components/header.js';
import { featuresGeneral } from './components/featuresGeneral.js';

document.addEventListener('DOMContentLoaded', function () {
  var galleryTop = new Swiper('.gallery-top', {
    navigation: {
      nextEl: '.services-slider-nav-next',
      prevEl: '.services-slider-nav-prev',
    },
    slidesPerView: 1,
    // effect: "none",
    // speed:0,
    maxBackfaceHiddenSlides:true,
    effect: 'fade',
    fadeEffect: {
      crossFade: false
    },
    // effect: 'fade',
    loop: true,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },

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

  // Добавляем обработчик кликов и касаний на body для начала воспроизведения видео
  document.body.addEventListener('click', () => {
    const videoElements = document.querySelectorAll('.swiper-slide video');
    videoElements.forEach(videoElement => {
      if (videoElement.paused) {
        videoElement.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    });
  });

  document.body.addEventListener('touchstart', () => {
    const videoElements = document.querySelectorAll('.swiper-slide video');
    videoElements.forEach(videoElement => {
      if (videoElement.paused) {
        videoElement.play().catch(error => {
          console.error('Error playing video:', error);
        });
      }
    });
  });


  featuresGeneral();
  Header();
  SlotMachine();
  heroTick();
});
