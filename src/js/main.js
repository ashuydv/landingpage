var fullAnimation = (function () {
  var bigDarkRectangle = anime
    .timeline({
      targets: ".hero-figure-box-05",
      begin: function (anim) {
        smallDarkRectangles.play();
        colouredRectangles.play();
      },
    })
    .add({
      duration: 100,
      easing: "easeInOutExpo",
      scaleX: [0.05, 0.05],
      scaleY: [0, 1],
      perspective: "500px",
    })
    .add({
      duration: 100,
      easing: "easeInOutExpo",
      scaleX: 1,
    })
    .add({
      duration: 800,
      rotateY: "-15deg",
      rotateX: "8deg",
      rotateZ: "-1deg",
    });

  var smallDarkRectangles = anime
    .timeline({
      targets: ".hero-figure-box-06, .hero-figure-box-07",
    })
    .add({
      duration: 100,
      easing: "easeInOutExpo",
      scaleX: [0.05, 0.05],
      scaleY: [0, 1],
      perspective: "500px",
    })
    .add({
      duration: 100,
      easing: "easeInOutExpo",
      scaleX: 1,
    })
    .add({
      duration: 800,
      rotateZ: "20deg",
    });

  var colouredRectangles = anime
    .timeline({
      targets:
        ".hero-figure-box-01, .hero-figure-box-02, .hero-figure-box-03, .hero-figure-box-04, .hero-figure-box-08, .hero-figure-box-09, .hero-figure-box-10",
    })
    .add({
      duration: anime.random(600, 800),
      delay: anime.random(600, 800),
      rotate: [
        anime.random(-360, 360),
        function (el) {
          return el.getAttribute("data-rotation");
        },
      ],
      scale: [0.7, 1],
      opacity: [0, 1],
      easing: "easeInOutExpo",
    });

  function init() {
    setTimeout(function () {
      bigDarkRectangle.play();
    }, 1000);

    setInterval(function () {
      reverseAnimation();
      setTimeout(function () {
        restartAnimation();
      }, bigDarkRectangle.duration);
    }, bigDarkRectangle.duration +
      smallDarkRectangles.duration +
      colouredRectangles.duration);
  }

  function restartAnimation() {
    bigDarkRectangle.restart();
    smallDarkRectangles.restart();
    colouredRectangles.restart();
  }

  function reverseAnimation() {
    bigDarkRectangle.reverse();
    smallDarkRectangles.reverse();
    colouredRectangles.reverse();
  }

  //sphere animation

  function fitElementToParent(el, padding) {
    var timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 });
      var pad = padding || 0;
      var parentEl = el.parentNode;
      var elOffsetWidth = el.offsetWidth - pad;
      var parentOffsetWidth = parentEl.offsetWidth;
      var ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener("resize", resize);
  }

  var sphereAnimation = (function () {
    var sphereEl = document.querySelector(".sphere-animation");
    var spherePathEls = sphereEl.querySelectorAll(".sphere path");
    var pathLength = spherePathEls.length;
    var hasStarted = false;
    var aimations = [];

    fitElementToParent(sphereEl);

    var breathAnimation = anime({
      begin: function () {
        for (var i = 0; i < pathLength; i++) {
          aimations.push(
            anime({
              targets: spherePathEls[i],
              stroke: {
                value: ["rgba(145, 59, 99, 1)", "rgba(174, 134, 255, 1)"],
                duration: 500,
              },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: "easeOutQuad",
              autoplay: false,
            })
          );
        }
      },
      update: function (ins) {
        aimations.forEach(function (animation, i) {
          var percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false,
    });

    var introAnimation = anime
      .timeline({
        autoplay: false,
      })
      .add(
        {
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: 3900,
            easing: "easeInOutCirc",
            delay: anime.stagger(190, { direction: "reverse" }),
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: "reverse" }),
          easing: "linear",
        },
        0
      );

    var shadowAnimation = anime(
      {
        targets: "#sphereGradient",
        x1: "25%",
        x2: "25%",
        y1: "0%",
        y2: "75%",
        duration: 30000,
        easing: "easeOutQuint",
        autoplay: false,
      },
      0
    );

    function init() {
      introAnimation.play();
      breathAnimation.play();
      shadowAnimation.play();
    }

    init();
  })();

  VanillaTilt.init(document.querySelectorAll("#inner-box"), {
    max: 5,
    speed: 1000,
    glare: true,
    "max-glare": 0.5,
    reverse: true,
    transition: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  });

  // Get all slide cards, images, and descriptions
  const slideCards = document.querySelectorAll(".slide-card");
  const images = document.querySelectorAll("#image");
  const descriptions = document.querySelectorAll(".desc");

  // Add event listeners to each slide card
  slideCards.forEach((card, index) => {
    card.addEventListener("mouseover", () => {
      // Remove active class from all slide cards, images, and descriptions
      slideCards.forEach((card) => {
        card.classList.remove("slide-card-active");
      });
      images.forEach((image) => {
        image.classList.remove("slide-card-active");
      });
      descriptions.forEach((desc) => {
        desc.classList.remove("desc-active");
      });

      // Add active class to the hovered slide card, image, and description
      card.classList.add("slide-card-active");
      images[index].classList.add("slide-card-active");
      descriptions[index].classList.add("desc-active");
    });
  });

  return {
    init: init,
  };
})();

// Start on load
window.addEventListener("load", function () {
  fullAnimation.init();
});
