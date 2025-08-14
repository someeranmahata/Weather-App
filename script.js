const apikey = API_KEY;
const apiurl = API_URL;

const btnclick = document.querySelector("#btn");
const search = document.querySelector(".search input");
const imageicon = document.querySelector(".weather-image");



btnclick.onclick = () => {
    CheckWeather(search.value);
}
async function CheckWeather(city){
    const response  = await fetch(apiurl + `&q=${city}` +`&appid=${apikey}`);
    if(response.status == 404){
        document.querySelector(".invalid").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    var data = await response.json();

    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".cityname").innerHTML = city;  
    document.querySelector(".wind span").innerHTML = data.wind.speed + "Km/h";  
    document.querySelector(".humidity span").innerHTML = data.main.humidity + "%";
      
    //changing image according to wheather
    console.log(data.weather[0].main);
    if(data.weather[0].main == 'Clouds'){
        imageicon.src = "cloudy.png";
    }
    else if(data.weather[0].main == "Clear"){
        imageicon.src = "sunny.png";
    }
    else if(data.weather[0].main == "Rain"){
        imageicon.src = "rainy-day.png";
    }
    else if(data.weather[0].main == "Snow"){
        imageicon.src = "snow.png";
    }

    document.querySelector(".invalid").style.display = "none";
    document.querySelector(".weather").style.display = "block";
}
