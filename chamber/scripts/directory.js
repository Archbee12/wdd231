

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



