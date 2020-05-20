var markerji = [];
  var poligoni = [];
    var mapa = new L.map('mapa_id').setView([46.05004,14.46932], 9);

    // Ustvarimo prikazni sloj mape
    var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Prikazni sloj dodamo na mapo
    mapa.addLayer(layer);

    // Objekt oblačka markerja
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
      xobj.onreadystatechange = function () {
       // rezultat ob uspešno prebrani datoteki
        if (xobj.readyState == 4 && xobj.status == "200") {
          var json = JSON.parse(xobj.responseText);
          callback(json);
        }
      };
      xobj.send(null);
    }
    /////////cooooooooooooo---------------------------------
    function izrisRezultatov(jsonRezultat) {
  var znacilnosti = jsonRezultat.features;

  for (var i = 0; i < znacilnosti.length; i++) {
    var jeObmocje = 
      typeof(znacilnosti[i].geometry.coordinates[0]) == "object";
    var opis = znacilnosti[i].properties.name;
    var ulica = znacilnosti[i].properties["addr:street"];
    var mesto = znacilnosti[i].properties["addr:city"];
    if(opis == undefined) {
      opis = "Ni podatka";
    }
    if (ulica == undefined) {
      ulica = "Ni podatka";
    }
    if (mesto == undefined) {
      mesto="Ni podatka";
    }
    console.log(znacilnosti[i]);
    if(znacilnosti[i].geometry.type == "Point"){
      // pridobimo koordinate
      var lng = jeObmocje ? znacilnosti[i].geometry.coordinates[0][0][0] : 
        znacilnosti[i].geometry.coordinates[0];
      var lat = jeObmocje ? znacilnosti[i].geometry.coordinates[0][0][1] : 
        znacilnosti[i].geometry.coordinates[1];
     console.log(lat,lng);
      dodajMarker(lat, lng, opis, znacilnosti[i].properties.amenity, ulica, mesto);
    }
    else{
      try{
      
      var array = znacilnosti[i].geometry.coordinates;
     
      
     var obmocje = [];
    for(var k = 0; k < array.length; k++){
      var temp = array[k];
      for(var j = 0; j < temp.length; j++){
          if (temp[j][0] != null || temp[j][0] != 0 || temp[j][1] != null || temp[j][1] != 0) {
            var coordinate = [temp[j][1], temp[j][0]];
            obmocje.push(coordinate);
            
          
        }
      }
      
    }
    
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
    var popupText = opis + "<br/>" + ulica + "<br/>" + mesto;
    
      if (znacilnosti[i].properties.emergency == "yes") {
      var poligon = L.polygon(obmocje, { color: 'green', opacity: 1 }).bindPopup(popupText);
      poligoni.push(poligon);      
      poligon.addTo(mapa);
      } else if (znacilnosti[i].properties.emergency == "no") {
        var poligon = L.polygon(obmocje, { color: 'yellow', opacity: 1 }).bindPopup(popupText);      
      poligon.addTo(mapa);
      } else {
        var poligon = L.polygon(obmocje, { color: 'blue', opacity: 1 }).bindPopup(popupText);     
      poligon.addTo(mapa);
      }
  }
  catch(error){
    console.log(error);
  }
    }
    
  console.log(znacilnosti[i]);
}
}
function dodajMarker(lat, lng, opis, tip, ulica, mesto) {
  var ikona = new L.Icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/459/459225.svg',
    //iconUrl: 'knjiznice/css/2786240.svg',
    /*iconUrl: 'https://teaching.lavbic.net/cdn/OIS/DN1/' + 
      'marker-icon-2x-' + 
      'blue' + 
      '.png',*/
    shadowUrl: 'https://teaching.lavbic.net/cdn/OIS/DN1/' + 
      'marker-shadow.png',
    iconSize: [30, 30],
    iconAnchor: [0, 30],
    popupAnchor: [1, -34],
    shadowSize: [30, 30]
  });

  // Ustvarimo marker z vhodnima podatkoma koordinat 
  // in barvo ikone, glede na tip
  var marker = L.marker([lat, lng], {icon: ikona});
  
  // Izpišemo želeno sporočilo v oblaček
  var text = opis + "<br>" + ulica + "<br>" + mesto;
  marker.bindPopup(text).openPopup();

  // Dodamo točko na mapo in v seznam
  marker.addTo(mapa);
  markerji.push(marker);
}
function prikazPoti(latLng){
  for(var i = 0; i < poligoni.length; i++){
    var tocka = poligoni[i].getLatLngs();
    if (tocka[0][0] == undefined) {
      continue;
    }
    console.log(tocka[0][0]);
        console.log(tocka[0][1]);
    for(var j = 0; j < tocka[0].length; j++){
      if(distance(latLng.lat, latLng.lng, tocka[0][j].lat, tocka[0][j].lng, "M") <= 5){
         poligoni[i].setStyle({ color: 'green', fillColor: 'green' });
      }
      else{
        poligoni[i].setStyle({ color: 'blue', fillColor: 'blue' });
      }
    }
    
  }
  
}