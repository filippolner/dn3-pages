function risi(vi, te, tem, si, di) {
    var chart1 = new CanvasJS.Chart("chartContainer1", {
        backgroundColor: null,
        animationEnabled: true,
        toolTip:{   
            content: "{name} : {y}" 
        },
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
            indexLabel: "{y}",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            indexLabelFontSize: 25,
            indexLabelBackgroundColor: "#940404",
            indexLabelFontColor: "white",

            name: "Višina",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: vi, fontFamily: "tahoma",}
            ]
        }]
    });
    
    var chart2 = new CanvasJS.Chart("chartContainer2", {
        backgroundColor: null,
        animationEnabled: true,
        toolTip:{   
            content: "{name} : {y}" 
        },
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
            indexLabel: "{y}",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            indexLabelFontSize: 25,
            indexLabelBackgroundColor: "#940404",
            indexLabelFontColor: "white",
            name: "Teža",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: te, fontFamily: "tahoma",}
            ]
        }]
    });

    var chart3 = new CanvasJS.Chart("chartContainer3", {
        backgroundColor: null,
        animationEnabled: true,
        toolTip:{   
            content: "{name} : {y}" 
        },
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
            indexLabel: "{y}",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            indexLabelFontSize: 25,
            indexLabelBackgroundColor: "#940404",
            indexLabelFontColor: "white",
            name: "Temperatura",
            valueFormatString: "##,#",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: tem, fontFamily: "tahoma",}
            ]
        }]
    });

    var chart4 = new CanvasJS.Chart("chartContainer4", {
        backgroundColor: null,
        animationEnabled: true,
        toolTip:{   
            content: "{name} : {y}" 
        },
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
            indexLabel: "{y}",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            indexLabelFontSize: 25,
            indexLabelBackgroundColor: "#940404",
            indexLabelFontColor: "white",
            name: "Sistolični tlak",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: si, fontFamily: "tahoma",}
            ]
        }]
    });

    var chart5 = new CanvasJS.Chart("chartContainer5", {
        backgroundColor: null,
        animationEnabled: true,
        toolTip:{   
            content: "{name} : {y}" 
        },
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
            indexLabel: "{y}",
            indexLabelPlacement: "outside",
            indexLabelOrientation: "horizontal",
            indexLabelFontSize: 25,
            indexLabelBackgroundColor: "#940404",
            indexLabelFontColor: "white",
            name: "Diastolični tlak",
            axisYType: "primary",
            color: "#940404",
            dataPoints: [
                { y: di, fontFamily: "tahoma",}
            ]
        }]
    });

    
 
chart1.render();
chart2.render();
chart3.render();
chart4.render();
chart5.render();
}