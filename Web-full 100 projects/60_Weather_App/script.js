document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

    const fetchWeatherData = async (city) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            const data = await response.json();
            displayWeatherData(data);
            errorMessage.textContent = '';
        } catch (error) {
            console.error('Error fetching weather data:', error);
            errorMessage.textContent = error.message;
            clearWeatherData();
        }
    };

    const displayWeatherData = (data) => {
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Description: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    };

    const clearWeatherData = () => {
        cityName.textContent = '';
        temperature.textContent = '';
        description.textContent = '';
        humidity.textContent = '';
        windSpeed.textContent = '';
    };

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeatherData(city);
            }
        }
    });
});