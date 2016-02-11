$(document).ready(function(){
    //drawGraphs();
});

$('#hello').on('eventName', function(){
    drawGraphs();
});

function drawGraphs() {
    var data1 = {
      "Texting": 81.5,
      "IM Apps": 61.3,
      "Vid Chat": 75.1,
      "Phone Call": 66.7,
      "Snapchat": 62.6,
      "Instagram": 10.8,
      "Couple App": 8.1,
      "Letters": 1,
      "Email": 7.4
    };

    var data2 = {
      "Texting": 56.2,
      "IM Apps": 21.9,
      "Vid Chat": 9.4,
      "Phone Call": 8.4,
      "Snapchat": 2.4,
      "Instagram": 0.3,
      "Couple App": 1,
      "Letters": 0.3,
      "Email": 0
    };
    //techGraph("c", data1);
    //techGraph2("c", data1, data2);
    //lifetimeGraph();
    visitGraph();
}

function techGraph(loc, data) {
    var label = document.querySelector(".label");
    var c = document.getElementById(loc);
    var ctx = c.getContext("2d");
    var cw = c.width = 1000;
    var ch = c.height = 450;
    var cx = cw / 2,
        cy = ch / 2;
    var rad = Math.PI / 180;
    var frames = 0;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.font = "13px sans-serif";

    var grd = ctx.createLinearGradient(0, 0, 0, cy);
    //grd.addColorStop(0, "hsla(0, 100%, 71%, 1)");
    //grd.addColorStop(1, "hsla(0, 100%, 71%, 0)");

    var oData = data;

    var valuesRy = [];
    var propsRy = [];
    for (var prop in oData) {
      valuesRy.push(oData[prop]);
      propsRy.push(prop);
    }

    var vData = 3;
    var hData = valuesRy.length;
    var offset = 50.5; //offset chart axis
    var chartHeight = ch - 2 * offset;
    var chartWidth = cw - 2 * offset;
    var t = 1/7; // curvature : 0 = no curvature
    var speed = 2; // for the animation

    var A = {
      x: offset,
      y: offset
    }
    var B = {
      x: offset,
      y: offset + chartHeight
    }
    var C = {
      x: offset + chartWidth,
      y: offset + chartHeight
    }

/*
      A  ^
        |  |
        + 25
        |
        |
        |
        + 25
      |__|_________________________________  C
      B
*/

// CHART AXIS -------------------------
ctx.beginPath();
ctx.moveTo(A.x, A.y);
ctx.lineTo(B.x, B.y);
ctx.lineTo(C.x, C.y);
ctx.stroke();

// vertical ( A - B )
var aStep = (chartHeight - 50) / (vData);

var Max = Math.ceil(90 / 10) * 10;
var Min = Math.floor(arrayMin(valuesRy) / 10) * 10;
var aStepValue = (Max - Min) / (vData);
var verticalUnit = aStep / aStepValue;

var a = [];
ctx.textAlign = "right";
ctx.textBaseline = "middle";
for (var i = 0; i <= vData; i++) {

  if (i == 0) {
    a[i] = {
      x: A.x,
      y: A.y + 25,
      val: Max
    }
  } else {
    a[i] = {}
    a[i].x = a[i - 1].x;
    a[i].y = a[i - 1].y + aStep;
    a[i].val = a[i - 1].val - aStepValue;
  }
  drawCoords(a[i], 3, 0);
}

//horizontal ( B - C )
var b = [];
ctx.textAlign = "center";
ctx.textBaseline = "hanging";
var bStep = chartWidth / (hData + 1);

for (var i = 0; i < hData; i++) {
  if (i == 0) {
    b[i] = {
      x: B.x + bStep,
      y: B.y,
      val: propsRy[0]
    };
  } else {
    b[i] = {}
    b[i].x = b[i - 1].x + bStep;
    b[i].y = b[i - 1].y;
    b[i].val = propsRy[i]
  }
  drawCoords(b[i], 0, 3)
}

function drawCoords(o, offX, offY) {
  ctx.beginPath();
  ctx.moveTo(o.x - offX, o.y - offY);
  ctx.lineTo(o.x + offX, o.y + offY);
  ctx.stroke();

  ctx.fillText(o.val, o.x - 2 * offX, o.y + 2 * offY);
}
//----------------------------------------------------------

// DATA
var oDots = [];
var oFlat = [];
var i = 0;

for (var prop in oData) {
  oDots[i] = {}
  oFlat[i] = {}

  oDots[i].x = b[i].x;
  oFlat[i].x = b[i].x;

  oDots[i].y = b[i].y - oData[prop] * verticalUnit - 25;
  oFlat[i].y = b[i].y - 25;

  oDots[i].val = oData[b[i].val];

  i++
}



///// Animation Chart ///////////////////////////
//var speed = 3;
function animateChart() {
  requestId = window.requestAnimationFrame(animateChart);
  frames += speed; //console.log(frames)
  ctx.clearRect(60, 0, cw, ch - 60);

  for (var i = 0; i < oFlat.length; i++) {
    if (oFlat[i].y > oDots[i].y) {
      oFlat[i].y -= speed;
    }
  }
  drawCurve(oFlat);
  for (var i = 0; i < oFlat.length; i++) {
      ctx.fillText(oDots[i].val + "%", oFlat[i].x, oFlat[i].y - 25);
      ctx.beginPath();
      ctx.arc(oFlat[i].x, oFlat[i].y, 3, 0, 2 * Math.PI);
      ctx.fill();
    }

  if (frames >= Max * verticalUnit) {
    window.cancelAnimationFrame(requestId);

  }
}
requestId = window.requestAnimationFrame(animateChart);

/////// EVENTS //////////////////////
c.addEventListener("mousemove", function(e) {
  label.innerHTML = "";
  label.style.display = "none";
  this.style.cursor = "default";

  var m = oMousePos(this, e);
  for (var i = 0; i < oDots.length; i++) {

    output(m, i);
  }

}, false);

function output(m, i) {
  ctx.beginPath();
  ctx.arc(oDots[i].x, oDots[i].y, 20, 0, 2 * Math.PI);
  if (ctx.isPointInPath(m.x, m.y)) {
    //console.log(i);
    label.style.display = "block";
    label.style.top = (m.y + 10) + "px";
    label.style.left = (m.x + 10) + "px";
    label.innerHTML = "<strong>" + propsRy[i] + "</strong>: " + valuesRy[i] + "%";
    c.style.cursor = "pointer";
  }
}

// CURVATURE
function controlPoints(p) {
  // given the points array p calculate the control points
  var pc = [];
  for (var i = 1; i < p.length - 1; i++) {
    var dx = p[i - 1].x - p[i + 1].x; // difference x
    var dy = p[i - 1].y - p[i + 1].y; // difference y
    // the first control point
    var x1 = p[i].x - dx * t;
    var y1 = p[i].y - dy * t;
    var o1 = {
      x: x1,
      y: y1
    };

    // the second control point
    var x2 = p[i].x + dx * t;
    var y2 = p[i].y + dy * t;
    var o2 = {
      x: x2,
      y: y2
    };

    // building the control points array
    pc[i] = [];
    pc[i].push(o1);
    pc[i].push(o2);
  }
  return pc;
}

function drawCurve(p) {

  var pc = controlPoints(p); // the control points array

  ctx.beginPath();
  //ctx.moveTo(p[0].x, B.y- 25);
  ctx.lineTo(p[0].x, p[0].y);
  // the first & the last curve are quadratic Bezier
  // because I'm using push(), pc[i][1] comes before pc[i][0]
  ctx.quadraticCurveTo(pc[1][1].x, pc[1][1].y, p[1].x, p[1].y);

  if (p.length > 2) {
    // central curves are cubic Bezier
    for (var i = 1; i < p.length - 2; i++) {
      ctx.bezierCurveTo(pc[i][0].x, pc[i][0].y, pc[i + 1][1].x, pc[i + 1][1].y, p[i + 1].x, p[i + 1].y);
    }
    // the first & the last curve are quadratic Bezier
    var n = p.length - 1;
    ctx.quadraticCurveTo(pc[n - 1][0].x, pc[n - 1][0].y, p[n].x, p[n].y);
  }

  //ctx.lineTo(p[p.length-1].x, B.y- 25);
  ctx.stroke();
  ctx.save();
  ctx.fillStyle = grd;
  ctx.fill();
  ctx.restore();
}

function arrayMax(array) {
  return Math.max.apply(Math, array);
};

function arrayMin(array) {
  return Math.min.apply(Math, array);
};

function oMousePos(canvas, evt) {
  var ClientRect = canvas.getBoundingClientRect();
  return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
  }
}
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

    var ctx = document.getElementById("c").getContext("2d");
    var myBarChart = new Chart(ctx).Line(data, {
        scaleShowGridLines : false,
        pointDot : true,
        datasetStroke : true,
        showTooltips: true,
        responsive:true
    });
}


