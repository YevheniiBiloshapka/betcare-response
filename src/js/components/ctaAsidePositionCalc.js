export const ctaAsidePositionCalc = () => {
  const ctaHeader = document.querySelector('.cta-header');
  const ctaLinks = document.querySelector('.cta-links');
  const ctaAsideBox = document.querySelector('.cta-aside--box');
  const ctaAsideTable = document.querySelector('.cta-aside--table');
  const ctaAsideRove = document.querySelector('[data-target="promo-code"]');

  const updateTablePosition = () => {
    const headerHeight = ctaHeader.offsetHeight;
    const linksHeight = ctaLinks.offsetHeight;
    const totalHeight = headerHeight + linksHeight;

    const boxHeight = ctaAsideBox.offsetHeight;
    const tableHeight = ctaAsideTable.offsetHeight;
    const heightDifference = boxHeight - tableHeight;

    const newPositionTop = totalHeight + heightDifference + ctaAsideRove.offsetHeight;

    ctaAsideTable.style.top = `${newPositionTop}px`;
  };

  updateTablePosition();

  window.addEventListener('resize', updateTablePosition);
};