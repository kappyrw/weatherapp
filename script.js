const apiKey = '8fb57f960bcd44bc97e81927230408'; 

const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;
  if (location.trim() !== '') {
    getWeatherData(location);
  }
});

async function getWeatherData(location) {
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Weather data not available for this location.');
    }
    const data = await response.json();
    displayWeatherInfo(data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
  }
}

function displayWeatherInfo(data) {
  const location = data.location.name;
  const temperature = data.current.temp_c;
  const weatherDescription = data.current.condition.text;

  weatherInfo.innerHTML = `
    <h2>${location}</h2>
    <p>Temperature: ${temperature} °C</p>
    <p>Weather: ${weatherDescription}</p>
  `;
}
