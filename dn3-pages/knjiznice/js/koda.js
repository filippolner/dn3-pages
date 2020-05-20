var baza = 'filippolner';
var baseUrl = 'https://teaching.lavbic.net/api/OIS/baza/' + baza + '/podatki/';
var izpis;


/*var ime;
var prezime;
var datum;
var vis;
var tez;
var temp;
var sis;
var dis;
*/


/*EHRID1 = generirajID();
EHRID2 = generirajID();
EHRID3 = generirajID();*/

/*
function dodajPodatke(ehrId, )

*/

/**
 * Generator podatkov za novega pacienta, ki bo uporabljal aplikacijo. Pri
 * generiranju podatkov je potrebno najprej kreirati novega pacienta z
 * določenimi osebnimi podatki (ime, priimek in datum rojstva) ter za njega
 * shraniti nekaj podatkov o vitalnih znakih.
 * @param stPacienta zaporedna številka pacienta (1, 2 ali 3)
 * @return ehrId generiranega pacienta
 */
function generirajPodatke(stPacienta) {
  ehrID = "";
  EHRID1 = '1499f135-85c0de01-4261-a3c2-2dabd1c1';
  EHRID2 = '00d36897-aed65b08-4398-9738-50a9e155';
  EHRID3 = 'e3d7c75b-17ed67c6-44f5-9c52-6e1298da';
  /*function generirajID() {
    return 'xxxxxxxx-xxxxxxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }*/
  //var a = generirajID();
  //console.log(a);
  if (stPacienta == 1) {
  anej = [
    {
      "ime": "Anej",
      "priimek": "Senekovič",
      "datumRojstva": "23-04-1995",
      "visina": "189",
      "teza": "78",
      "temperatura": "36.6",
      "sistolicniTlak": "120",
      "diastolicniTlak": "80",
    }];
  } else if (stPacienta == 2) {
  miro = [
    {
      "ime": "Mirko",
      "priimek": "Mirnik",
      "datumRojstva": "11-10-1949",
      "visina": "172",
      "teza": "102",
      "temperatura": "38.1",
      "sistolicniTlak": "90",
      "diastolicniTlak": "60",
    }];
  } else if (stPacienta == 3) {
    mare = [
    {
      "ime": "Marko",
      "priimek": "Lešnik",
      "datumRojstva": "22-05-2007",
      "visina": "134",
      "teza": "27",
      "temperatura": "37.6",
      "sistolicniTlak": "140",
      "diastolicniTlak": "90",
    }];
  }
  m = 0;
function poslji(key, data) {
  $.ajax({
    crossDomain: true,
    type: 'PUT',
    url: baseUrl + "azuriraj?kljuc=" + key,
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      //alert(JSON.stringify(data)); 
      var a = data;
      console.log("generiral: " + key);
      m++;
      console.log(m);
    },
    failure: function(errMsg) {
      alert(errMsg);
    }
  });
  }
  if (stPacienta == 1) {
  poslji(EHRID1, anej);
  } else if (stPacienta == 2) {
  poslji(EHRID2, miro);
  } else if (stPacienta == 3) {
  poslji(EHRID3, mare);
  }

  /*
  console.log(JSON.stringify(pacienti));
  var ime = "";
  var priimek = "";
  var datumRojstva = "";

  if (stPacienta == 1) {
    ime = "Anej";
    priimek = "Senekovič (športnik)";
    datumRojstva = "1995-04-23T00:00:00:000Z";
    ehrID = "";
    console.log(ime);
  } else if (stPacienta == 2) {
    ime = "Mirko";
    priimek = "Mirnik (obolel s pljučnico";
    datumRojstva = "1949-10-11T01:01:01:001Z";
  } else if (stPacienta == 3) {
    ime = "Marko";
    priimek = "Lešnik (mlad, poškodovan";
    datumRojstva = "2007-05-22T02:02:02:002Z";
  }


  // TODO: Potrebno implementirati

  return ehrID;
}
generirajPodatke(1);


// TODO: Tukaj implementirate funkcionalnost, ki jo podpira vaša aplikacija
*/
}
generirajPodatke(1);
generirajPodatke(2);
generirajPodatke(3);

$.ajax({
  url: baseUrl + "/vrni/vsi",
  dataType: 'json',
  type: 'GET',
  success: function(data) {
    //console.log(JSON.stringify(data));
    //alert(JSON.stringify(data));
  }
});

var a = $("dropdown :selected").val();

