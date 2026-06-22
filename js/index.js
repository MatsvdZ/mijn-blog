const introScreen = document.getElementById("introScreen");
const startButton = document.getElementById("startButton");

const screens = document.querySelectorAll(".screen");
const cards = document.querySelectorAll(".card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const backButtons = document.querySelectorAll(".back-button");

let current = Number(sessionStorage.getItem("carouselIndex")) || 0;

/* =========================
   INTRO
========================= */

const introSeen = sessionStorage.getItem("introSeen") === "true";

if (introSeen && introScreen) {
  introScreen.classList.add("hidden");
}

if (startButton) {
  startButton.addEventListener("click", () => {
    sessionStorage.setItem("introSeen", "true");

    if (introScreen) {
      introScreen.classList.add("hidden");
    }

    const savedScreen = sessionStorage.getItem("activeScreen") || "home";
    showScreen(savedScreen);
  });
}

/* =========================
   SCREEN SWITCHING
========================= */

function showScreen(targetId) {
  const targetScreen =
    document.getElementById(targetId) || document.getElementById("home");

  sessionStorage.setItem("activeScreen", targetScreen.id);

  screens.forEach((screen) => {
    const isActive = screen === targetScreen;

    screen.classList.toggle("active", isActive);
    screen.setAttribute("aria-hidden", String(!isActive));

    const hero = screen.querySelector(".section-hero");
    if (hero) {
      hero.classList.remove("active-hero");

      if (isActive) {
        setTimeout(() => {
          hero.classList.add("active-hero");
        }, 100);
      }
    }
  });

  updateCarousel();
}
/* =========================
   CAROUSEL
========================= */

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove(
      "active-card",
      "left-1",
      "right-1",
      "left-2",
      "right-2",
      "hidden",
    );

    card.setAttribute("tabindex", "-1");

    let offset = i - current;

    if (offset < -Math.floor(cards.length / 2)) {
      offset += cards.length;
    }

    if (offset > Math.floor(cards.length / 2)) {
      offset -= cards.length;
    }

    if (offset === 0) {
      card.classList.add("active-card");
      card.setAttribute("tabindex", "0");
    } else if (offset === -1) {
      card.classList.add("left-1");
    } else if (offset === 1) {
      card.classList.add("right-1");
    } else if (offset === -2) {
      card.classList.add("left-2");
    } else if (offset === 2) {
      card.classList.add("right-2");
    } else {
      card.classList.add("hidden");
    }
  });

  sessionStorage.setItem("carouselIndex", current);
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    current = (current + 1) % cards.length;
    updateCarousel();
    cards[current].focus();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
    cards[current].focus();
  });
}

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index !== current) return;
    showScreen(card.dataset.target);
  });

  card.addEventListener("keydown", (event) => {
    if (index !== current) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showScreen(card.dataset.target);
    }
  });
});

/* =========================
   BACK BUTTONS
========================= */

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.back || "home";
    showScreen(target);
  });
});

/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {
  const homeScreen = document.getElementById("home");

  if (!homeScreen.classList.contains("active")) {
    if (event.key === "Escape") {
      showScreen("home");
    }
    return;
  }

  const activeElement = document.activeElement;

  if (activeElement === nextBtn || activeElement === prevBtn) {
    return;
  }

  if (event.key === "ArrowRight") {
    current = (current + 1) % cards.length;
    updateCarousel();
  }

  if (event.key === "ArrowLeft") {
    current = (current - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  if (event.key === "Enter") {
    const activeCard = cards[current];
    const target = activeCard.dataset.target;
    showScreen(target);
  }
});

/* =========================
   REMEMBER SCROLL POSITION
========================= */

window.addEventListener("beforeunload", () => {
  const activeScreen = document.querySelector(".screen.active");

  if (activeScreen) {
    sessionStorage.setItem("activeScreenScroll", activeScreen.scrollTop);
  }
});

window.addEventListener("load", () => {
  const activeScreen = document.querySelector(".screen.active");
  const savedScroll = sessionStorage.getItem("activeScreenScroll");

  if (activeScreen && savedScroll) {
    activeScreen.scrollTop = Number(savedScroll);
  }
});

/* =========================
   MARK: VAKKEN
========================= */

const eyebleedButton = document.getElementById("eyebleedButton");
const visualModeButton = document.getElementById("visualModeButton");
const planetButton = document.getElementById("planetButton");
const openDevLog = document.getElementById("openDevLog");
const closeDevLog = document.getElementById("closeDevLog");
const devLogPanel = document.getElementById("devLogPanel");

if (eyebleedButton) {
  eyebleedButton.addEventListener("click", () => {
    document.body.classList.add("eyebleed-active");

    setTimeout(() => {
      document.body.classList.remove("eyebleed-active");
    }, 2000);
  });
}

if (visualModeButton) {
  visualModeButton.addEventListener("click", () => {
    document.body.classList.toggle("visual-mode-active");
  });
}

if (planetButton) {
  planetButton.addEventListener("click", () => {
    document.body.classList.toggle("planet-scan-active");
  });
}

if (openDevLog && devLogPanel) {
  openDevLog.addEventListener("click", () => {
    devLogPanel.classList.add("active");
  });
}

if (closeDevLog && devLogPanel) {
  closeDevLog.addEventListener("click", () => {
    devLogPanel.classList.remove("active");
  });
}

/* =========================
   MARK: HACKATHON
========================= */

const miniBlackholeButton = document.getElementById("miniBlackholeButton");
const hackathonMission = document.querySelector(".hackathon-mission");

if (miniBlackholeButton && hackathonMission) {
  miniBlackholeButton.addEventListener("click", () => {
    hackathonMission.classList.add("blackhole-active");

    setTimeout(() => {
      hackathonMission.classList.remove("blackhole-active");
    }, 1200);
  });
}

/* =========================
   THEME TOGGLE
========================= */

const btn = document.querySelector("#theme-btn");

if (btn) {
  btn.addEventListener("click", () => {
    const root = document.documentElement;

    if (root.dataset.theme === "red") {
      root.dataset.theme = "";
    } else {
      root.dataset.theme = "red";
    }
  });
}

/* =========================
   INIT
========================= */

const savedScreen = sessionStorage.getItem("activeScreen") || "home";

document.addEventListener("DOMContentLoaded", () => {
  updateCarousel();
  showScreen(savedScreen);

  requestAnimationFrame(() => {
    updateCarousel();
  });

  setTimeout(() => {
    updateCarousel();
  }, 100);
});
