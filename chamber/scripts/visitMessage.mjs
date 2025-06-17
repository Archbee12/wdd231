export function showVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const now = Date.now();
  const lastVisit = localStorage.getItem('lastVisit');

  const getDaysBetween = (current, previous) => Math.floor((current - previous) / (1000 * 60 * 60 * 24));

  let message = lastVisit
    ? (getDaysBetween(now, Number(lastVisit)) === 0
      ? "Back so soon! Awesome!"
      : `Welcome back! You last visited ${getDaysBetween(now, Number(lastVisit))} day(s) ago.`)
    : "Welcome! Let us know if you have any questions.";

  visitMessage.textContent = message;
  localStorage.setItem('lastVisit', now);
}
