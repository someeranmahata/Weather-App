const apikey = "8435ed666356c72a0b683d25774e5d44";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const btnclick = document.querySelector("#btn");
const search = document.querySelector(".search input");
const imageicon = document.querySelector(".weather-image");

btnclick.onclick = () => {
    const city = search.value.trim();
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    CheckWeather(city);
}

async function CheckWeather(city) {
    try {
        const response = await fetch(`${apiurl}&q=${city}&appid=${apikey}`);

        if (response.status === 404) {
            document.querySelector(".invalid").style.display = "block";
            document.querySelector(".weather").style.display = "none";
            return; // Stop execution here
        }

        const data = await response.json();

        document.querySelector(".temp").innerHTML = data.main.temp + "°C";
        document.querySelector(".cityname").innerHTML = city;
        document.querySelector(".wind span").innerHTML = data.wind.speed + "Km/h";
        document.querySelector(".humidity span").innerHTML = data.main.humidity + "%";

        // Change image according to weather
        if (data.weather[0].main === 'Clouds') {
            imageicon.src = "cloudy.png";
        } else if (data.weather[0].main === "Clear") {
            imageicon.src = "sunny.png";
        } else if (data.weather[0].main === "Rain") {
            imageicon.src = "rainy-day.png";
        } else if (data.weather[0].main === "Snow") {
            imageicon.src = "snow.png";
        }

        document.querySelector(".invalid").style.display = "none";
        document.querySelector(".weather").style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}
