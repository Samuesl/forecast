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
async function showForecast(latlng) {
    //console.log("Popup erzeugen bei:", latlng);
    let url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${latlng.lat}&lon=${latlng.lng}`;
    //console.log(url);
    let response = await fetch(url);
    let jsondata = await response.json();
    // console.log(jsondata);

    //popup erzeugen

    let markup = `
        <ul>
            <li>Luftdruck (hPa): air_pressure_at_sea_level</li>
            <li>Lufttemperatur (celsius): air_temperature</li>
            <li>Bewölkungsgrad (%) cloud_are_fraction</li>
            <li>Luftfeuchtigkeit (%) raelitve_humidity</li>
            <li>Windrichtung(°): wind_from_direction</li>
            <li>Windgeschwindigkeit (km/h): wind_speed</li>
        </ul>
        `;

    L.popup([
        latlng.lat, latlng.lng
    ], {
        content: markup
    }).openOn(overlays.forecast)

}


//auf Kartenklick reagieren
map.on("click", function (evt) {
    //console.log(evt, evt.latlng);
    showForecast(evt.latlng);
})

//Klick auf Innsbruck simulieren

map.fire("click", {
    latlng: {
        lat: ibk.lat,
        lng: ibk.lng,
    }
})