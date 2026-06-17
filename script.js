$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $(".navbar").addClass("sticky");
        } else {
            $(".navbar").removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $(".scroll-up-btn").addClass("show");
        } else {
            $(".scroll-up-btn").removeClass("show");
        }
    });

    // slide-up script
    $(".scroll-up-btn").click(function () {
        $("html").animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $("html").css("scrollBehavior", "auto");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["UI/UX Designer", "IT Support Specialist", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
    });

    var typed = new Typed(".typing-2", {
        strings: ["Video Editor", "Web Designer", "IT Support"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
    });

    // owl carousel script
    $(".carousel").owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false,
            },
            600: {
                items: 2,
                nav: false,
            },
            1000: {
                items: 3,
                nav: false,
            },
        },
    });
    var loader = document.querySelector(".loader");

    window.addEventListener("load", vanish);

    function vanish() {
        loader.classList.add("disppear");
    }
});

// Blur navbar on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

// Disable right click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable certain key combinations
document.addEventListener("keydown", function (e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        return false;
    }
});

// Loader fade out after 3 seconds
window.addEventListener("load", function () {
    setTimeout(function () {
        document.querySelector(".loader_bg").classList.add("hidden");
    }, 3000); // 3000ms = 3 seconds
});

// Update year in footer
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent = new Date().getFullYear();
});

// Fade-in animation for project cards
window.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    cards.forEach((card) => {
        observer.observe(card);
    });
});

// Qualification tabs functionality
window.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("[data-target]");
    const contents = document.querySelectorAll("[data-content]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target);

            contents.forEach((c) => c.classList.remove("qualification__active"));
            target.classList.add("qualification__active");

            tabs.forEach((t) => t.classList.remove("qualification__active"));
            tab.classList.add("qualification__active");
        });
    });
});

// Project filtering with AOS refresh
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");
    const comingSoon = document.getElementById("coming-soon");

    // Ensure initial state (show only the active filter cards)
    const initFilter = () => {
        const activeBtn = document.querySelector(".filter-btn.active");
        const filter = activeBtn ? activeBtn.dataset.filter : "all";
        applyFilter(filter, false);
    };

    // Apply filter and re-run AOS refresh
    function applyFilter(filter, runAOS = true) {
        let hasVisible = false;

        projectCards.forEach((card) => {
            const match = filter === "all" || card.classList.contains(filter);
            card.style.display = match ? "" : "none";
            if (match) hasVisible = true;
        });

        if (comingSoon) comingSoon.style.display = hasVisible ? "none" : "flex";

        if (!runAOS) return;

        setTimeout(() => {
            try {
                if (window.AOS && typeof window.AOS.refreshHard === "function") {
                    window.AOS.refreshHard();
                } else if (window.AOS && typeof window.AOS.refresh === "function") {
                    window.AOS.refresh();
                } else {
                    console.warn("AOS not found. Make sure AOS.init() runs before this script.");
                }
            } catch (e) {
                console.error("Error refreshing AOS:", e);
            }
        }, 60);
    }

    // Button handlers
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            button.classList.add("active");
            const filter = button.dataset.filter || "all";
            applyFilter(filter, true);
        });
    });

    // Initialize once
    initFilter();
});

// AOS initialization
document.addEventListener("DOMContentLoaded", () => {
    if (window.AOS) {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
            offset: 80,
            easing: "ease-in-out",
        });

        // Fix mobile reflow timing
        setTimeout(() => {
            if (typeof AOS.refresh === "function") {
                AOS.refresh();
            }
        }, 500);
    } else {
        console.warn("AOS library not loaded.");
    }
});

// Snow effect on canvas
document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("snow");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    function isChristmasSeasonPH() {
        const now = new Date();
        const month = now.getMonth();
        const day = now.getDate();

        return (
            (month === 10 && day >= 1) ||
            month === 11
        );
    }

    let snowflakes = [];

    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.6 - 0.3;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            if (this.y > canvas.height) {
                this.y = -10;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.fill();
        }
    }

    function createSnow(count = 100) {
        snowflakes = [];
        for (let i = 0; i < count; i++) {
            snowflakes.push(new Snowflake());
        }
    }

    function animateSnow() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(flake => {
            flake.update();
            flake.draw();
        });
        requestAnimationFrame(animateSnow);
    }

    setTimeout(() => {
        if (isChristmasSeasonPH()) {
            canvas.style.display = "block";
            createSnow();
            animateSnow();
        } else {
            canvas.style.display = "none";
        }
    }, 3100);

    window.addEventListener("resize", resizeCanvas);
});

// Hamburger menu toggle
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");

    menuBtn.innerHTML = menu.classList.contains("active")
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
});

// Dark mode toggle
const toggle = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggle.textContent = "☀️";
}

// Toggle click
toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
    }
});

