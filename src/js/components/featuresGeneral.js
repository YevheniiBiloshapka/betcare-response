export const featuresGeneral = () => {
  const tabs = document.querySelectorAll('.features__tab');
  const delays = [2000, 4000, 6000, 8000];

  tabs.forEach((tab, index) => {
    setTimeout(() => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }, delays[index]);
  });
};