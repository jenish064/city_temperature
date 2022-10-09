const localhost_port = 3000;
var city_name_global = "a";

const express = require("express");
const http = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const city_name = req.body.cityName;

    console.log(city_name);

    city_name_global = city_name;
    const api_key = "01fb107938d6ddb295bfbce693ae4123";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city_name + "&appid=" + api_key + "&units=" + unit ;

    http.get(url, function(response) {
        console.log(response.statusCode);

        response.on("data", function(data) {  //getting hold of the data from the response.
            const weatherData = JSON.parse(data);  //parsing the the JSON data in form of the actual javascript object.
            const city_temperature = weatherData.main.temp;  //digging through the data to get the required pieces of data.

            console.log(city_temperature);

            res.write("<h1> The temprature in " + city_name_global + " is " + city_temperature + "</h1>");
            res.send();
        });
    });
});



app.listen(localhost_port, function() {
    console.log(localhost_port + " got activated and updated...");
});