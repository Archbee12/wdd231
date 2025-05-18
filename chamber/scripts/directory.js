const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
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
).format(today)}</span>`;

// This code is for the theme
const themeIcon = document.getElementById('theme-toggle-icon');
const body = document.body;

themeIcon.addEventListener('click', () => {
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    themeIcon.src = 'images/sun.svg'; // dark mode: show moon
    themeIcon.alt = 'Switch to light mode';
  } else {
    themeIcon.src = 'images/moon.png'; // light mode: show sun
    themeIcon.alt = 'Switch to dark mode';
  }
});

// List / Grid Display
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");


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


// Members.Json 
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

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
            <img src="images/${member.imageurl}" alt="${member.name}" width="100" height="100">
            <h2>${toTitleCase(member.name)}</h2>
            <p>${toTitleCase(member.address)}</p>
            <p>${member.phone}</p>
            <a href="${member.url}">Website</a>
        `;

        container.appendChild(memberElement);
    });
}

// Call fetchMembers on page load
document.addEventListener('DOMContentLoaded', fetchMembers);

