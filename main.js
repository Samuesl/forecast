/* Wind & Wetter Beispiel */

// Innsbruck
let ibk = {
    lat: 47.267222,
    lng: 11.392778
};

// Karte initialisieren
let map = L.map("map").setView([ibk.lat, ibk.lng], 5);

// thematische Layer
let overlays = {
    forecast: L.featureGroup().addTo(map),
    wind: L.featureGroup().addTo(map)
}

// Layer Control
let layerControl = L.control.layers({
    "Openstreetmap": L.tileLayer.provider("OpenStreetMap.Mapnik"),
    "Esri WorldTopoMap": L.tileLayer.provider("Esri.WorldTopoMap"),
    "Esri WorldImagery": L.tileLayer.provider("Esri.WorldImagery").addTo(map)
}, {
    "Wettervorhersage MET Norway": overlays.forecast,
    "ECMWF Windvorhersage": overlays.wind,
}).addTo(map);

// Maßstab
L.control.scale({
    imperial: false,
}).addTo(map);

//MET Norway Vorhersage visualisieren
async function showForecast(latlng){
    console.log("popup erzeugen bei:", latlng);

}

//auf KArtenklick reagieren
map.on("click", function(evt) {
    console.log(evt, evt.latlng);
    showForecast(evt.latlng);
})

//Klick auf Innsbruck simulieren

map.fire("click", {
    latlng: {
        lat: ibk.lat,
        lng: ibk.lng,
    }
})