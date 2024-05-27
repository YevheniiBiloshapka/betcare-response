var colors = ["#f38630","#6fb936", "#ccc", "#6fb936"];
var wrap = gsap.utils.wrap(-100, 400);

//initially colorize each box and position in a row
gsap.set(".box", {
    backgroundColor: (i) => colors[i % colors.length],
    y: (i) => i * 50
});


gsap.to(".box", {
    duration: 5,
    ease: "none",
    y: "-=500", //move each box 500px to right
    modifiers: {
        y: gsap.utils.unitize(wrap) //force y value to wrap when it reaches -100
    },
    repeat: -1
});


const button = document.getElementById("buttondfs");
const box5 = document.getElementById("5");

button.addEventListener("click", () => {
    // Остановка анимации всех блоков
    gsap.killTweensOf(".box");

    // Показать блок с id 5
    gsap.set("#5", { y: "0px" , zIndex: 0 ,transform: "translate3d(0px, 0px, 0px)"});


});

