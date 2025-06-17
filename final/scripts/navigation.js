const hamburger = document.querySelector('.hamburger');
const nestedLinks = document.querySelector('nav');

hamburger.addEventListener('click', () => {
  nestedLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});

const menuItems = document.querySelectorAll('.menu-item');

menuItems.forEach(item => {
  const title = item.querySelector('.menu-title');

  title.addEventListener('click', () => {
	menuItems.forEach(i => {
	  if (i !== item) i.classList.remove('active');
	});
	item.classList.toggle('active');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dateElement = document.getElementById('current-date');

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const today = new Date().toLocaleDateString('en-US', options);

  dateElement.textContent = today;
});