//function test() {
//  console.log("seos seos seos picke");
//}

function ajmo() {
  var e = document.getElementById("dropdown");
  var value = e.options[e.selectedIndex].value;
  console.log(value);
  if (value == '1') {
    $.ajax({
      url: baseUrl + "/vrni/" + EHRID1,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        var a = data;
        console.log(EHRID1);
        console.log(a[0].ime);
        var vis = parseInt(a[0].visina);
        var tez = parseInt(a[0].teza);
        var temp = parseFloat(a[0].temperatura);
        var sis = parseInt(a[0].sistolicniTlak);
        var dis = parseInt(a[0].diastolicniTlak);
        document.getElementById("ime").innerHTML = a[0].ime;
        document.getElementById("priimek").innerHTML = a[0].priimek;
        document.getElementById("datumrojstva").innerHTML = a[0].datumRojstva;
        document.getElementById("ajsajd").innerHTML = EHRID1;
        console.log(vis, tez, sis, dis, temp);
        risi(vis, tez, temp, sis, dis);
        risi2(vis, tez, temp,sis, dis);
        //risi(a[0].visina, a[0].teza, a[0].temperatura, a[0].sistolicniTlak, a[0].diastolicniTlak);
        //alert(JSON.stringify(data));
      }
    });
    
  } else if (value == '2') {
    $.ajax({
      url: baseUrl + "/vrni/" + EHRID2,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        var a = data;
        console.log(a[0].ime);
        var vis = parseInt(a[0].visina);
        var tez = parseInt(a[0].teza);
        var temp = parseFloat(a[0].temperatura);
        var sis = parseInt(a[0].sistolicniTlak);
        var dis = parseInt(a[0].diastolicniTlak);
        document.getElementById("ime").innerHTML = a[0].ime;
        document.getElementById("priimek").innerHTML = a[0].priimek;
        document.getElementById("datumrojstva").innerHTML = a[0].datumRojstva;
        document.getElementById("ajsajd").innerHTML = EHRID2;
        console.log(vis, tez, sis, dis, temp);
        risi(vis, tez, temp, sis, dis);
        risi2(vis, tez, temp,sis, dis);
        //risi(a[0].visina, a[0].teza, a[0].temperatura, a[0].sistolicniTlak, a[0].diastolicniTlak);
        //alert(JSON.stringify(data));
      }
    });
  } else if (value == '3') {
    $.ajax({
      url: baseUrl + "/vrni/" + EHRID3,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        var a = data;
        console.log(a[0].ime);
        var vis = parseInt(a[0].visina);
        var tez = parseInt(a[0].teza);
        var temp = parseFloat(a[0].temperatura);
        var sis = parseInt(a[0].sistolicniTlak);
        var dis = parseInt(a[0].diastolicniTlak);
        document.getElementById("ime").innerHTML = a[0].ime;
        document.getElementById("priimek").innerHTML = a[0].priimek;
        document.getElementById("datumrojstva").innerHTML = a[0].datumRojstva;
        document.getElementById("ajsajd").innerHTML = EHRID3;
        console.log(vis, tez, sis, dis, temp);
        risi(vis, tez, temp, sis, dis);
        risi2(vis, tez, temp,sis, dis);
        //risi(a[0].visina, a[0].teza, a[0].temperatura, a[0].sistolicniTlak, a[0].diastolicniTlak);
        //alert(JSON.stringify(data));
      }
    });
  }
  
}

function preisciBazo() {
  var num = document.getElementById("in").value;
  var iskalnik = num.toString();
  console.log(iskalnik);
  $.ajax({
    url: baseUrl + "/vrni/" + iskalnik,
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      var a = data;
      console.log(a[0].ime);
      var vis = parseInt(a[0].visina);
        var tez = parseInt(a[0].teza);
        var temp = parseFloat(a[0].temperatura);
        var sis = parseInt(a[0].sistolicniTlak);
        var dis = parseInt(a[0].diastolicniTlak);
        document.getElementById("ime").innerHTML = a[0].ime;
        document.getElementById("priimek").innerHTML = a[0].priimek;
        document.getElementById("datumrojstva").innerHTML = a[0].datumRojstva;
        document.getElementById("ajsajd").innerHTML = iskalnik;
        console.log(vis, tez, sis, dis, temp);
        risi(vis, tez, temp, sis, dis);
        risi2(vis, tez, temp,sis, dis);
    }
  });
}
function posodobljeno() {
  alert("Podatki posodobljeni.");
}