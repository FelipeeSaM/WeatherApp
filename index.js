const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const erro = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const KeyAPI = '8a3147dccdbfaf5e70bdb10b643090e8';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KeyAPI}`).then(
        resp => resp.json()).then(
        json => {
            if(json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                erro.style.display = 'block';
                erro.classList.add('fadeIn');
                return;
            }

            erro.style.display = 'none';
            erro.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            const pressure = document.querySelector('.weather-details .pressure span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/Clear.png';
                    break;
                
                case 'Rain':
                    image.src = 'images/Rain.png';
                break;
                
                case 'Snow':
                    image.src = 'images/Snow.png';
                break;

                case 'Clouds':
                    image.src = 'images/Clouds.png';
                break;
                    
                case 'Haze':
                    image.src = 'images/Haze.png';
                break;
                    
                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span> °C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            pressure.innerHTML = `${parseInt(json.main.pressure)}`
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
            
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        }
    );

});