// https://home.openweathermap.org/api_keys
const apiKey = 'e4a6ae056e1c22902647176dbb732407';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const useLocationButton = document.getElementById('useLocationButton');
const cityNameElement = document.getElementById('cityName');
const temperatureElement = document.getElementById('temperature');
const weatherDescriptionElement = document.getElementById('weatherDescription');
const localTimeElement = document.getElementById('localTime');
const weatherIconElement = document.getElementById('weatherIcon');
const mapElement = document.getElementById('map');


async function fetchWeatherData(city) {
	try {
		const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

async function fetchWeatherDataByLocation() {
	try {
		if (navigator.geolocation) {
			const position = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject);
			});

			const { latitude, longitude } = position.coords;
			const response = await fetch(`${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
			const data = await response.json();
			return data;
		} else {
			alert("Geolocation is not supported by this browser.");
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}


function displayMap(latitude, longitude) {
	const map = L.map(mapElement).setView([latitude, longitude], 13);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

	L.marker([latitude, longitude]).addTo(map);
}

function displayWeatherData(weatherData, localTime, latitude, longitude) {
	cityNameElement.textContent = weatherData.name;
	temperatureElement.textContent = `${Math.round(weatherData.main.temp)}°C`;
	weatherDescriptionElement.textContent = weatherData.weather[0].description;

	const cityTime = new Date(localTime * 1000);
	const localTimeFormatted = cityTime.toLocaleTimeString([], { timeStyle: 'short' });
	localTimeElement.textContent = `Local Time: ${localTimeFormatted}`;

	const weatherIconClass = getWeatherIconClass(weatherData.weather[0].icon);
	weatherIconElement.className = `weather-icon ${weatherIconClass}`;

	displayMap(latitude, longitude);
}

useLocationButton.addEventListener('click', async () => {
	const weatherData = await fetchWeatherDataByLocation();
	if (weatherData) {
		displayWeatherData(weatherData, weatherData.dt);
	}
});

function getWeatherIconClass(iconCode) {
	const iconMap = {
		'01d': 'fas fa-sun',
		'01n': 'fas fa-moon',
		'02d': 'fas fa-cloud-sun',
		'02n': 'fas fa-cloud-moon',
		'03d': 'fas fa-cloud',
		'03n': 'fas fa-cloud',
		'04d': 'fas fa-cloud',
		'04n': 'fas fa-cloud',
		'09d': 'fas fa-cloud-showers-heavy',
		'09n': 'fas fa-cloud-showers-heavy',
		'10d': 'fas fa-cloud-sun-rain',
		'10n': 'fas fa-cloud-moon-rain',
		'11d': 'fas fa-bolt',
		'11n': 'fas fa-bolt',
		'13d': 'fas fa-snowflake',
		'13n': 'fas fa-snowflake',
		'50d': 'fas fa-smog',
		'50n': 'fas fa-smog'
	};
	return iconMap[iconCode] || 'fas fa-question';
}

searchInput.addEventListener('keydown', async (event) => {
	if (event.key === 'Enter') {
		const city = searchInput.value.trim();
		if (city !== '') {
			const weatherData = await fetchWeatherData(city);
			if (weatherData) {
				displayWeatherData(weatherData, weatherData.dt);
			}
		}
	}
});

searchButton.addEventListener('click', async () => {
	const city = searchInput.value.trim();
	if (city !== '') {
		const weatherData = await fetchWeatherData(city);
		if (weatherData) {
			displayWeatherData(weatherData, weatherData.dt);
		}
	}
});