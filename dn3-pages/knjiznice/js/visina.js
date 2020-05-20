window.onload = function () {
	
    var chart = new CanvasJS.Chart("visina", {
        backgroundColor: null,
        animationEnabled: true,
        axisX:{
            interval: 0,
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,
        },
        axisY:{
            gridThickness: 0,
            tickLength: 0,
            lineThickness: 0,

        },
        dataPointWidth: 30,
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: 70, fontFamily: "tahoma",}
            ]
        }]
    });
    chart.render();

    }