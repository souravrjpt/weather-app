const {json} = require('body-parser');
const { response } = require('express');
const express = require('express');
const app = express();
const https = require('https');
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({entended:true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname+"/index.html")

});

app.post("/",(req,res)=>{
    // console.log(req.body.cityName);
    
    const city=req.body.cityName
    const userid="86344af4456bff89e9fa10887c5099e6";
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+ userid +"&units=metric";
    https.get(url, (response) => {
    console.log(response);
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgurl = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      
      res.write(
        '<h1>the temperature of '+city+' is ' +
          temp +
          ' and the weather currently ' +
          des +
          '</h1>'
      );
      res.write('<img src=' + imgurl + '>');
      res.send();
    });
    });
})


app.listen(3000, () => {
  console.log('server is running on port 3000.');
});
