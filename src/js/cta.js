import { Header } from './components/header.js';
import copyButton from './components/copyButton.js';
import { ctaAsidePositionCalc } from './components/ctaAsidePositionCalc.js';


function Accordion() {
  const accordionHeader = document.querySelectorAll('[data-action="accordion-header"]');
  accordionHeader.forEach(header => {
    header.addEventListener('click', function () {
      const accordionItem = this.closest('[data-action="accordion-item"]');
      accordionHeader.forEach(item => {
        if (item !== this) {
          item.classList.remove('show');
        }
      });

      const allAccordionItems = document.querySelectorAll('[data-action="accordion-item"]');
      allAccordionItems.forEach(item => {
        if (item !== accordionItem) {
          item.classList.remove('show');
        }
      });

      accordionItem.classList.toggle('show');
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const ctaBlock = document.querySelector('.cta-swiper');

  var swiper = new Swiper('.cta-swiper', {
    slidesPerView: 1,
    spaceBetween: 10,

    breakpoints: {
      1180: {
        slidesPerView: 2,
        spaceBetween: 48,
      },
      1280: {
        slidesPerView: 2.5,
        spaceBetween: 24,
      },
      1512: {
        slidesPerView: 3,
        spaceBetween: 44,
      },
      1728: {
        slidesPerView: 3.16,
        spaceBetween: 22,
      },
    },

    pagination: {
      el: '.cta-swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },

    on: {
      init: function () {
        const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
        if (swiperSlides.length > 3) {
          ctaBlock.classList.add('is-hidden');
        }
      },
      slideChange: function () {
        const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
        const slidesPerView = swiper.params.slidesPerView;
        if (swiper.realIndex >= swiperSlides.length - slidesPerView) {
          ctaBlock.classList.remove('is-hidden');
        } else {
          ctaBlock.classList.add('is-hidden');
        }
      }
    }
  });
  ctaAsidePositionCalc();
  copyButton();
  Accordion();
  Header();
});
