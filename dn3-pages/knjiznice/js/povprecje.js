function risi2(a, b, c, d, e) {
var ctx = document.getElementById('povprecje').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'radar',

        // The data for our dataset
        data: {
            labels: ["Višina", "Teža", "Temperatura", "Sistolični tlak", "Diastolični tlak"],
            datasets: [{
                label: "Pacient",
                backgroundColor: 'rgb(148, 4, 4, 0.2)',
                borderColor: 'rgb(148, 4, 4)',
                data: [a, b, c, d, e],
            },
            {
                label: "Povprečje",
                backgroundColor: 'rgb(4, 4, 4, 0.4)',
                data: [176, 88, 36.5, 105, 70],
            }
        ]
        }, 
        options: {
            legend: {
                position: 'bottom',
            }
        }
    });
}