document.addEventListener('DOMContentLoaded', async () => {
  const membershipCards = document.getElementById('membershipCards');
  const membershipModal = document.getElementById('membership-details');

  let memberships = [];

  try {
    const response = await fetch('data/memberships.json');
    if (!response.ok) throw new Error('Network response was not ok');
    memberships = await response.json();
  } catch (error) {
    console.error('Error fetching memberships:', error);
    membershipCards.innerHTML = '<p class="error">Failed to load membership options.</p>';
    return;
  }

  // Build cards dynamically
  memberships.forEach((membership) => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <h3>${membership.level}</h3>
      <p>${membership.description}</p>
      <button class="details-btn">${membership.level}</button>
    `;

    membershipCards.appendChild(card);
  });

  // Event delegation for all buttons
  membershipCards.addEventListener('click', (event) => {
    if (event.target.classList.contains('details-btn')) {
      const level = event.target.textContent.trim();
      let membership;

      for (let item of memberships) {
        if (item.level === level) {
          membership = item;
          break;
        }
      }

      if (membership) {
        showModal(membership);
      }
    }
  });

  function showModal(membership) {
    membershipModal.innerHTML = `
      <h2>
        ${membership.level}
        <button id="closeModal">❌</button>
      </h2>
      <p><strong>Description:</strong> ${membership.description}</p>
      <p><strong>Benefits:</strong></p>
      <ul>${membership.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
    `;
    membershipModal.showModal();

    document.getElementById('closeModal').addEventListener('click', () => {
      membershipModal.close();
    });
  }

  membershipModal.addEventListener('click', (e) => {
    if (e.target === membershipModal) {
      membershipModal.close();
    }
  });
});

// Thank you page

//TimeStamp 
const getString = window.location.search;
const myinfo = new URLSearchParams(getString);
const timestampEl = myinfo.get('timestamp');

const date = new Date();

const options = {
  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
};

//Result will dynamically display this
const level = myinfo.get('level') || myinfo.get('membership-level');

document.querySelector('#results').innerHTML= `
<h3>We are excited you are here</h3>
<div>
  <p>Name: ${myinfo.get('first')} ${myinfo.get('last')}</p>
  <p>Phone: ${myinfo.get('phone')} </p>
  <p>Email: ${myinfo.get('email')}</p>
  <p>Level Request: ${level} Membership</p>
</div>
<p><strong>Submitted At:</strong> ${isNaN(date) ? 'Invalid date' : date.toLocaleDateString(undefined, options)}</p>
`

// //Dynamically generated membership card
// function generateMembershipCards() {
//   const container = document.getElementById("membershipCards");
//   container.innerHTML = " "; 

//   membershipLevels.forEach(level => {
//     const cardHTML = `
//       <div class="card">
//         <h3>${level.name}</h3>
//         <p>${level.description}</p>
//         <button type="button" data-modal="${level.id}">View Benefits</button>
//       </div>
//     `;
//     container.innerHTML += cardHTML;
//   });
// }

document.addEventListener("DOMContentLoaded", () => {
  generateMembershipCards();
});