import heroTick from './components/part-hero.js'
import {Header} from './components/header.js'


document.addEventListener('DOMContentLoaded', function () {
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
  Header()
  heroTick()
});