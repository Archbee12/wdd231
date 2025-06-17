const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav-link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});


const currentYear = document.querySelector("#currentYear");

// use the date object
const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let oLastModif = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat(
  "en-US",
  {
    dateStyle: "medium",
    timeStyle: "medium",
  }
).format(oLastModif)}</span>`;

// This code is for the theme (Dark/Light theme)
const themeIcon = document.getElementById('theme-toggle-icon');
const body = document.body;

// This is to apply the saved theme not to change theme when switching from one nav to another
function applyTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.src = 'images/sun.svg';
    themeIcon.alt = 'Switch to light mode';
  } 
  else {
    body.classList.remove('dark-theme');
    themeIcon.src = 'images/moon.png';
    themeIcon.alt = 'Switch to dark mode';
  }
}

applyTheme();


themeIcon.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    themeIcon.src = 'images/sun.svg'; // dark mode: show moon
    themeIcon.alt = 'Switch to light mode';
    localStorage.setItem('theme', 'dark');
  } 
  else {
    themeIcon.src = 'images/moon.png'; // light mode: show sun
    themeIcon.alt = 'Switch to dark mode';
    localStorage.setItem('theme', 'light');
  }
});