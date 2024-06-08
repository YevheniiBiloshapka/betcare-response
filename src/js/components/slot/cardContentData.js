 const casinosData = {
  "casinos": [
    {
      "rating": "4.8",
      "title": "Casino A",
      "imageUrl": "./img/slots/logo01.webp",
      "reviewLink": "#"
    },
    {
      "rating": "4.5",
      "title": "Casino B",
      "imageUrl": "./img/slots/logo02.webp",
      "reviewLink": "#"
    },
    {
      "rating": "4.9",
      "title": "Casino C",
      "imageUrl": "./img/slots/logo03.webp",
      "reviewLink": "#"
    },
    {
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo04.webp",
      "reviewLink": "#"
    },{
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo05.webp",
      "reviewLink": "#"
    },{
      "rating": "4.9",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo06.webp",
      "reviewLink": "#"
    },{
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo07.webp",
      "reviewLink": "#"
    },{
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo08.webp",
      "reviewLink": "#"
    },{
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo09.webp",
      "reviewLink": "#"
    },{
      "rating": "4.7",
      "title": "Casino D",
      "imageUrl": "./img/slots/logo10.webp",
      "reviewLink": "#"
    },

  ]
};

export function getRandomCasinoData() {
  // Получаем случайный индекс из массива casinos
  const randomIndex = Math.floor(Math.random() * casinosData.casinos.length);
  return casinosData.casinos[randomIndex];
}