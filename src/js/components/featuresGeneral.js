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

  const playVideo = () => {
    if (video.readyState >= 2) {
      video.play().catch(error => {
        console.error('Error playing video:', error);
      });
    } else {
      video.addEventListener('canplay', () => {
        video.play().catch(error => {
          console.error('Error playing video:', error);
        });
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
    tab.addEventListener('click', (event) => {
      tab.classList.add('pulse');

      setTimeout(() => {
        tab.classList.remove('pulse');
      }, 500);

      clearExistingTimeouts();
      video.pause();
      video.currentTime = delays[index] / 1000;
      playVideo();
      activateTab(index);
    });
  });

  video.addEventListener('ended', () => {
    video.currentTime = 0;
    activateTab();
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
};