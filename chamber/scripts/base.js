// const events = document.querySelector('#events');
// const currentWeather = document.querySelector('#current-weather');
// const weatherForecast = document.querySelector('#weather-forecast');

// function displayEvents

// try {
//     const response = await fetch('data/events.json'); // Fetch JSON file
//     const events = await response.json(); // Convert response to JSON
    
//     const container = document.getElementById("events");
//     container.innerHTML = ""; // Clear existing content
//     const eventHeading = document.createElement("h2");
//     eventHeading.textContent = `Upcoming Events`;
//     container.appendChild(eventHeading);

//     events.forEach(event => {
//       const card = document.createElement("div");
//       card.classList.add("event-card");

//       card.innerHTML = `
//         <h4>${event.title}</h4>
//         <p>Date: ${event.date}</p>
//       `;

//       container.appendChild(card);
//     });
//   } catch (error) {
//     console.error("Error fetching events:", error);
//   }

async function displayEvents() {
  try {
    const response = await fetch('data/events.json');
    const events = await response.json();
    
    const container = document.getElementById("events");
    container.innerHTML = `
      <h2>Upcoming Events</h2>
      <div class="events-container">
        ${events.map(event => `
          <div class="event-card">
            <h4>${event.title}</h4>
            <p>Date: ${event.date}</p>
          </div>
      `).join('')}
    </div>
    `;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
displayEvents();


// Current Weather
const currentWeather = document.querySelector('#current-weather');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');



async function apiFetch() {
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=6.55&lon=3.37&units=imperial&appid=037b9160becf87d87e1318de20c90160';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

function displayResults(data) {
  const weatherCard = document.getElementById("weather-card");

  // Convert sunrise and sunset timestamps
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  // Generate the weather details container
  weatherCard.innerHTML = `
    <h2>Current Weather</h2>
    <div class="weather-container">
      <div class="weather-image">
        <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="${data.weather[0].description}">
      </div>
      <div class="weather-details">
        <p>Temperature: ${data.main.temp}&deg;F</p>
        <p>${toTitleCase(data.weather[0].description)}</p>
        <p>High: ${data.main.temp_max}&deg;F</p>
        <p>Low: ${data.main.temp_min}&deg;F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime}</p>
      </div>
    </div>
  `;
}
// Fetch and display weather data
apiFetch();

async function getForecast() {

  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/forecast?lat=6.55&lon=3.37&units=imperial&appid=037b9160becf87d87e1318de20c90160'
  );
  const data = await response.json();

  // Group data by date (first entry of each day)
  const dailyData = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyData[date] && Object.keys(dailyData).length < 3) {
      dailyData[date] = item;
    }
  });

  displayForecast(Object.values(dailyData));
}

function displayForecast(days) {
  const container = document.getElementById('weather-forecast');
  container.innerHTML = `<h2>Weather Forecast</h2>`
  const forecastContainer = document.createElement('div');
  forecastContainer.className = 'forecast-container';

  days.forEach((day) => {
    const card = document.createElement('div');
    card.className = 'fore-card';

    const date = new Date(day.dt_txt).toLocaleDateString('en-US', {weekday: 'long'});
    const temp = Math.round(day.main.temp);
    const weather = day.weather[0].description;

    card.innerHTML = `
      <p>${date}: <span>${temp}&degF</span></p>
      <p class="fore-weather">${toTitleCase(weather)}</p>
    `;

    forecastContainer.appendChild(card);
  });

  container.appendChild(forecastContainer);
}

getForecast();

// Case Styling i.e, lower case, UPPER CASE, Sentence case, Title Case
function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

//Spotlight Ads
// const url = 'data/members.json'
// async function fetchMembers() {
  
