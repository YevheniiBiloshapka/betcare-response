//hero 1-2-3-4
      const heroBG = document.querySelectorAll(".hero picture.hero__slide-img");
      const heroSpan = document.querySelectorAll(".hero .hero__info-box--title span");
      const heroBtn = document.querySelector("#hero__buttonBG svg")
      const heroBtnTxt = document.querySelectorAll(".hero__info-box--button span")
      const heroBtnBG = [
        "--gradient-1: #ff9b3c;--gradient-2: #e0483e;--gradient-3: #c43269;" + "--gradient-hover-1: #e0833c;--gradient-hover-2: #ff4f40;--gradient-hover-3: #db3278;" + "--gradient-stroke-1:#ffb067;--gradient-stroke-2:#ff4f40;--gradient-stroke-3:#db3278;" + "--button-glow-color:#e0483eaa",

        "--gradient-1: #8a89d1;--gradient-2: #495fd3;--gradient-3: #822dcf;" + "--gradient-hover-1: #a2a1ec;--gradient-hover-2: #4b6fed;--gradient-hover-3: #962ee8;" + "--gradient-stroke-1:#b9b8f6;--gradient-stroke-2:#3d5dd2;--gradient-stroke-3:#5d1695;" + "--button-glow-color:#495fd3aa",

        "--gradient-1: #dea037;--gradient-2: #dd5318;--gradient-3: #de1f1b;" + "--gradient-hover-1: #ffbc3b;--gradient-hover-2: #fe5a14;--gradient-hover-3: #ff1919;" + "--gradient-stroke-1:#ffca62;--gradient-stroke-2:#df5012;--gradient-stroke-3:#c40c0c;" + "--button-glow-color:#dd5318aa",

        "--gradient-1: #a9ba6a;--gradient-2: #78b422;--gradient-3: #308f70;" + "--gradient-hover-1: #c8d979;--gradient-hover-2: #88d11d;--gradient-hover-3: #2ea380;" + "--gradient-stroke-1:#e4f0af;--gradient-stroke-2:#97dd31;--gradient-stroke-3:#176850;" + "--button-glow-color:#78b422aa",
      ];
      const heroScroll = document.querySelector(".hero__scroll-button-link svg")
      const heroScrollBG = [
        "--svg-scroll-1:#E1126E;--svg-scroll-2:#FF996E;--svg-scroll-3:#FF4A4A;",
        "--svg-scroll-1:#A838FF;--svg-scroll-2:#A09EFF;--svg-scroll-3:#3B5EFF;",
        "--svg-scroll-1:#FE5A14;--svg-scroll-2:#FFBC3B;--svg-scroll-3:#FF1919;",
        "--svg-scroll-1:#A4D35F;--svg-scroll-2:#E5F1AF;--svg-scroll-3:#237427;"]

      

      let heroTimer = setInterval(heroTick, 5000);
      let prev = heroBG.length;
      let current = 0;
      let next = 1;

      function heroTick() {
        prev = current;
        current++
        if (current === heroBG.length) {
          current = 0
        }
        heroBG[current].classList.add("active")
        heroSpan[current].classList.add("active")
        heroSpan[prev].classList.remove("active")
        
        heroBtn.style.cssText = heroBtnBG[current];
        heroBtnTxt[prev].classList.remove("active")
        heroScroll.style.cssText = heroScrollBG[current];
        heroScroll.style.transition = "transform 1s linear";
        if (current === 3) {
          heroScroll.style.transform = "rotate(" + 180 * 1 + "deg)"
        } else if (current === 0) {
          heroScroll.style.transform = "rotate(" + 180 * 2 + "deg)"
        } else {
          heroScroll.style.transform = "rotate(" + 180 * current + "deg)"
        }


        //has to be bigger than CSS animation time
        setTimeout(update, 700)
        //half a time for text
        setTimeout(showTxt,750)

        function showTxt(){
          heroBtnTxt[current].classList.add("active")
        }

        function update() {
          heroBG[prev].classList.remove("active")
          heroBG[current].classList.remove("next")
          heroSpan[current].classList.remove("next")
          if (current === 2 || current === 0) {
            heroScroll.style.transition = "transform 0s linear";
            heroScroll.style.transform = "rotate(0deg)"
          }

          next = current + 1
          if (next === heroBG.length) {
            next = 0
          }
          heroBG[next].classList.add("next")
          heroSpan[next].classList.add("next")
        }
      }


    export  default  heroTick