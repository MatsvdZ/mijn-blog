//
const introScreen = document.getElementById("introScreen");
const startButton = document.getElementById("startButton");

const screens = document.querySelectorAll(".screen");
const cards = document.querySelectorAll(".card");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const backButtons = document.querySelectorAll(".back-button");

let current = 0;

function showScreen(targetId) {
  screens.forEach((screen) => {
    screen.classList.remove("active");

    const hero = screen.querySelector(".section-hero");
    if (hero) {
      hero.classList.remove("active-hero");
    }
  });

  const targetScreen = document.getElementById(targetId);
  targetScreen.classList.add("active");

  const hero = targetScreen.querySelector(".section-hero");
  if (hero) {
    setTimeout(() => {
      hero.classList.add("active-hero");
    }, 100);
  }
}

function updateCarousel() {
  cards.forEach((card, i) => {
    card.className = "card";

    let offset = i - current;

    if (offset < -3) offset += cards.length;
    if (offset > 3) offset -= cards.length;

    if (offset === 0) {
      card.classList.add("active-card");
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
}

nextBtn.addEventListener("click", () => {
  current = (current + 1) % cards.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + cards.length) % cards.length;
  updateCarousel();
});

cards.forEach((card, index) => {
  card.addEventListener("click", () => {
    if (index !== current) return;
    const target = card.dataset.target;
    showScreen(target);
  });
});

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.back || "home";
    showScreen(target);
  });
});

startButton.addEventListener("click", () => {
  introScreen.classList.add("hidden");
  showScreen("home");
});

document.addEventListener("keydown", (event) => {
  const homeScreen = document.getElementById("home");

  if (!homeScreen.classList.contains("active")) {
    if (event.key === "Escape") {
      showScreen("home");
    }
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

updateCarousel();
showScreen("home");
