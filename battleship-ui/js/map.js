//var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map', {center: [51.505, -0.09], zoom: 13})

//creates a marker with a custom icon
function pointToLayer (feature, latlng) {
    return L.marker(latlng, {icon: busIcon});
}


//add a background tile layer
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmVpbGR1bmxvcCIsImEiOiJjaXhycGc1bDQwMDQ3MnhxaXFibDl4cXRsIn0.crgrBXCV-JDmTRk0j7Lg8w', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoibmVpbGR1bmxvcCIsImEiOiJjaXhycGc1bDQwMDQ3MnhxaXFibDl4cXRsIn0.crgrBXCV-JDmTRk0j7Lg8w'
}).addTo(map);

//define a custom icon for our bus markers
var busIcon = L.icon({
    iconUrl: '/ShuttleIcon_Blue.gif',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28]
});

//Websocket management
var ws;
(function(ws) {
    "use strict";
    if (window.WebSocket) {
        console.log("WebSocket object is supported in your browser");
        ws = new WebSocket("ws://192.168.99.102:8082");
        ws.onmessage = function(e) {
            console.log("echo from server : " + e.data);
            var positionJson = JSON.parse(e.data);
            L.marker([positionJson.latitude, positionJson.longitude], {icon: busIcon}).addTo(map);
            console.log("updated");
            sleep(2000);
        };

        ws.onclose = function() {
            console.log("onclose");
        };
        ws.onerror = function() {
            console.log("onerror");
        };

    } else {
        console.log("WebSocket object is not supported in your browser");
    }
})(ws);

function sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
}