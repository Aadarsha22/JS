function getWeather () {
    const apiKey = `5350ca6a08f40b130041c87805072ba9`;
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching weather data. Please try again');
    });

    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
        displayHourlyForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again');
    }); 
}


function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const body = document.body; // Get reference to the body element

   
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHtml = `<p>${cityName}</p><p>${description}</p>`;


        if (description.includes('cloud')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Mostly Cloudy</p>`;
            body.style.backgroundImage = 'url("image/cloudy.jpg")';
        } else if (description.includes('rain')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Rainy</p>`;
            body.style.backgroundImage = 'url("image/rainy.jpg")';
        } else if (description.includes('haze')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Haze</p>`;
            body.style.backgroundImage = 'url("image/haze.jpg")';
        } else if (description.includes('clear sky')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Clear Sky</p>`;
            body.style.backgroundImage = 'url("image/clearsky.jpg")';
        } else if (description.includes('mist')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Mist</p>`;
            body.style.backgroundImage = 'url("image/mist.jpg")';
        }else if (description.includes('thunderstorm')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Thunderstorm</p>`;
            body.style.backgroundImage = 'url("image/thunderstorm.jpg")';
        }else if (description.includes('smoke')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Smoke</p>`;
            body.style.backgroundImage = 'url("image/smoke.jpg")';
        }else if (description.includes('snow')) {
            weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>Snow</p>`;
            body.style.backgroundImage = 'url("image/snow.jpg")';
            
        }else {
            weatherInfoDiv.innerHTML = weatherHtml;
            body.style.backgroundImage = 'none';
        }

        tempDivInfo.innerHTML = temperatureHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}



function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
