const express = require('express');
const exphbs = require('express-handlebars');
const weather = require('./weather.js');

const app = express();
const post = 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const searchkey = req.query.searchkey;
    if (!searchkey) {
        res.render("home", { searchkey });
        return;
    }
    else {
        weather.searchLocation(searchkey, (error, body) => {
            if (error !== null) {
                res.render('home', { error, searchkey });
            } else if (typeof (body[0]) === "object") {
                var a = 0;
                body.forEach(element => {
                    element.min_temp = Math.round(element.min_temp   *100) /100;
                    element.max_temp = Math.round(element.max_temp   *100) /100;
                    element.visibility = Math.round(element.visibility *100) /100;
                });
                res.render('home', { searchkey, body });
                console.log("aaaa");
            }
            else {
                const location = body;
                console.log("bbbb");
                res.render('home', { error, searchkey, location });

            }
        });
    }
});

app.listen(post, () => {
    console.log(`Runing at : http://localhost:${post}`);
});