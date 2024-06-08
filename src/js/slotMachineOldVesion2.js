import { getRandomCasinoData } from './slot/cardContentData.js'

export const SlotMachine = () => {
  const button = document.getElementById('addActiveButton');
  const slotBox = document.querySelector('.slot-list-box');
  const slotList = document.querySelectorAll('.slot__cards-list')
  const slotListsArray = [...slotList];
  let speed = 150; // (in pixels per second)
  let firstIteration = 1
  // TODO: Create Scroll list time Line
  const timeLine = slotListsArray.map((list, index) => {
    const scrollDirection = index % 2 ? speed : -speed;
    return verticalLoop(list, scrollDirection);

  });

  // Handle button click
  function handleButtonClick() {
    firstIteration += 1
    let delay = 1500;
    const title = document.querySelector('.slot-list-box--win-text')

    // TODO: delete active classes
    deleteActiveClasses(title)
    // TODO: replace Content and change speed
    timeLine.forEach((item, index) => {
      const currentList = slotList[index];
      const cardElements = currentList.querySelectorAll('.slot__card--wrapper');
      replaceContent(cardElements)
      item.timeScale(8);
      item.restart()
      item.resume()
      slotBox.classList.add('active')
    })

    // TODO: остановка с задержкой

    timeLine.forEach((item, index) => {
      delay += 1000;

      const currentList = slotList[index];
      const cardElements = currentList.querySelectorAll('.slot__card--wrapper');

      cardElements.forEach((card, i) => {
        setTimeout(() => {
          const dataAction = card.dataset.action;
          item.to(card, {
            timeScale: 0,
            duration: 1,
            onComplete: () => {
              item.pause()

            }
          });
          if (dataAction === 'win') {
            card.classList.add('active');
          }
          if (index + 1 === timeLine.length) {
            addActiveClass(title);
          }
        }, delay);
      });
    })
  }

  button.addEventListener('click', (event) => handleButtonClick(event));
};

// replace content function
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

// delete active classes
function deleteActiveClasses(title) {
  title.classList.remove('show')
  document.querySelectorAll('.slot__card--wrapper').forEach(i => {
    i.classList.remove('active');
    i.classList.remove('showAnimation');
  });
  document.querySelectorAll('.slot__cards-list').forEach(i => i.classList.remove("active"));
}

// add class to paused
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


  elements.forEach((el, i) => {
    const bounds = el.getBoundingClientRect();
    let ratio = Math.abs((bottom - bounds.top) / distance);
    if (speed < 0) {
      ratio = 1 - ratio;
    }

    // Добавляем обработчики событий мыши
    el.addEventListener("mouseenter", () =>
      gsap.to(tl, 0.5, { timeScale: 0, duration: 3, ease: "ease" })
    );
    el.addEventListener("mouseleave", () => gsap.to(tl, 0.5, { timeScale: 1, duration: 3, ease: "ease" }));


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

// <li data-action="0" className="slot__card--wrapper"
//     style="translate: none; rotate: none; scale: none; transform: translate3d(0px, -875.918px, 0px);">
//   <div className="slot__card">
//     <img className="slot__card--cover" src="./img/slots/logo06.webp" alt="logo 6" />
//
//     <div className="slot__card--box">
//       <div className="slot__card--box-info">
//         <img className="slot__card--box-info--image" loading="lazy" src="./img/slots/logo06.webp" alt="logo 6" />
//         <div className="slot__card--box-info--container">
//           <p className="slot__card--box-info--container-rating">4.8</p>
//           <p className="slot__card--box-info--container-name">Title Casino</p>
//           <a className="slot__card--box-info--container-link" href="#">See review</a>
//         </div>
//       </div>
//       <a className="slot__card--box--button" href="#">Play</a>
//     </div>
//   </div>
// </li>