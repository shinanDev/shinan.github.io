const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const navLinks = document.querySelectorAll(".desktop-nav a, .mobile-menu a");
const sections = [...document.querySelectorAll("section")];

const handleActiveNav = () => {
  const scrollPosition = window.scrollY + window.innerHeight * 0.3;
  let currentId = sections[0]?.id;
  sections.forEach(section => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

handleActiveNav();
window.addEventListener("scroll", handleActiveNav);

const smoothScroll = e => {
  const targetId = e.currentTarget.getAttribute("href");
  if (targetId.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    closeMenu();
  }
};

navLinks.forEach(link => link.addEventListener("click", smoothScroll));

const backToTop = document.querySelector(".back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".menu-overlay");

const openMenu = () => {
  mobileMenu.classList.add("open");
  overlay.classList.add("visible");
  document.body.classList.add("menu-open");
  hamburger.setAttribute("aria-expanded", "true");
  mobileMenu.setAttribute("aria-hidden", "false");
};

const closeMenu = () => {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("visible");
  document.body.classList.remove("menu-open");
  hamburger.setAttribute("aria-expanded", "false");
  mobileMenu.setAttribute("aria-hidden", "true");
};

hamburger.addEventListener("click", () => {
  if (mobileMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", closeMenu);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    closeMenu();
  }
});
