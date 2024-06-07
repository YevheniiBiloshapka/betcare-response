export const SlotMachine = () => {
  const button = document.getElementById('addActiveButton');
  const slotBox = document.querySelector('.slot-list-box');
  const slotList = document.querySelectorAll('.slot__cards-list')
  const slotListsArray = [...slotList];
  let speed = 150; // (in pixels per second)

  // TODO: Create Scroll list time Line
  const timeLine = slotListsArray.map((list, index) => {
    const scrollDirection = index % 2 ? speed : -speed;
    return verticalLoop(list, scrollDirection);

  });

  // Handle button click
  function handleButtonClick(event) {
    let delay = 1500;
    const title = document.querySelector('.slot-list-box--win-text')
    // delete active classes
    title.classList.remove('show')
    document.querySelectorAll('.slot__card--wrapper').forEach(i => {
      i.style = '';
      i.classList.remove('active');
    });
    document.querySelectorAll('.slot__cards-list').forEach(i => i.classList.remove("active"));
    // возобновление со скоростью
    timeLine.forEach(item => {
      item.timeScale(8);
      item.resume();
    })
    // TODO: остановка с задержкой
    slotBox.classList.add('active')
    timeLine.forEach((item, index) => {
      delay += 1000;

      setTimeout(() => {
        const currentList = slotList[index];
        const cardElements = currentList.querySelectorAll('.slot__card--wrapper');
        const randomIndex = Math.floor(Math.random() * cardElements.length);

        currentList.classList.add('active')


        cardElements.forEach((card, i) => {
          card.style = '';

          if (i === randomIndex) {
            card.style.order = 2;
            card.classList.add('active');
          } else if (i === 1) {
            card.style.order = randomIndex + 1;
          } else {
            card.style.order = i + 1;
            card.classList.remove('active');
          }
        })
        item.pause();


        if (index + 1 === timeLine.length) {
          title.classList.add('show')
          document.querySelectorAll('.slot__card--wrapper.active').forEach(i => i.classList.add("showAnimation"));
        }

      }, delay);

    })

  }

  button.addEventListener('click', (event) => handleButtonClick(event));
};


//TODO: Vertical loop function
function verticalLoop(list, speed) {
  let elements = Array.from(list.querySelectorAll(".slot__card--wrapper"));
  const firstBounds = elements[0].getBoundingClientRect();
  const lastBounds = elements[elements.length - 1].getBoundingClientRect();
  const top = firstBounds.top - firstBounds.height - Math.abs(elements[1].getBoundingClientRect().top - firstBounds.bottom);
  const bottom = lastBounds.top;
  const distance = bottom - top;
  const duration = Math.abs(distance / speed);
  const tl = gsap.timeline({ repeat: -1 });
  const plus = speed < 0 ? "-=" : "+=";
  const minus = speed < 0 ? "+=" : "-=";
  elements.forEach(el => {
    const bounds = el.getBoundingClientRect();
    let ratio = Math.abs((bottom - bounds.top) / distance);
    if (speed < 0) {
      ratio = 1 - ratio;
    }

    // Добавляем обработчики событий мыши
    el.addEventListener("mouseenter", () =>
      gsap.to(tl, 0.5, { timeScale: 0,duration:3, ease: "ease" })
    );
    el.addEventListener("mouseleave", () => gsap.to(tl, 0.5, { timeScale: 1,duration:3, ease: "ease" }));


    tl.to(el, {
      y: plus + distance * ratio,
      duration: duration * ratio,
      ease: "none"
    }, 0);

    tl.fromTo(el, {
      y: minus + distance
    }, {
      y: plus + (1 - ratio) * distance,
      ease: "none",
      duration: (1 - ratio) * duration,
      immediateRender: false
    }, duration * ratio);
  });

  return tl;
}
