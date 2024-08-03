export const featuresGeneral = () => {
  const video = document.querySelector('.features__video-block--video');
  const tabs = document.querySelectorAll('.features__tab');
  const delays = [0, 4000, 8000, 12000]; // Задержки в миллисекундах

  let timeoutIds = [];

  const clearExistingTimeouts = () => {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
  };

  const activateTab = (startIndex = 0) => {
    clearExistingTimeouts();
    tabs.forEach((tab, index) => {
      if (index >= startIndex) {
        const delay = delays[index] - (startIndex > 0 ? delays[startIndex] : 0);
        const timeoutId = setTimeout(() => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
        }, delay);
        timeoutIds.push(timeoutId);
      }
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateTab();
        video.play();

        observer.unobserve(video);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      // Добавляем класс пульсации при клике
      tab.classList.add('pulse');

      setTimeout(() => {
        tab.classList.remove('pulse');
      }, 800); // Длительность анимации

      clearExistingTimeouts();
      video.currentTime = delays[index] / 1000; // Устанавливаем время видео в секундах
      activateTab(index);
      video.play();
    });
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    activateTab();
    video.play();
  });
};