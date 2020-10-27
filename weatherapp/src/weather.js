const e = require("express");
const request = require("request");
const PATHAPI = `https://www.metaweather.com/api/`;


const getLocationWeather = (eowid, Callback) => {
    request(`${PATHAPI}location/${eowid}/`, { json: true }, (error, res, body) => {
        if (error !== null || body.length === 0) {
            Callback(error = "not found weather !");
        }
        else{
            body = body.consolidated_weather;
            Callback(null,body);
        }
    });
}
// const key = `San Francisco`;
const searchLocation = (key, Callback) => {
    request(`${PATHAPI}location/search/?query=${key}`, { json: true }, (error, res, body) => {
        if (error !== null || body.length === 0) {
            Callback(error = "not found location !");
        }
        else if (body.length > 1) {
            body = body.map((item) => {return item.title});
            Callback(null,body);
        }
        else{
            body = body[0];
            getLocationWeather(body.woeid, Callback);
        }
    });
}

module.exports = {
    searchLocation: searchLocation,
}