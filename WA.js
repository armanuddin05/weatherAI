
function weather() {
    const key = '00b8ab442a2139811814b479ec376b99';
    const inp = document.getElementById('city').value;

    if (!inp) {
        alert("Invalid Input");
        return;
    }

    const current = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${key}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inp}&appid=${key}`;

    fetch (current)
        .then(response =>response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch (error => {
            console.error("Error occurred", error);
        });

    fetch (forecast)
        .then(response =>response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch (error => {
            console.error("Error occurred", error);
        });
}






function displayWeather(data) {

    const temp = document.getElementById("tempInfo");
    const weatherInfo = document.getElementById("weatherInfo");
    const hourlyInfo = document.getElementById("hourlyInfo");
     
    temp.innerHTML = "";
    weatherInfo.innerHTML = "";
    hourlyInfo.innerHTML = "";

    if (data.cod === "404"){
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;

        const tempHTML = `<p>${temperature}C</p>`;
        const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

        temp.innerHTML = tempHTML;
        weatherInfo.innerHTML = weatherHTML;

    }

}

function displayHourlyForecast(hourlyData) {
    const hourlyForecast = document.getElementById("hourlyInfo");
    const fullDay = hourlyData.slice(0, 8);

    fullDay.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);


        const hourlyItemHTML = `
        <div class="hourly-item">
        <span>${hour}:00</span>
        <span>${temperature}</span>
        </div>
        `;
        hourlyInfo.innerHTML += hourlyItemHTML;
    })
    
}















