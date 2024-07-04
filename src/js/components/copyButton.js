function copyButton() {
  const buttonCopy =  document.querySelector('[data-action="copyButton"]');
  if (!buttonCopy){
    return
  }
  buttonCopy.addEventListener('click', function() {
    const textElement = document.querySelector('[data-target="buttonText"]');
    const copyButton = document.querySelector('[data-action="copyButton"]');
    const copyIcon = document.querySelector('[data-target="copyIcon"]');

    // Сохраняем исходный текст
    const originalText = textElement.textContent;

    const textToCopy = originalText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      textElement.textContent = 'copied';
      textElement.classList.add('copied');
      copyIcon.classList.add('copied');

      const copiedIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      copiedIcon.setAttribute("width", "18");
      copiedIcon.setAttribute("height", "18");
      copiedIcon.setAttribute("viewBox", "0 0 18 18");
      copiedIcon.setAttribute("fill", "none");
      copiedIcon.innerHTML = `
      <path d="M8.99984 0.666992C4.40502 0.666992 0.666504 4.40551 0.666504 9.00033C0.666504 13.5951 4.40502 17.3337 8.99984 17.3337C13.5947 17.3337 17.3332 13.5951 17.3332 9.00033C17.3332 4.40551 13.5947 0.666992 8.99984 0.666992ZM13.6573 6.80734L8.3315 12.0914C8.01822 12.4047 7.51696 12.4256 7.1828 12.1123L4.36325 9.54335C4.02908 9.23007 4.00819 8.70793 4.30059 8.37376C4.61387 8.03959 5.13601 8.01871 5.47018 8.33199L7.70493 10.3788L12.4668 5.61687C12.801 5.2827 13.3231 5.2827 13.6573 5.61687C13.9915 5.95104 13.9915 6.47317 13.6573 6.80734Z" fill="#2EA380"/>
    `;
      copiedIcon.setAttribute("id", "copiedIcon");

      copyIcon.parentNode.replaceChild(copiedIcon, copyIcon);

      setTimeout(() => {
        textElement.textContent = originalText;
        textElement.classList.remove('copied');
        copyIcon.classList.remove('copied');
        copiedIcon.parentNode.replaceChild(copyIcon, copiedIcon);
      }, 2000);
    });

  });
}
export default  copyButton