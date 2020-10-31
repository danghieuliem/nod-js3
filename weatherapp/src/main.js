const express = require('express');
const exphbs = require('express-handlebars');
const weather = require('./weather.js');
const path = require('path');
const app = express();
const post = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const searchkey = req.query.searchkey;
    if (!searchkey) {
        res.render("home", { searchkey });
    }
    else {
        weather.searchLocation(searchkey, (error, body) => {
            if (error !== null) {
                res.render('home', { error, searchkey });
            }
            else {
                res.render('home', { error, searchkey, body });
            }
        });
    }
});
app.get('/:woeid', (req, res) =>{
    const woeid = req.params.woeid;
    if(!woeid){
        res.render("home", { woeid, error: "woeid noot found !"});
    }
    else {
        weather.searcheowid(woeid,(error,body)=>{
            if (error !== null) {
                res.render('home', { error, woeid });
            }
            else {
                res.render('forecast', { error, woeid, body });
            }
        });
    }
});


app.listen(post, () => {
    console.log(`Runing at : http://localhost:${post}`);
});
