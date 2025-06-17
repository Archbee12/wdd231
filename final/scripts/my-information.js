// Get submitted form data
const myinfo = new URLSearchParams(window.location.search);
const timestampEl = myinfo.get('timestamp');

const date = new Date();

const options = {
  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
};

document.querySelector('#results').innerHTML = `
  <h3>Thank You for Your Feedback!</h3>
  <div>
      <p><strong>Name:</strong> ${myinfo.get('first')} ${myinfo.get('last')}</p>
      <p><strong>Phone:</strong> ${myinfo.get('phone')}</p>
      <p><strong>Email:</strong> ${myinfo.get('email')}</p>
      <p><strong>Rating:</strong> ${myinfo.get('rating')}</p>
      <p><strong>Feedback:</strong> ${myinfo.get('description')}</p>
      <p>We appreciate you taking the time to share your experience with us.</p>
      <a href="index.html">Return to Home</a>
  </div>
  <p><strong>Submitted At:</strong> ${isNaN(date) ? 'Invalid date' : date.toLocaleDateString(undefined, options)}</p>
`;