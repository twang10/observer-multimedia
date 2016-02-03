$(document).ready(function(){
    drawGraphs();
});

function drawGraphs() {
    lifetimeGraph();
    visitGraph();
    factorsGraph();
    techGraph();
    sexGraph();
    fightGraph();
    jealousGraph();
    futureGraph();
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

function visitGraph() {
    var data = [
        {
            label: "0 - 1 Months",
            value: 50,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "2 - 3 Months",
            value: 42,
            color:"rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "4 - 5 Months",
            value: 7,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)",
        },
        {
            label: "6 - 11 Months",
            value: 4,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "12+ Months",
            value: 4,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        }
    ];

    var ctx = document.getElementById("visitGraph").getContext("2d");
    new Chart(ctx).Doughnut(data, {
        segmentStrokeColor : "#fff", // can change to be bg color later
        animateRotate : false,
        responsive:true
    });
}

function factorsGraph() {
    var data = [
        {
            value: 91,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Travel Time"
        },
        {
            value: 84,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Activities/Job"
        },
        {
            value: 124,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Schoolwork"
        },
        {
            value: 139,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Cost of Travel"
        },
        {
            value: 82,
            color: "#4D5360",
            highlight: "#616774",
            label: "Incompatible Schedules"
        },
        {
            value: 11,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Other"
        }
    ];
    var ctx = document.getElementById("factorsGraph").getContext("2d");
    new Chart(ctx).PolarArea(data, {
        animateRotate : false,
        responsive:true,
    });
}

function techGraph() {
    var data = {
        labels: ["Phone Calls", "Texting/iMessage", "Facebook Message", "Video Chatting", "Snapchat", "Instagram", "Whatsapp/Kik/Line/Kakao Talk", "Tinder/Grindr/OkCupid Message", "Email", "Couple (app)", "Words with Fiends", "Other"],
        datasets: [
            {
                label: "Day-To-Day",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [145, 176, 101, 164, 136, 26, 24, 5, 15, 17, 9, 7]
            },
            {
                label: "Primary",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [18, 120, 25, 23, 6, 1, 15, 1, 3, 0, 2]
            }
        ]
    };

    var ctx = document.getElementById("techGraph").getContext("2d");
    var myBarChart = new Chart(ctx).Bar(data, {
        responsive:true
    });
}

function sexGraph() {
    var data = [
        {
            label: "Never",
            value: 41,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "Rarely",
            value: 68,
            color:"rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "Sometimes",
            value: 66,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)",
        },
        {
            label: "Semi-Frequently",
            value: 22,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "Frequently",
            value: 12,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        }
    ];

    var ctx = document.getElementById("sexGraph").getContext("2d");
    new Chart(ctx).Doughnut(data, {
        segmentStrokeColor : "#fff", // can change to be bg color later
        animateRotate : false,
        responsive:true
    });
}

function fightGraph() {
    var data = [
        {
            value: 91,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Frequency of Communication"
        },
        {
            value: 84,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Quality of Communication"
        },
        {
            value: 124,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Frequency and Logistics of Visits"
        },
        {
            value: 139,
            color: "#949FB1",
            highlight: "#A8B3C5",
            label: "Jealosy (i.e. fear of infidelity)"
        },
        {
            value: 82,
            color: "#4D5360",
            highlight: "#616774",
            label: "Jealousy (i.e. fear of SO forming other close relationships)"
        },
        {
            value: 11,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Other"
        }
    ];
    var ctx = document.getElementById("fightGraph").getContext("2d");
    new Chart(ctx).PolarArea(data, {
        animateRotate : false,
        responsive:true,
    });
}

function jealousGraph() {
    var data = [
        {
            label: "Random Hookups",
            value: 41,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "Close Friends",
            value: 68,
            color:"rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)"
        },
        {
            label: "TAs",
            value: 66,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)",
        },
        {
            label: "Other",
            value: 66,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(220,220,220,1)",
        }
    ];

    var ctx = document.getElementById("jealousGraph").getContext("2d");
    new Chart(ctx).Doughnut(data, {
        segmentStrokeColor : "#fff", // can change to be bg color later
        animateRotate : false,
        responsive:true
    });
}

function futureGraph() {

}
