document.getElementById("getWeatherBtn").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "200363d8bc44c55d6cf927a7a16f7c2d";
  const loader = document.getElementById("loader");
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  loader.style.display = "block";
  result.innerHTML = "";

  const cityEncoded = encodeURIComponent(city);

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        result.innerHTML = `<p style="color:red;">City not found!</p>`;
        loader.style.display = "none";
        return;
      }

      const { name, sys, main, weather } = data;
      const icon = weather[0].icon;
      const flagUrl = `https://flagcdn.com/48x36/${sys.country.toLowerCase()}.png`;

      const currentTime = new Date().toLocaleString('en-US', {
        timeZone: data.timezone ? `Etc/GMT${-data.timezone / 3600}` : 'UTC'
      });

      result.innerHTML = `
        <h2>${name}, ${sys.country} <img src="${flagUrl}" alt="flag"></h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">
        <p><strong>Temperature:</strong> ${main.temp} °C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Time:</strong> ${currentTime}</p>
      `;
      loader.style.display = "none";
    })
    .catch(() => {
      result.innerHTML = `<p style="color:red;">Something went wrong. Try again!</p>`;
      loader.style.display = "none";
    });
});