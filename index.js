const express = require('express');
var bodyParser = require('body-parser')
const https = require("https");
app = express()
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.sendFile(__dirname+ "/index.html");
});

 
    

app.post('/', function(req, res) {
    const query = req.body.cityName
    const apiKey = "b46df489f89c46dcd148de2d039bf716"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apiKey+"&units="+units+""
    https.get(url, function(response) {
        console.log(response.statusCode);
        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const weatherDescription = weatherData.weather[0].description
            res.write("<p>The weather is " + weatherDescription + "<p>")
            res.write("<h1>the temperature in "+query+ " is "+ temp + "degree</h1>");
            res.write("<img src="+imgURL+">");
            res.send()
        })
    })
})

app.listen(3000, function(req, res) {
    console.log('running')
})