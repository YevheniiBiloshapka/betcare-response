import { getRandomCasinoData } from './cardContentData.js'
export const SlotMachine = () => {
  const button = document.getElementById('addActiveButton');
  const slotBox = document.querySelector('.slot-list-box');
  const slotList = document.querySelectorAll('.slot__cards-list')
  const slotListsArray = [...slotList];
  let speed = 70; // (in pixels per second)
  let timers = [];

  // TODO: Create Scroll list time Line
  const timeLine = slotListsArray.map((list, index) => {
    const scrollDirection = index % 2 ? speed : -speed;
    return verticalLoop(list, scrollDirection);
  });

  // Handle button click
  function handleButtonClick() {
    const title = document.querySelector('.slot-list-box--win-text')
    // clear setTimeOut
    timers.forEach(timerId => clearTimeout(timerId));
    timers = []; // Reset timers

    // TODO: delete active classes
    deleteActiveClasses(title)
    // TODO: replace Content and change speed
    timeLine.forEach((item,index) => {
      const currentList = slotList[index];
      const cardElements = currentList.querySelectorAll('.slot__card--wrapper');
      replaceContent(cardElements)
        gsap.to(item, {
          timeScale: 16,
          duration: 1,
          onComplete: () => {
            item.restart();
            // item.resume();
          }
        });

      // item.timeScale(8);
      // item.restart()
      // item.resume()
      slotBox.classList.add('active')
    })

    // TODO: stop with delay
    timeLine.forEach((item, index) => {
      let delay = 2000 + 1000 ;
      const currentList = slotList[index];
      const cardElements = currentList.querySelectorAll('.slot__card--wrapper');
      const timerId = setTimeout(() => {
      cardElements.forEach((card, i) => {

        const dataAction = card.dataset.action;
        item.to(card, {
          timeScale: 0,
          duration: 1,
          onComplete: () => item.pause()
        });

        if (dataAction === 'win'){
          card.classList.add('active');
        }
        if (index + 1 === timeLine.length) {
          addActiveClass(title);
        }

      });
      }, delay);
      timers.push(timerId);
    })
  }
  button.addEventListener('click', (event) => handleButtonClick(event));
};
// TODO: replace content function
function replaceContent(list) {
  list.forEach((card, i) => {
    // Заменяем информацию у первых трех блоков
    if (i < 3) {
      const selectedCasino = getRandomCasinoData(); // Получаем случайные данные из JSON
      const slotCard = card.querySelector('.slot__card');
      const coverImage = slotCard.querySelector('.slot__card--cover');
      const boxInfoImage = slotCard.querySelector('.slot__card--box-info--image');
      const rating = slotCard.querySelector('.slot__card--box-info--container-rating');
      const title = slotCard.querySelector('.slot__card--box-info--container-name');
      const reviewLink = slotCard.querySelector('.slot__card--box-info--container-link');

      coverImage.src = selectedCasino.imageUrl;
      boxInfoImage.src = selectedCasino.imageUrl;
      rating.textContent = selectedCasino.rating;
      title.textContent = selectedCasino.title;
      reviewLink.href = selectedCasino.reviewLink;
    }
  });
}
//TODO: delete active classes
function deleteActiveClasses(title) {
  title.classList.remove('show')
  document.querySelectorAll('.slot__card--wrapper').forEach(i => {
    i.classList.remove('active');
    i.classList.remove('showAnimation');
  });
  document.querySelectorAll('.slot__cards-list').forEach(i => i.classList.remove("active"));
}

//TODO: add class to paused
function addActiveClass(title) {
  title.classList.add('show');
  const activeCards = document.querySelectorAll('[data-action="win"]');
  activeCards.forEach(card => {
    // card.classList.add('active');
    card.classList.add('showAnimation');
  });
}

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

  // Добавляем обработчики событий мыши
  list.addEventListener("mouseenter", () =>
    gsap.to(tl, 0.5, { timeScale: 0,duration:3, ease: "ease" })
  );
  list.addEventListener("mouseleave", () => gsap.to(tl, 0.5, { timeScale: 1,duration:3, ease: "ease" }));

  // Draggable.create(list, {
  //   type: "y",
  //   bounds: list.parentNode,
  //   edgeResistance: 0.65,
  //   throwProps: true,
  //   onDrag: updateProgress,
  //   onThrowUpdate: updateProgress,
  // });
  elements.forEach((el,i) => {
    const bounds = el.getBoundingClientRect();
    let ratio = Math.abs((bottom - bounds.top) / distance);
    if (speed < 0) {
      ratio = 1 - ratio;
    }




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
