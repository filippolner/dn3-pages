//jshint esversion: 8
var markerji = [];
var poligoni = [];
var mapa = new L.map('mapa_id').setView([46.05004,14.46932], 9);
var slika = "<br><img src=knjiznice/css/bol.svg width=20 height=20></img>";

// Ustvarimo prikazni sloj mape
var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

mapa.addLayer(layer);

var popup = L.popup();

function klik(e) {
    var latlng = e.latlng;
    popup
        .setLatLng(latlng)
        .setContent("Izbrana točka: " + latlng.toString())
        .openOn(mapa);
        prikazPoti(latlng);
}
mapa.on('click', klik);

function dodajBolnisnice() {
    pridobiPodatke(function (jsonRezultat){
        izrisRezultatov(jsonRezultat);
    });
}
dodajBolnisnice();
function pridobiPodatke(callback) {

    var i = 0;
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "knjiznice/json/bolnisnice.json", true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var json = JSON.parse(xobj.responseText);
            callback(json);
        }
    };
    xobj.send(null);
}
////////////////////
function izrisRezultatov(jsonRezultat) {
    var znacilnosti = jsonRezultat.features;

    for (var i = 0; i < znacilnosti.length; i++) {
        var jeObmocje = typeof(znacilnosti[i].geometry.coordinates[0]) == "object";
        var opis = znacilnosti[i].properties.name;
        var ulica = znacilnosti[i].properties["addr:street"];
        var mesto = znacilnosti[i].properties["addr:city"];
        if (opis == undefined) {
            opis = "Ni podatka";
        }
        if (ulica == undefined) {
            ulica = "Ni podatka";
        }
        if (mesto == undefined) {
            mesto = "Ni podatka";
        }
        if (znacilnosti[i].geometry.type == "Point") {
            var lng = jeObmocje ? znacilnosti[i].geometry.coordinates[0][0][0] : znacilnosti[i].geometry.coordinates[0];
            var lat = jeObmocje ? znacilnosti[i].geometry.coordinates[0][0][1] : znacilnosti[i].geometry.coordinates[1];
            console.log(lat,lng);
            dodajMarker(lat, lng, opis, znacilnosti[i].properties.amenity, ulica, mesto);
        } else {
            try {
                var array = znacilnosti[i].geometry.coordinates;
                var obmocje = [];
                for (var x = 0; x < array.length; x++) {
                    var temp = array[x];
                    for (var y = 0; y < temp.length; y++) {
                        if (temp[y][0] != null || temp[y][0] != 0 || temp[y][1] != null || temp[y][1] != 0) {
                            var coordinate = [temp[y][1], temp[y][0]];
                            obmocje.push(coordinate);
                        }
                    }
                }
                var opis1 = znacilnosti[i].properties.name;
                var ulica1 = znacilnosti[i].properties["addr:street"];
                var mesto1 = znacilnosti[i].properties["addr:city"];
                if (opis1 == undefined) {
                    opis1 = "Ni podatka";
                }
                if (ulica1 == undefined) {
                    ulica1 = "Ni podatka";
                }
                if (mesto1 == undefined) {
                    mesto1 = "Ni podatka";
                }
                
                var popupText = opis1 + "<br>" + ulica1 + "<br>" + mesto1 + slika;

                if (znacilnosti[i].properties.emergency == "yes") {
                    var poligon = L.polygon(obmocje, { color: 'green', opacity: 1 }).bindPopup(popupText);
                    poligoni.push(poligon);      
                    poligon.addTo(mapa);
                    } else if (znacilnosti[i].properties.emergency == "no") {
                      var poligon1 = L.polygon(obmocje, { color: 'yellow', opacity: 1 }).bindPopup(popupText);      
                    poligon1.addTo(mapa);
                    } else {
                      var poligon2 = L.polygon(obmocje, { color: 'blue', opacity: 1 }).bindPopup(popupText);     
                    poligon2.addTo(mapa);
                    }
            }
            catch(error) {
                console.log(error);
            }
        }
        console.log(znacilnosti[i]);
    }
}
function dodajMarker(lat, lng, opis, tip, ulica, mesto) {
    var ikona = new L.Icon({
        iconUrl: 'https://image.flaticon.com/icons/svg/459/459225.svg',
        shadowUrl: 'https://teaching.lavbic.net/cdn/OIS/DN1/' + 
        'marker-shadow.png',
        iconSize: [30, 30],
        iconAnchor: [0, 30],
        popupAnchor: [1, -34],
        shadowSize: [30, 30]
    });
 
    var marker = L.marker([lat, lng], {icon: ikona});
    var text = opis + "<br>" + ulica + "<br" + mesto + "<br>" + slika;
    marker.bindPopup(text).openPopup();

    marker.addTo(mapa);
    markerji.push(marker);
}

function prikazPoti(latLng) {
    for (var i = 0; i < poligoni.length; i++) {
        var tocka = poligoni[i].getLatLngs();
        if (tocka[0][0] == undefined) {
            continue;
        }
        for (var a = 0; a < tocka[0].length; a++) {
            if (distance(latLng.lat, latLng.lng, tocka[0][a].lat, tocka[0][a].lng, "M") <= 5) {
                poligoni[i].setStyle({
                    color: 'green', 
                    fillColor: 'green'
                });
            } else {
                poligoni[i].setStyle({
                    color: 'blue', 
                    fillColor: 'blue'
                });
            }
        }
    }
}

