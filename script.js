// ========================================
// TONI JOSHVA PORTFOLIO
// Interactive JavaScript
// ========================================


// Smooth reveal animation
const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


sections.forEach((section) => {

    section.style.opacity = "0";

    section.style.transform =
        "translateY(40px)";

    section.style.transition =
        "all 0.9s ease";

    observer.observe(section);

});


// ========================================
// Typing Effect
// ========================================

const text =
    "Future AI Developer";

const typingElement =
    document.querySelector(".hero h2");

let index = 0;

function typeEffect() {

    if (index < text.length) {

        typingElement.textContent =
            text.substring(0, index + 1);

        index++;

        setTimeout(
            typeEffect,
            80
        );

    }

}

typingElement.textContent = "";

typeEffect();


// ========================================
// Mouse Glow Effect
// ========================================

const orb =
    document.querySelector(".hero-orb");

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            event.clientX;

        const y =
            event.clientY;

        orb.style.transform =
            `translate(${x * 0.015}px,
                       ${y * 0.015}px)`;

    }
);


// ========================================
// Project Hover Effect
// ========================================

const projects =
    document.querySelectorAll(
        ".project-card"
    );


projects.forEach((project) => {

    project.addEventListener(
        "mouseenter",
        () => {

            project.style.boxShadow =
                "0 20px 60px rgba(140,247,210,0.08)";

        }
    );


    project.addEventListener(
        "mouseleave",
        () => {

            project.style.boxShadow =
                "none";

        }
    );

});


// ========================================
// Current Year
// ========================================

const footer =
    document.querySelector("footer p");

if (footer) {

    footer.textContent =
        `© ${new Date().getFullYear()} TONI JOSHVA`;

}