var ctx = document.getElementById("radarchart");
var options = {
    scale: {
        angleLines: {
            display: false
        },
        ticks: {
            suggestedMin: 50,
            suggestedMax: 100
        }
    }
};

var data = {
    labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
    datasets: [{
        data: [20, 10, 4, 2]
    }]
};
var myRadarChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options
});
