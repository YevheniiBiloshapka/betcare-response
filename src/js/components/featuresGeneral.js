export const featuresGeneral = () => {
  const video = document.querySelector('.features__video-block--video');
  const tabs = document.querySelectorAll('.features__tab');
  const delays = [0, 4000, 8000, 12000]; // Задержки в миллисекундах

  let timeoutIds = [];
  let currentTabIndex = 0;

  const clearExistingTimeouts = () => {
    timeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutIds = [];
  };

  const activateTab = (startIndex = 0) => {
    clearExistingTimeouts();
    tabs.forEach((tab, index) => {
      const delay = delays[index] - (startIndex > 0 ? delays[startIndex] : 0);
      if (index >= startIndex) {
        const timeoutId = setTimeout(() => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          currentTabIndex = index;
        }, delay);
        timeoutIds.push(timeoutId);
      }
    });
  };

  const playVideo = () => {
    if (video.readyState >= 2) {
      video.play();
    } else {
      video.addEventListener('canplay', () => {
        video.play();
      }, { once: true });
    }
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activateTab();
        playVideo();
        observer.unobserve(video);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tab.classList.add('pulse');

      setTimeout(() => {
        tab.classList.remove('pulse');
      }, 500);

      clearExistingTimeouts();
      video.pause();
      video.currentTime = delays[index] / 1000;
      playVideo();
      activateTab(index);
      currentTabIndex = index;
    });
  });

  video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime * 1000; // Текущая позиция видео в миллисекундах
    for (let i = delays.length - 1; i >= 0; i--) {
      if (currentTime >= delays[i]) {
        tabs.forEach(t => t.classList.remove('active'));
        tabs[i].classList.add('active');
        currentTabIndex = i;
        break;
      }
    }
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    activateTab(0);
    playVideo();
  });

  // Добавляем обработчик кликов и касаний на body для начала воспроизведения видео
  document.body.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
    }
  });

  document.body.addEventListener('touchstart', () => {
    if (video.paused) {
      playVideo();
    }
  });

  // Устанавливаем свойство loop для видео, чтобы оно воспроизводилось зациклено
  video.loop = true;

  // Начальная активация первой вкладки
  activateTab(0);
};