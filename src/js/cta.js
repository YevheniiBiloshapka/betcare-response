import {Header} from './components/header.js'
import copyButton from './components/copyButton.js'
import ctaScrollableBlock from './components/ctaScrollableBlock.js'
function Accordion() {
  const accordionHeader = document.querySelectorAll('[data-action="accordion-header"]');
  accordionHeader.forEach(header => {
    header.addEventListener('click', function() {
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


var swiper = new Swiper('.cta-swiper', {
  slidesPerView: 1,

  breakpoints: {
    1180: {
      slidesPerView: 1.8,
      spaceBetween: 48,
    },
    1280: {
      slidesPerView: 2.6,
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
});
document.addEventListener('DOMContentLoaded', function () {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  const ctaBlock = document.querySelector('.cta-swiper');
  const swiperSlides = swiperWrapper.querySelectorAll('.swiper-slide');
  if (swiperSlides.length > 3) {
    ctaBlock.classList.add('is-hidden');
  }
  copyButton()
  Accordion()
  Header()
  ctaScrollableBlock()
});

