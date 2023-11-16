 main();
// Define global variables
//Variables used to manage locally stored data
var commodities = [];
var code;
var cname;
const widgets=[];
var chart;
//constructor function for commodity object
function Com(id, name, information, code){
  this.id = id;
  this.name = name;
  this.information = information;
  this.code = code;
}

// Define main function
function main() {
  fetch("data.php")
  .then(response => response.json())
  .then (buildSelect)
}

//sort the array of object literals
function cSort(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();
  if (nameA < nameB) {
      return -1;
  }
  if (nameA > nameB) {
      return 1;
  }
  return 0;
}

function buildSelect(options){
  const optionsSelect = document.getElementById("commodity-select");
  
  //create an object for each retrieved commodity and store in array
  //also create a select option for each commodity
  for (let i = 0; i < options.length; i++) {
      let c = new Com(options[i].id, options[i].name, options[i].information, options[i].code);
      commodities.push(c);
  }
  commodities.sort(cSort);
  //add the options to the select item    
  for(let j= 0; j < commodities.length; j++) {
      const option = document.createElement("option");
      option.setAttribute("id", commodities[j].name);
      option.id = commodities[j].id;
      option.text = commodities[j].name;
      option.value = commodities[j].code;
      optionsSelect.appendChild(option);
  }
  
  //add an onchange listener to the select item
  optionsSelect.addEventListener("change", function(){
  //each time an item is selected, do the following
  const selectedOption = optionsSelect.selectedOptions[0];
  //get the commodity name
  const selectedOptionName = selectedOption.text;
  // check if a widget for this commodity is already displayed
      if (widgets.includes(selectedOptionName)) {
          return; 
      }
      widgets.push(selectedOptionName);
      let c=commodities.find(c => c.name === selectedOptionName);
      cname =selectedOption.value;
      
      getdata(c.id);
});
}

//get the data for the commodity and .then(makeWidget)
 getdata=(id)=> {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'getdata.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    console.log(xhr.responseText); 
    let data = JSON.parse(xhr.responseText);
    makeWidget(data);
  };
  xhr.send('id='+id);
}

//this is the function that calls the constructor for the CommodityWidget
makeWidget = response => {
  let id = response[0].id;
  let cname = response[0].name;
  let information = response[0].information;
  let code = response[0].code;
  
  container = document.createElement("div");
  pagediv = document.getElementById("widget-container");    
  pagediv.appendChild(container);
  ww = new CommodityWidget(id, cname, information, code, container);

  console.log(response);
}

//constructor function for widget, has data for Commodity  information
function CommodityWidget(id, name, information, code,container) {
  this.id = id;
  this.name = name;
  this.information = information;
  this.code = code;
//has UI elements which are created here and appended to the container
var widgetContainer = container;;
widgetContainer.classList.add("widget-container2");

var widgetTitle = document.createElement("h2");
widgetTitle.textContent = name;
widgetContainer.appendChild(widgetTitle);

var widgetInformation = document.createElement("p");
widgetInformation.textContent=information;
widgetContainer.appendChild(widgetInformation);

this.graphButton = document.createElement("button");
this.graphButton.innerText = "Display Graph";
this.graphButton.addEventListener("click", () => {
  cname=name;
  code=code;
  if(chart){ chart.destroy();}
  displayGraph();
});
widgetContainer.appendChild(this.graphButton);

this.addgraphButton = document.createElement("button");
this.addgraphButton.innerText = "Add Graph";
// this.graphButton.addEventListener("click", () => {
// this.displayGraph();
// });
widgetContainer.appendChild(this.addgraphButton);

var _removebutton = document.createElement("button");
    _removebutton.textContent = "Remove widget";    
 //add an onclick listener to the remove button
 _removebutton.onclick = () => {
    dashboard=document.getElementById("widget-container");
    dashboard.removeChild(widgetContainer);
    widgets.splice(widgets.indexOf(this.code), 1);
};
widgetContainer.appendChild(_removebutton);

var button = document.getElementById("clearbtn");
button.addEventListener("click", function() {
  if(chart){chart.destroy();}});
  
};

//function to display the chart graph
let displayGraph =  function() {
  console.log(cname);
  const API_KEY = "AMTY8HMR5ESY4BH5";
  const apiUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=";

  const url = `${apiUrl}${cname}&apikey=${API_KEY}`;
  
  fetch(url)
 .then(response => {
    console.log(response); // log the response object
    return response.json(); // parse the response data as JSON
  })
  .then(data => {
    const days = [];
    const prices = [];
    for (const key in data["Monthly Time Series"]) {
      prices.push(parseFloat(data["Monthly Time Series"][key]["4. close"]));
      days.push(key);
    }
    console.log(data["Monthly Time Series"]);
    const chartData = {
      labels: days,
      datasets: [
        {
          label: cname,
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
          data: prices
        }
      ]
    };

    chart = new Chart(document.getElementById('graph-canvas'),
      {
        type: "line",
        data: chartData,
      }
    );
      console.log(data);
  });
}

