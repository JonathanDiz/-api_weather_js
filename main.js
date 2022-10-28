//API - Open Weather Map
let container = document.getElementById("container")
let searchForm = document.getElementById("search__submit")
let searchInput = document.getElementById("search__input")
let temperaturaDegrees = document.getElementById("degreeNumber")
let weatherIcon = document.getElementById("weatherIcon")
let temperatureDescription = document.getElementById("description")
let timeZone = document.getElementById("timezone")
let date = document.getElementById("date")
let min = document.getElementById("min")
let max = document.getElementById("max")

const c=console.log,
contenedor = document.getElementById('contenedor__weather'),
url = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=7117f48d849f2c332471fa8666036f3e"
fragmento = document.createDocumentFragment()

const displayBackgroundImage = (obj)=>{
  let dateSpanish = new Date(obj.list[24].dt*1000).toLocaleString("es-Es", {
    timeStyle: "short",
    dateStyle: "long"
  })
  c(dateSpanish)
  date.textContent = `Actualización ${dateSpanish}`
  const dayHour = new Date(obj.list[0].dt*1000).getHours()
  c(dayHour)
  //Logica
  if(dayHour > 6 && dayHour < 20){
    container.classList.remove("night")
    container.classList.add("day")
  }else{
    container.classList.remove("day")
    container.classList.add("night")
  }
}
const displayData=(obj)=>{
  temperaturaDegrees.textContent = Math.floor(obj.list[0].main.temp-273.15)
  timeZone.textContent = obj.list[0].name
  const icon = obj.list[0].weather[0].icon
  weatherIcon.innerHTML = `<img src='icons/${icon}.png'></img>`
  min.textContent = Math.floor(obj.list[0].main.temp_min-273.15)
  max.textContent = Math.floor(obj.list[0].main.temp_max-273.15)
  temperatureDescription.textContent = obj.list[0].weather[0].description.charAt(0).toUpperCase()+
  obj.list[0].weather[0].description.slice(1)
}

const getWeatherData = async (city)=>{
  const res = await fetch(url)
  .catch((err)=>{
     "cod"; 429,
    "message"; "Your account is temporary blocked due to exceeding of requests limitation of your subscription type."
    "Please choose the proper subscription http://openweathermap.org/price"
    c(err)
  })
  const data = await res.json()

  displayBackgroundImage(data)
  displayData(data)
}

searchForm.addEventListener("submit", e=>{
  e.preventDefault()
  getWeatherData(searchInput.value)
})

window.onload = ()=>{
  getWeatherData()
}