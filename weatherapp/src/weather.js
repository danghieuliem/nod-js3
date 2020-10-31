const e = require("express");
const request = require("request");
const PATHAPI = `https://www.metaweather.com/api/`;


const getLocationWeather = (eowid, Callback) => {
    request(`${PATHAPI}location/${eowid}/`, { json: true }, (error, res, body) => {
        if (error !== null || body.length === 0) {
            Callback(error = "not found weather !");
        }
        else{
            body = {
                title:body.title,
                weather: body.consolidated_weather.map((item) => {
                    return {
                        applicable_date: item.applicable_date,
                        weather_state_name: item.weather_state_name,
                        min_temp: Math.round(item.min_temp*100)/100,
                        max_temp: Math.round(item.max_temp*100)/100,
                        visibility: Math.round(item.visibility*100)/100,
                        weather_state_abbr: item.weather_state_abbr
                    }
                })
            }
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
        else if (body.length > 0) {
            body = body.map((item) => {return { location: item.title, woeid: item.woeid}});
            Callback(null,body);
        }
    });
}

const searcheowid = (key, Callback) =>{
    request(`${PATHAPI}location/${key}`, { json: true }, (error, res, body) => {
        if (error !== null || body.length === 0) {
            Callback(error = "not found location !");
        }
        else{
            getLocationWeather(body.woeid, Callback);
        }
    })
}

module.exports = {
    searchLocation: searchLocation,
    searcheowid: searcheowid
}