import { Header } from './components/header.js';

document.addEventListener('DOMContentLoaded', function () {
  const accordionHeader = document.querySelectorAll('[data-action="accordion-header"]');
  const links = document.querySelectorAll('.legal-document--link');
  const sections = document.querySelectorAll('.accordion__item');
  const headers = document.querySelectorAll('.accordion__item--header');

  const topOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px -90% 0px', // trigger when the top of the section is near the top of the viewport
    threshold: 0 // no threshold, just when the top of the section crosses
  };

  const bottomOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px 0px 0px', // trigger when the bottom of the section is near the bottom of the viewport
    threshold: 1.0 // full intersection
  };

  const headerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveLink(entry.target.closest('.accordion__item').id);
      }
    });
  }, topOptions);

  const bottomObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateActiveLink(entry.target.id);
      }
    });
  }, bottomOptions);

  headers.forEach(header => {
    headerObserver.observe(header);
  });

  sections.forEach(section => {
    bottomObserver.observe(section);
  });

  // Проверка на достижение низа страницы
  window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      const lastSection = sections[sections.length - 1];
      updateActiveLink(lastSection.id);
    }
  });

  function updateActiveLink(id) {
    // Remove active class from all links
    links.forEach(link => link.classList.remove('active'));
    // Add active class to the link corresponding to the current section
    const activeLink = document.querySelector(`.legal-document--link[href="#${id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

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

  Header();
});
