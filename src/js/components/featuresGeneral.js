export const featuresGeneral = () => {
  const video = document.querySelector('.features__video-block--video');
  const tabs = document.querySelectorAll('.features__tab');
  let isResetting = false; // Флаг для предотвращения лишних переключений
  let lastTime = 0; // Для отслеживания изменений времени

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
      }
    });
  });

  observer.observe(video);

  const timecodes = [
    { time: 0, index: 0 },
    { time: 4, index: 1 },
    { time: 8, index: 2 },
    { time: 12, index: 3 }
  ];

  video.addEventListener('timeupdate', function () {
    if (isResetting) return; // Если флаг установлен, выходим из функции

    const currentTime = video.currentTime;

    if (Math.abs(currentTime - lastTime) < 0.1) return; // Проверка на значительное изменение времени
    lastTime = currentTime; // Обновляем последнее время

    timecodes.forEach((timecode, idx) => {
      if (currentTime >= timecode.time) {
        tabs.forEach(tab => tab.classList.remove('active'));
        tabs[timecode.index].classList.add('active');
      }
    });

    if (currentTime >= 15) {
      isResetting = true; // Устанавливаем флаг перед сбросом времени
      video.currentTime = 0;
      video.play();
    }
  });

  video.addEventListener('ended', function () {
    video.currentTime = 0;
    video.play();
  });

  video.addEventListener('play', function () {
    if (isResetting) {
      tabs.forEach(tab => tab.classList.remove('active'));
      tabs[0].classList.add('active');
      isResetting = false; // Сбрасываем флаг после начала воспроизведения
      lastTime = 0; // Сбрасываем последнее время
    }
  });
};