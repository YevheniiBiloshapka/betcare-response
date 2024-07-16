import { SlotMachine } from './components/slot/slotMachine.js';
import heroTick from './components/part-hero.js';
import { Header } from './components/header.js';

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
    loop: true,
    on: {
      slideChangeTransitionStart: function () {
        let videos = document.querySelectorAll('.swiper-slide video');
        videos.forEach((video) => {
          video.pause();
          video.currentTime = 0;

          video.removeEventListener('timeupdate', handleTimeUpdate);
        });

        let activeSlideVideo = this.slides[this.activeIndex].querySelector('video');
        if (activeSlideVideo) {
          activeSlideVideo.pause();
          activeSlideVideo.currentTime = 0;
          activeSlideVideo.addEventListener('seeked', function onSeeked() {
            activeSlideVideo.play();
            activeSlideVideo.removeEventListener('seeked', onSeeked);
          });

          // Добавляем обработчик события для остановки видео после завершения
          activeSlideVideo.addEventListener('ended', function onEnded() {
            activeSlideVideo.pause();
            activeSlideVideo.removeEventListener('ended', onEnded);
          });
        }
      },
      init: function () {
        // Воспроизведение первого видео при загрузке
        let activeSlideVideo = this.slides[this.activeIndex].querySelector('video');
        if (activeSlideVideo) {
          activeSlideVideo.play();
        }
      }
    }
  });

  function handleTimeUpdate(event) {
    const video = event.target;
    if (video.currentTime >= video.duration) {
      video.currentTime = 0; // Сброс времени на начало
      video.pause(); // Остановка видео
    }
  }

  var galleryThumbs = new Swiper('.gallery-thumbs', {
    slidesPerView: 1,
    slideToClickedSlide: true,
    allowTouchMove: false,
    loop: true,
  });

  galleryTop.controller.control = galleryThumbs;
  galleryThumbs.controller.control = galleryTop;

  Header();
  SlotMachine();
  heroTick();
});