function visitGraph() {
    var chartData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };


        var ctx = document.getElementById("c").getContext("2d");
        window.myNewChart = new Chart(ctx).Line(chartData, {
            showTooltip: true,
            responsive:false,
            tooltipTemplate: "<%= value %>"
        });
}
/*

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
        responsive:false,
    });
}

function techGraph() {
    var data = {
        labels: ["Phone Calls", "Texting/iMessage", "Facebook Message",
                 "Video Chatting", "Snapchat", "Instagram", "Whatsapp/Kik/Line/Kakao Talk",
                 "Tinder/Grindr/OkCupid Message", "Email", "Couple (app)",
                 "Words with Fiends", "Other"],
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
        responsive:false
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
        responsive:false
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
        responsive:false,
    });
}

function jealousGraph() {
    var data = [
        {
            label: "Random Hookups",
            value: 41,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(212, 62, 62, 1)"
        },
        {
            label: "Close Friends",
            value: 68,
            color:"rgba(220,220,220,0.6)",
            highlight: "rgba(219, 44, 44, 1)"
        },
        {
            label: "TAs",
            value: 66,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(230, 76, 76, 1)",
        },
        {
            label: "Other",
            value: 66,
            color: "rgba(220,220,220,0.6)",
            highlight: "rgba(235, 83, 83, 1)",
        }
    ];

    var ctx = document.getElementById("jealousGraph").getContext("2d");
    new Chart(ctx).Doughnut(data, {
        segmentStrokeColor : "#fff", // can change to be bg color later
        animateRotate : false,
        responsive:false
    });
}
 */
