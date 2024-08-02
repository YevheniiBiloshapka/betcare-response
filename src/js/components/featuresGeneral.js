export const featuresGeneral = () => {
  const video = document.querySelector('.features__video-block--video');
  const tabs = document.querySelectorAll('.features__tab');
  const delays = [0, 4000, 8000, 12000]; // Задержки в миллисекундах

  const featuresGeneral = () => {
    tabs.forEach((tab, index) => {
      setTimeout(() => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }, delays[index]);
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featuresGeneral();
        video.play();

        observer.unobserve(video);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(video);
};