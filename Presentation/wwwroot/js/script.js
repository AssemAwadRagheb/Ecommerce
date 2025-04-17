const slides = document.querySelectorAll(".slider-image" );
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;
let slideInterval;
const slideIntervalTime = 5000; // Duration per slide (ms)
const transitionDuration = 500; // Must match CSS transition duration

// Initialize slider
function initSlider() {
  slides.forEach((slide, index) => {
    if (index === 0) {
      slide.classList.add("active");
    } else {
      slide.style.transform = "translateX(100%)";
      slide.style.opacity = "0";
      slide.classList.add("slide-in-next");
    }
  });
  startSlideInterval();
}

// Start automatic sliding
function startSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(showNextSlide, slideIntervalTime);
}

// Show specific slide by index
function showSlide(index) {
  const currentSlide = slides[currentIndex];
  currentIndex = index;

  // Update dots
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === currentIndex);
  });

  // Remove active class from all slides
  slides.forEach((slide, idx) => {
    if (idx === currentIndex) {
      slide.classList.add("active");
      slide.classList.remove("slide-out", "slide-in-next");
      slide.style.transform = "translateX(0)";
      slide.style.opacity = "1";
    } else if (idx < currentIndex) {
      slide.classList.remove("active");
      slide.classList.add("slide-out");
      slide.style.transform = "translateX(-100%)";
      slide.style.opacity = "0";
    } else {
      slide.classList.remove("active");
      slide.classList.add("slide-in-next");
      slide.style.transform = "translateX(100%)";
      slide.style.opacity = "0";
    }
  });
}

// Next slide function
function showNextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

// Click on dots
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = parseInt(dot.getAttribute("data-index"));
    if (index !== currentIndex) {
      showSlide(index);
      startSlideInterval(); // Reset interval after manual interaction
    }
  });
});

// Touch events for slider
let touchStartX = 0;
let touchEndX = 0;
const slider = document.querySelector(".imgs");

slider.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  { passive: true }
);

slider.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  { passive: true }
);

function handleSwipe() {
  const threshold = 50; // Minimum swipe distance
  if (touchEndX < touchStartX - threshold) {
    // Swipe left
    showNextSlide();
    startSlideInterval();
  } else if (touchEndX > touchStartX + threshold) {
    // Swipe right
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
    startSlideInterval();
  }
}

// Initialize the slider
initSlider();

/* --------------------------------
     2) SCROLL REVEAL ANIMATION
  -------------------------------- */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealElements.forEach((el) => revealObserver.observe(el));

/* --------------------------------
     3) SCROLL TO TOP BUTTON
  -------------------------------- */
const scrollBtn = document.getElementById("scrollToTopBtn");

function toggleScrollBtn() {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add("visible");
  } else {
    scrollBtn.classList.remove("visible");
  }
}

window.addEventListener("scroll", toggleScrollBtn);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* --------------------------------
     4) MOBILE MENU TOGGLE
  -------------------------------- */
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const closeMenuBtn = document.querySelector(".close-menu");
const body = document.body;

function toggleMobileMenu() {
  mobileMenu.classList.toggle("open");
  overlay.classList.toggle("active");

  // Toggle body scroll
  if (mobileMenu.classList.contains("open")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
}

hamburger.addEventListener("click", toggleMobileMenu);
closeMenuBtn.addEventListener("click", toggleMobileMenu);
overlay.addEventListener("click", toggleMobileMenu);

// Close mobile menu when clicking on a link
const mobileMenuLinks = document.querySelectorAll(".mobile-menu ul li a");
mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", toggleMobileMenu);
});

/* --------------------------------
     5) MOBILE SEARCH TOGGLE
  -------------------------------- */
const bottomSearchIcon = document.querySelector(".bottom-nav .search-icon");
const mobileSearch = document.querySelector(".mobile-search");
const closeSearchBtn = document.querySelector(".close-search");
const searchInput = mobileSearch.querySelector("input");

function toggleMobileSearch() {
  mobileSearch.classList.toggle("active");

  if (mobileSearch.classList.contains("active")) {
    body.style.overflow = "hidden";
    // Focus on input after animation completes
    setTimeout(() => {
      searchInput.focus();
    }, 300);
  } else {
    body.style.overflow = "";
  }
}

bottomSearchIcon.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMobileSearch();
});

closeSearchBtn.addEventListener("click", toggleMobileSearch);

// Close search on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileSearch.classList.contains("active")) {
    toggleMobileSearch();
  }
});

/* --------------------------------
     6) NAVBAR STICKY EFFECT
  -------------------------------- */
// Removed the scroll hiding behavior; CSS sticky positioning handles it now

/* --------------------------------
     7) ACTIVE MENU ITEM
  -------------------------------- */
const navLinks = document.querySelectorAll(".nav2 ul li a");
navLinks.forEach((link) => {
  if (link.textContent.trim().toLowerCase() === "home") {
    link.classList.add("active");
  }
});

/* --------------------------------
     8) SMOOTH ANCHOR SCROLLING
  -------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

/* --------------------------------
     9) DROPDOWN MENU TOGGLE
  -------------------------------- */
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const dropdownMenus = document.querySelectorAll(".dropdown-menu");

dropdownToggles.forEach((toggle) => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const parentDropdown = toggle.closest(".dropdown");
    const dropdownMenu = parentDropdown.querySelector(".dropdown-menu");

    // Toggle active class
    dropdownMenu.classList.toggle("active");
    toggle.classList.toggle("active");

    // Close other open dropdowns
    dropdownMenus.forEach((menu) => {
      if (menu !== dropdownMenu) {
        menu.classList.remove("active");
      }
    });
    dropdownToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.classList.remove("active");
      }
    });
  });
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideDropdown = e.target.closest(".dropdown");
  if (!isClickInsideDropdown) {
    dropdownMenus.forEach((menu) => {
      menu.classList.remove("active");
    });
    dropdownToggles.forEach((toggle) => {
      toggle.classList.remove("active");
    });
  }
});
