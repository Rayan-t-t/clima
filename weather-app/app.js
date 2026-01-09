const API_KEY = '5dd80060d41546e53c8c3e113de42a27';

const btn = document.querySelector('#search-btn');
const input = document.querySelector('#city-input');
const result = document.querySelector('#weather-result');

// FUNCIÓN PARA MOSTRAR LOS DATOS
const renderWeather = (data) => {
    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;

    result.innerHTML = `
        <div class="weather-card">
            <h2>${cityName}</h2>
            <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Icono">
            <p class="temp">${temp}°C</p>
            <p class="desc">${desc.toUpperCase()}</p>
        </div>
    `;
};

// FUNCIÓN FETCH
const getWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Ciudad no encontrada');
            return response.json();
        })
        .then(data => {
            renderWeather(data);
        })
        .catch(err => {
            result.innerHTML = `<p class="error">${err.message}</p>`;
        });
};

btn.addEventListener('click', () => {
    if (input.value) getWeather(input.value);
});
