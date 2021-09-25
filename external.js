console.log("Weaher Check");

const loader = document.querySelector("#loading");


function result() {
    // getting the input of user
    let userCity = document.getElementById("city").value;
    displayLoading();
    let error = document.getElementById("error");
    if(userCity == ''){
      error.classList.remove("d-none");
      return;
    }
   const cityCheck =async ()=>{
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=+'+userCity+'&APPID=209934f9048b56605059784b01a106b0');
      hideLoading();
      const users = await response.json();
      console.log(users);
      
      if(users.cod != 200 ){
        error.classList.remove("d-none");
        document.getElementById("error").innerHTML = users.message;
        return;
      }else{
        // city name
        document.getElementById("name").innerHTML = users.name;
        // temp
        let temprature = users.main.temp;
        let temp = Math.floor(temprature - 273.15);
        document.getElementById("temp").innerHTML = temp;
        // weather
        let weather = users.weather[0].description;
        document.getElementById("weather").innerHTML = weather;
        // speed
        document.getElementById("wind").innerHTML = users.wind.speed + "km/h";
        // time 
        let currentDate = new Date();
        let h = currentDate.getHours()
        let currentTime = h + ":" + ((currentDate.getMinutes()<10?'0':'') + currentDate.getMinutes());
        document.getElementById("time").innerHTML = currentTime;
        // latitude and longitude
        document.getElementById("lat").innerHTML = users.coord.lat;
        document.getElementById("long").innerHTML = users.coord.lon;
        document.getElementById("humidity").innerHTML = users.main.humidity;


         // removing form card ans showing result card
        let finalCard = document.getElementById("result");
        finalCard.classList.remove("d-none");

        let formCard = document.getElementById("form");
        formCard.classList.add("d-none");
      }

    }
cityCheck();
    // showing loading
    function displayLoading() {
      loader.classList.add("display");
      // to stop loading after some time
      setTimeout(() => {
          loader.classList.remove("display");
      }, 5000);
    }
    // hiding loading 
    function hideLoading() {
      loader.classList.remove("display");
    }

   


}

