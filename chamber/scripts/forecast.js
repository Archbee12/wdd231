  const apiKey = 'YOUR_API_KEY';
  const city = 'London'; // Change this to your chamber city
  const units = 'metric'; // use 'imperial' for Fahrenheit

  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;

  // Fetch current weather
  fetch(currentURL)
    .then(response => response.json())
    .then(data => {
      document.getElementById('temp').textContent = `Temperature: ${data.main.temp}°C`;
      document.getElementById('desc').textContent = `Condition: ${data.weather[0].description}`;
    });

  // Fetch 3-day forecast
  fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
      const forecastContainer = document.getElementById('forecast');
      forecastContainer.innerHTML = '';

      // Filter 3 forecast items approximately 24h apart
      const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
      dailyForecasts.forEach(day => {
        const date = new Date(day.dt_txt);
        const li = document.createElement('li');
        li.textContent = `${date.toDateString()}: ${day.main.temp}°C, ${day.weather[0].description}`;
        forecastContainer.appendChild(li);
      });
    });
