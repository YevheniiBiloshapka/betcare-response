function Tooltip() {
  const tooltips = document.querySelectorAll('[data-tooltip-container]');

  function handleResize() {
    const isDesktop = window.innerWidth >= 1280;

    tooltips.forEach(tooltip => {
      const trigger = tooltip.querySelector('[data-tooltip-trigger]');
      const content = tooltip.querySelector('[data-tooltip-content]');
      const closeBtn = tooltip.querySelector('[data-tooltip-close]');

      if (isDesktop) {
        trigger.removeEventListener('click', toggleTooltip);
        closeBtn.removeEventListener('click', closeTooltip);
        tooltip.removeAttribute('data-tooltip-visible');

        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
      } else {
        trigger.removeEventListener('mouseenter', showTooltip);
        trigger.removeEventListener('mouseleave', hideTooltip);

        trigger.addEventListener('click', toggleTooltip);
        closeBtn.addEventListener('click', closeTooltip);
      }
    });
  }

  function toggleTooltip(event) {
    const tooltip = event.currentTarget.closest('[data-tooltip-container]');
    const isVisible = tooltip.hasAttribute('data-tooltip-visible');

    document.querySelectorAll('[data-tooltip-visible]').forEach(visibleTooltip => {
      if (visibleTooltip !== tooltip) {
        visibleTooltip.removeAttribute('data-tooltip-visible');
      }
    });

    if (isVisible) {
      tooltip.removeAttribute('data-tooltip-visible');
    } else {
      tooltip.setAttribute('data-tooltip-visible', '');
    }
  }

  function closeTooltip(event) {
    const tooltip = event.currentTarget.closest('[data-tooltip-container]');
    tooltip.removeAttribute('data-tooltip-visible');
  }

  function showTooltip(event) {
    const tooltip = event.currentTarget.closest('[data-tooltip-container]');
    tooltip.setAttribute('data-tooltip-visible', '');
  }

  function hideTooltip(event) {
    const tooltip = event.currentTarget.closest('[data-tooltip-container]');
    tooltip.removeAttribute('data-tooltip-visible');
  }

  window.addEventListener('resize', handleResize);
  handleResize();
}
export default Tooltip