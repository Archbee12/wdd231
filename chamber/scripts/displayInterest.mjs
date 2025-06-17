const url = '../data/interest.json';

export async function fetchInterests() {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];
  }
}

export function displayInterest(interests) {
  const container = document.getElementById('cards');
  container.innerHTML = '';
  interests.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('interest-card');
    div.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
      <h2>${item.name}</h2>
      <p class="description">${item.description}</p>
      <p class="address">${item.location}</p>
    `;
    container.appendChild(div);
  });
}