//     const response = await fetch(url);
//     const members = await response.json();
//     displayMembers(members);
// }
fetch("data/members.json")
  .then(response => response.json())
  .then(members => {
    const spotlightMembers = members.filter(member => member.member_level === "2" || member.member_level === "3");

    const shuffledMembers = spotlightMembers.sort(() => 0.5 - Math.random());

    const selectedMembers = shuffledMembers.slice(0, Math.floor(Math.random() * 2) + 2);

    const spotlightContainer = document.getElementById("spotlight");
    spotlightContainer.innerHTML = selectedMembers.map(member => `
      <div class="member-container card">
        <h2 class="name">${toTitleCase(member.name)}</h2>
        <div class="member-card">
          <div class="member-img">
            <img src="images/${member.imageurl}" alt="${member.name}" loading="lazy">
          </div>
          <div class="member-info">
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.url}" target="_blank">Visit Website</a></p>
            <p><strong>Membership Level:</strong> ${member.member_level === "3" ? "Gold" : "Silver"}</p>
          </div>
        </div>
      </div>
    `).join("");
  })




// Forecast
// function displayForecast(data) {
//   const forecastCard = document.getElementById('weather-forecast');

//   let forecastHTML = `
//   <h2>3-Day Forecast </h2>
//   <div class = "weather-container">`;
  
//   const dailyForecasts = {};
//   data.list.forEach(item => {
//     const data = item.dt_txt.split(' ')[0];
//     if (!dailyForecasts[date]) {
//       dailyForecasts[date] = {
//         temp: item.main.temp,
//         icon: item.weather[0].icon,
//         description: item.weather[0].description
//       };
//     }
//   });

//   Object.keys(dailyForecasts).slice(0, 3).forEach(date => {
//     const { temp, icon, description } = dailyForecasts[date];

//     forecastHTML += `
//     <div class="forecast-card">
//       <h3>${date}</h3>
//       <div class="weather-details">
//         <p>Temperature: ${temp}$deg;F</p>
//         <p>${description}</p>
//       </div>
//     </div>`;
//   });

//   forecastHTML += `</div>`;

//   forecastCard.innerHTML = forecastHTML;
// }

// apiFetch();

// function displayResults(data) {
//     const weatherCard = document.getElementById("weather-card");
//     weatherCard.innerHTML = ""; // Clear existing content

//     // Create heading
//     const heading = document.createElement("h2");
//     heading.textContent = "Current Weather";

//     // Create temperature display
//     const temp = document.createElement("p");
//     temp.innerHTML = `Temperature: ${data.main.temp}&deg;F`;

//     // Create weather description
//     const description = document.createElement("p");
//     description.innerHTML = `${data.weather[0].description}`;

//     // Create high and low temperatures
//     const highTemp = document.createElement("p");
//     highTemp.innerHTML = `High: ${data.main.temp_max}&deg;F`;

//     const lowTemp = document.createElement("p");
//     lowTemp.innerHTML = `Low: ${data.main.temp_min}&deg;F`;

//     // Create humidity
//     const humidity = document.createElement("p");
//     humidity.innerHTML = `Humidity: ${data.main.humidity}%`;

//     // Convert sunrise and sunset times
//     const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
//     const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();

//     const sunrise = document.createElement("p");
//     sunrise.innerHTML = `Sunrise: ${sunriseTime}`;

//     const sunset = document.createElement("p");
//     sunset.innerHTML = `Sunset: ${sunsetTime}`;

//     // Create figure container
//     const figure = document.createElement("figure");

//     // Create weather icon
//     const weatherIcon = document.createElement("img");
//     const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     weatherIcon.setAttribute("src", iconsrc);
//     weatherIcon.setAttribute("alt", data.weather[0].description);

//     // Create caption for weather description
//     const caption = document.createElement("figcaption");
//     caption.textContent = data.weather[0].description;

//     weatherCard.appendChild(heading);
//     weatherCard.appendChild(temp);
//     weatherCard.appendChild(description);
//     weatherCard.appendChild(highTemp);
//     weatherCard.appendChild(lowTemp);
//     weatherCard.appendChild(humidity);
//     weatherCard.appendChild(sunrise);
//     weatherCard.appendChild(sunset);
//     figure.appendChild(weatherIcon);
//     // figure.appendChild(caption);
//     weatherCard.appendChild(figure);
//   }

// // Fetch and display weather data
// apiFetch();


