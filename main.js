(function () {
    "use strict";

    // Mobile nav
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    toggle.addEventListener("click", function () {
        toggle.classList.toggle("open");
        links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
    links.addEventListener("click", function (e) {
        if (e.target.tagName === "A") {
            toggle.classList.remove("open");
            links.classList.remove("open");
        }
    });

    // Carousel
    var track = document.getElementById("carouselTrack");
    var dots = Array.prototype.slice.call(document.getElementById("carouselDots").children);
    var index = 0;
    var total = track.children.length;
    var timer = null;
    var AUTOPLAY = 5000;

    function go(i) {
        index = (i + total) % total;
        track.style.transform = "translateX(-" + index * 100 + "%)";
        dots.forEach(function (d, n) {
            d.classList.toggle("active", n === index);
        });
    }

    function start() {
        stop();
        timer = setInterval(function () { go(index + 1); }, AUTOPLAY);
    }

    function stop() {
        if (timer) clearInterval(timer);
        timer = null;
    }

    document.getElementById("carouselNext").addEventListener("click", function () { go(index + 1); start(); });
    document.getElementById("carouselPrev").addEventListener("click", function () { go(index - 1); start(); });
    dots.forEach(function (d, n) {
        d.addEventListener("click", function () { go(n); start(); });
    });

    var carousel = document.getElementById("carousel");
    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);

    // Touch swipe
    var startX = null;
    carousel.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
        stop();
    }, { passive: true });
    carousel.addEventListener("touchend", function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        startX = null;
        start();
    }, { passive: true });

    // Pause when tab hidden
    document.addEventListener("visibilitychange", function () {
        document.hidden ? stop() : start();
    });

    start();

    // Footer year
    document.getElementById("year").textContent = new Date().getFullYear();
})();
