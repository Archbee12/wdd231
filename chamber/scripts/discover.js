const url = 'data/interest.json';

async function fetchInterests() {
  try {
    const response = await fetch(url);
    const interests = await response.json();
    displayInterest(interests);
  } 
  catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayInterest(interests) {
  const interestContainer = document.getElementById('cards');
  interestContainer.innerHTML = '';

  interests.forEach(interest => {
    const interestElement = document.createElement('div');
    interestElement.classList.add('interest-card');

    interestElement.innerHTML = `
      
      <img src="images/${interest.imageUrl}" alt="${interest.name}" loading="lazy">
    
      <h2>${interest.name}</h2>
      <p>${interest.description}</p>
      <p>${interest.location}</p>
    `;

    interestContainer.appendChild(interestElement);
  });
}
fetchInterests();


// Get reference to the sidebar element
const visitMessage = document.getElementById('visit-message');

// Get the current date and time
const now = Date.now();

// Try to retrieve the last visit from localStorage
const lastVisit = localStorage.getItem('lastVisit');

// Function to calculate days between two timestamps
function getDaysBetween(current, previous) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((current - previous) / millisecondsPerDay);
}

let message = '';

if (!lastVisit) {
  // First-time visitor
  message = "Welcome! Let us know if you have any questions.";
} else {
  const daysSinceLastVisit = getDaysBetween(now, Number(lastVisit));

  if (daysSinceLastVisit === 0) {
    message = "Back so soon! Awesome!";
  } 
  else {
    message = `Welcome back! You last visited ${daysSinceLastVisit} day(s) ago.`;
  }
}

// Display the message
visitMessage.textContent = message;

// Store the current date/time for future visits
localStorage.setItem('lastVisit', now);

