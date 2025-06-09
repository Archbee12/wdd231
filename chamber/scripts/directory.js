const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
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

// List / Grid Display
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("section");


gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList);

function showList() {
  display.classList.add("list");
  display.classList.remove("grid");
  // fetchMembers()
}


// Case Styling i.e, lower case, UPPER CASE, Sentence case, Title Case
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Members.Json 
const url = 'data/members.json'
async function fetchMembers() {
  
    const response = await fetch(url);
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    const container = document.getElementById('cards');
    container.innerHTML = ''; 

    members.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.classList.add('member-card');

        memberElement.innerHTML = `
            <img src="images/${member.imageurl}" alt="${member.name}" loading="lazy">
            <h2>${toTitleCase(member.name)}</h2>
            <p>${toTitleCase(member.address)}</p>
            <p>${member.phone}</p>
            <a href="${member.url}" target="_blank"><span>Visit</span> Website</a>
        `;

        container.appendChild(memberElement);
    });
}

// Call fetchMembers on page load
document.addEventListener('DOMContentLoaded', fetchMembers);



