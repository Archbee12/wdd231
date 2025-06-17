document.addEventListener('DOMContentLoaded', async () => {
  const iconBoxes = document.querySelectorAll('.icons-container');

  let dialogContents = [];

  try {
    const response = await fetch('data/holds.json');
    if (!response.ok) throw new Error('Failed to load dialog data');
    dialogContents = await response.json();
  } catch (error) {
    console.error('Dialog fetch error:', error);
    return;
  }

  iconBoxes.forEach((box, index) => {
    const dialog = box.querySelector('.custom-dialog');
    const content = dialogContents[index];

    if (!dialog || !content) return;

    dialog.innerHTML = `
      <button id="close-dialog-${index}" class="close-btn">&times;</button>
      <strong>${content.title}</strong>
      <p>${content.body}</p>
      <a href="#" class="view-link">${content.link} <span>&#x1F846;</span></a>
    `;

    // Show/hide dialog when box is clicked
    box.addEventListener('click', () => {
      document.querySelectorAll('.custom-dialog').forEach(d => d.style.display = 'none'); // Hide others
      dialog.style.display = 'block'; // Show current
    });

    // Close button
    document.getElementById(`close-dialog-${index}`).addEventListener('click', () => {
      dialog.style.display = 'none';
    });

    dialog.addEventListener('click', (event) => {
      event.stopPropagation(); // Stop event from propagating to parent elements
    });


  });
});
