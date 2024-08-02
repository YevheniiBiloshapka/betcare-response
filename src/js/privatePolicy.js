import { Header } from './components/header.js';

const AccordionMobilePolicy = () => {
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
};

const ActiveLinkSwitcher = () => {
  const links = document.querySelectorAll('.legal-document--link');
  const sections = document.querySelectorAll('.accordion__item');
  const sectionVisibility = new Map();

  const updateActiveLink = (mostVisibleSection) => {
    links.forEach((link) => {
      const linkHref = link.getAttribute('href').replace('#', '');
      if (linkHref === mostVisibleSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  const findMostVisibleSection = () => {
    let mostVisibleSection = null;
    let highestRatio = 0;

    sectionVisibility.forEach((ratio, id) => {
      if (ratio > highestRatio) {
        highestRatio = ratio;
        mostVisibleSection = id;
      }
    });

    // Проверяем, достигнут ли конец страницы
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1;
    if (isBottom) {
      mostVisibleSection = sections[sections.length - 1].id;
    }

    return mostVisibleSection;
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target.id, entry.intersectionRatio);
    });

    const mostVisibleSection = findMostVisibleSection();
    if (mostVisibleSection) {
      updateActiveLink(mostVisibleSection);
    }
  };

  const observerOptions = {
    threshold: Array.from({ length: 101 }, (_, i) => i * 0.01) // значения от 0 до 1 с шагом 0.01
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  const checkBottomOnScroll = () => {
    const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1;
    if (isBottom) {
      const lastSectionId = sections[sections.length - 1].id;
      updateActiveLink(lastSectionId);
    }
  };

  window.addEventListener('scroll', checkBottomOnScroll);
  document.addEventListener('DOMContentLoaded', checkBottomOnScroll); // Проверка при загрузке страницы
};



document.addEventListener('DOMContentLoaded', function () {
  AccordionMobilePolicy();
  ActiveLinkSwitcher();
  Header();
});
