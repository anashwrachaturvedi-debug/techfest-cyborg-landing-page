"use strict";

/* =========================================
   LOADER
========================================= */

const loader = document.getElementById("loader");
const loaderPercent = document.getElementById("loaderPercent");

let progress = 0;

const loaderInterval = setInterval(() => {
  progress += Math.floor(Math.random() * 8) + 3;

  if (progress >= 100) {
    progress = 100;
    clearInterval(loaderInterval);

    setTimeout(() => {
      loader.classList.add("hidden");
      revealElements();
    }, 400);
  }

  loaderPercent.textContent =
    String(progress).padStart(2, "0") + "%";
}, 90);


/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.querySelector(".navbar");

menuToggle.addEventListener("click", () => {
  navbar.classList.toggle("menu-open");
});


document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("menu-open");
  });
});


/* =========================================
   SMOOTH SECTION NAVIGATION
========================================= */

function scrollToSection(id) {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealItems = document.querySelectorAll(".reveal");

function revealElements() {
  revealItems.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("visible");
    }, Math.min(index * 80, 600));
  });
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealItems.forEach(element => {
  observer.observe(element);
});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navLinks.forEach(link => {
          link.classList.remove("active");

          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.45
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


/* =========================================
   CYBORG PARALLAX
========================================= */

const cyborgVisual = document.querySelector(".cyborg-visual");

window.addEventListener(
  "mousemove",
  event => {

    if (!cyborgVisual) return;

    const x = (event.clientX / window.innerWidth - 0.5);
    const y = (event.clientY / window.innerHeight - 0.5);

    cyborgVisual.style.transform =
      `translate(${x * 12}px, ${y * 12}px)`;
  },
  { passive: true }
);


/* =========================================
   DEMO MODAL
========================================= */

const demoBtn = document.getElementById("demoBtn");
const demoModal = document.getElementById("demoModal");
const closeModal = document.getElementById("closeModal");

function openModal() {
  demoModal.classList.add("show");
  document.body.classList.add("modal-open");
}

function closeDemoModal() {
  demoModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

demoBtn.addEventListener("click", openModal);

closeModal.addEventListener("click", closeDemoModal);

demoModal.addEventListener("click", event => {
  if (event.target === demoModal) {
    closeDemoModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeDemoModal();
  }
});


/* =========================================
   CONNECT BUTTON
========================================= */

const connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", () => {

  const originalText = connectBtn.querySelector("span:first-child");

  originalText.textContent = "CONNECTION ESTABLISHED";

  connectBtn.style.background = "#ffffff";
  connectBtn.style.borderColor = "#ffffff";

  setTimeout(() => {
    originalText.textContent = "CONNECT TO NEXUS";
    connectBtn.style.background = "";
    connectBtn.style.borderColor = "";
  }, 2200);
});


/* =========================================
   CARD TILT EFFECT
========================================= */

const cards = document.querySelectorAll(".feature-card");

cards.forEach(card => {

  card.addEventListener("mousemove", event => {

    if (window.innerWidth < 800) return;

    const rect = card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateX =
      ((y / rect.height) - 0.5) * -4;

    const rotateY =
      ((x / rect.width) - 0.5) * 4;

    card.style.transform =
      `translateY(-10px) perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});


/* =========================================
   SCROLL BASED HERO EFFECT
========================================= */

window.addEventListener(
  "scroll",
  () => {

    const scrollY = window.scrollY;

    if (window.innerWidth > 800 && cyborgVisual) {

      const rotation = Math.min(scrollY * 0.025, 8);

      cyborgVisual.style.marginTop =
        `${scrollY * 0.08}px`;

      cyborgVisual.style.filter =
        `brightness(${Math.max(0.5, 1 - scrollY / 1800)})`;
    }
  },
  { passive: true }
);


/* =========================================
   CURSOR GLOW
========================================= */

const cursorGlow = document.createElement("div");

cursorGlow.style.position = "fixed";
cursorGlow.style.width = "250px";
cursorGlow.style.height = "250px";
cursorGlow.style.borderRadius = "50%";
cursorGlow.style.pointerEvents = "none";
cursorGlow.style.zIndex = "0";
cursorGlow.style.background =
  "radial-gradient(circle, rgba(215,255,56,.035), transparent 65%)";
cursorGlow.style.transform =
  "translate(-50%, -50%)";

document.body.appendChild(cursorGlow);

window.addEventListener(
  "mousemove",
  event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  },
  { passive: true }
);


/* =========================================
   INITIALIZATION
========================================= */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

  setTimeout(() => {
    revealItems.forEach(element => {
      if (
        element.getBoundingClientRect().top <
        window.innerHeight
      ) {
        element.classList.add("visible");
      }
    });
  }, 800);
});