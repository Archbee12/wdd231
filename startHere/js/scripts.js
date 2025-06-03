const getString = window.location.search;
console.log(getString);

const myinfo = new URLSearchParams(getString);
console.log(myinfo);

console.log(myinfo.get('first'));

document.querySelector('#results').innerHTML = `
<p>Appointment for ${myinfo.get('first')} ${myinfo.get('last')}</p>
<p>Proxy ${myinfo.get('ordinance')} on ${myinfo.get('date')} in the ${myinfo.get('location')}</p>
<p>Your Phone: ${myinfo.get('phone')} </p>
<p>Your email is ${myinfo.get('email')}</p>`