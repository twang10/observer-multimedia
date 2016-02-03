$(document).ready(function(){
    drawGraphs();
});

function drawGraphs() {
    lifetimeGraph();
}

function lifetimeGraph() {
    var data = {
        labels: ["0", "", "", "", "", "5", "", "", "", "", "10",
                     "", "", "", "", "15", "", "", "", "", "20",
                     "", "", "", "", "25", "", "", "", "", "30",
                     "", "", "", "", "35", "", "", "", "", "40"],
        datasets: [
            {
                label: "LDR Lifetimes",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [18, 65, 59, 80, 81, 56, 55, 40, 22, 32, 62,
                           43, 23, 76, 43, 43, 55, 66, 67, 94, 43,
                           66, 43, 75, 44, 78, 55, 33, 64, 22, 62,
                           65, 66, 88, 42, 56, 44, 40, 66, 32, 62]
            }
        ]
    };

    var ctx = document.getElementById("lifetimeGraph").getContext("2d");
    var myBarChart = new Chart(ctx).Line(data, {
        scaleShowGridLines : false,
        pointDot : false,
        datasetStroke : false,
        showTooltips: false,
        responsive:true
    });

}
