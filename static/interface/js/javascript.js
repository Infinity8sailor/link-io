//var endpoint = '/api'; 
var data= {"labels" : [ 
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
],
"chartLabel" : "my data",
"chartdata" : [10,30,20,10,10,60,40,20,30,100,20,70,10,10,10,20,30,0,], 
"chartdata1": [100,30,80,40,80,40,40,30,10,20,60,50,50,0,70,40,80,50,],
 };
		
$.ajax({ 
  //method: "GET", 
  //url: endpoint,
  //var data = data ; 
  success: function() { 
    drawLineGraph( 'myChartline'); 
    myDoughnut( 'myChartDoughnut');
    console.log("drawing"); 
  }, 
  error: function(error_data) { 
    console.log(error_data); 
  } 
}) 


function drawLineGraph( id) { 
  var labels =  [ 
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
]; 
  var chartLabel = "my data"; 
  var chartdata = [10,30,20,10,10,60,40,20,30,100,20,70,10,10,10,20,30,0,]; 
  var chartdata1 = [100,30,80,40,80,40,40,30,10,20,60,50,50,0,70,40,80,50,];
  var ctx = document.getElementById(id).getContext('2d'); 
  var chart = new Chart(ctx, { 
    // The type of chart we want to create 
    type: 'line', 

    // The data for our dataset 
    data: { 
      labels: labels, 
      datasets: [
      { 
        label: chartLabel, 
        backgroundColor: '#39B580', 
        borderColor: 'rgb(0, 150, 0)', 
        borderDash: [5],
        data: chartdata, 
      },
      { 
        label: chartLabel, 
        backgroundColor: '#97C69D', 
        borderColor: 'rgb(255, 0, 0)', 
        borderDash: [6],
        data: chartdata1,
      } 
    ] 
    }, 

    // Configuration options go here 
    options: { 
      scales: { 
        xAxes: [{ 
          display: true 
        }], 
        yAxes: [{ 
          ticks: { 
            beginAtZero: true 
          } 
        }] 
      }, 
      responsive : true,
      maintainAspectRatio: true
    },


  }); 
} 

function myDoughnut ( id){
  // And for a doughnut chart
  var ctx = document.getElementById(id).getContext('2d'); 
  var myDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data : {
      datasets: [
        {
        data: [10, 20, 30, 50,45,55],
        backgroundColor: [
        '#0BA462',
        '#39B580',
        '#67C69D',
        '#95D7BB',
        '#06D8CC',
        '#5F8F55'
      ]
      }],
      
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}



///////////for searching on web

function searchWeb(){
  var link = document.getElementById( "search_web").value;
  console.log(link);
  document.getElementById("search_view_a").src = link ;
}

///////////////////////////////ading select option in post
$var = $_POST['project_name'];
$var1 = $_POST['topic_name'];



////////////////////////////for dragable div elements
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


/////////////////Carret listing file system......

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++) {
  toggler[i].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}