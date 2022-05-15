require("dotenv").config();
const express = require("express")
const https = require("https")
const body = require("body-parser")
const ejs = require("ejs");

const app = express()
app.use(body.urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.use(express.static("Resource"))


app.get("/" ,function(req,res){
    var defa = "Delhi"  //default
    const D_url =`https://api.openweathermap.org/data/2.5/weather?q=${defa}&appid=${process.env.appid}&units=metric`
    
    https.get(D_url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const D_weatherData =JSON.parse(data)
        res.render("index",{D_weather:D_weatherData ,city:defa})
    })
})
})
app.post("/", function(req,res){
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${req.body.Cityname}&appid=${process.env.appid}&units=metric`
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
        const weatherData =JSON.parse(data)
        res.render("index",{D_weather:weatherData,city:weatherData.name})
    })
    
})
})


app.listen(2000,function(){
    console.log("server is up");
})
