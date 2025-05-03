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
  