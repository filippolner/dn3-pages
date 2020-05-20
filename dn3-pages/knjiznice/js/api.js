//jshint esversion: 6
var d = new Date();
var dan = d.getDate() - 1;
var n = new Date();
var mesec = n.getMonth() + 1;
console.log(dan);
console.log(mesec);
$.ajax({
    url: 'https://api.sledilnik.org/api/stats',
        dataType: 'json',
        success: function(data) {
            var api = data;
            for (let i = 0; i <= data.length - 1; i++) {
                if (api[i].day == dan && api[i].month == mesec) {
                    let testi = api[i-1].positiveTests;
                    let ozdraveli = api[i-1].cases.recoveredToDate;
                    let okuzeni = api[i-1].positiveTestsToDate;
                    let umrli = api[i-1].statePerTreatment.deceasedToDate;
                    let umrlidanes = api[i-1].statePerTreatment.deceased;
                    let kriticni = api[i-1].statePerTreatment.critical;
                    console.log(testi);
                    document.getElementById("testi").innerHTML = testi;
                    document.getElementById("ozdraveli").innerHTML = ozdraveli;
                    document.getElementById("okuzenisk").innerHTML = okuzeni;
                    document.getElementById("umrli").innerHTML = umrli;
                    document.getElementById("umrlidanes").innerHTML = umrlidanes;
                    document.getElementById("kriticni").innerHTML = kriticni;
                    var datum = 'Podatki posodobljeni dne: ' + dan + '.' + mesec + '.2020';
                    console.log(datum);
                    document.getElementById("datum").innerHTML = datum;
                }
            }
            
        }
    });