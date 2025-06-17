
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
      <p class="description">${interest.preview}</p>
      <p class="address">${interest.location}</p>
      <button class="learn-more-btn" data-id="${interest.name}">Learn More</button>
    `;

    interestContainer.appendChild(interestElement);
  });

  document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const selectedInterest = interests.find(interest => interest.name === event.target.dataset.id);
        showModal(selectedInterest);
    });
  });
}

function showModal(interest) {
    // Remove existing modal if present
    const existingModal = document.getElementById('interestModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create dialog element
    const modal = document.createElement('dialog');
    modal.id = 'interestModal';

    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 id="modal-title">${interest.name}</h2>
                <button id="closeModal">❌</button>
            </div>
            <p id="modal-description">${interest.description}</p>
            <p id="modal-location">📍 Location: ${interest.location}</p>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(modal);

    // Show the modal
    modal.showModal();

    // Close button functionality
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.close();
        modal.remove(); // Remove modal after closing
    });
}
fetchInterests();





const visitMessage = document.getElementById('visit-message');
const now = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

function getDaysBetween(current, previous) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((current - previous) / millisecondsPerDay);
}

let message = '';

if (!lastVisit) {
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

visitMessage.textContent = message;

localStorage.setItem('lastVisit', now);

