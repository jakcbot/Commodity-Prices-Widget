let commodities = [];

// (d) Fetch commodity data from the database
function fetchCommodityData() {
  fetch('data.php')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // Store the commodity data in an array
      commodities = data.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

// (e) Constructor function for Commodity widget
function CommodityWidget(commodity) {
  this.commodity = commodity;
  this.element = document.createElement('div');
  // Create page elements for the widget
  // ...
}

// (f) Asynchronous request to retrieve price data
function fetchPriceData(commodity, callback) {
	const API=AMTY8HMR5ESY4BH5;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${commodity.code}&apikey=${API}`;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      callback(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}

// (g) Methods to create graphs
function createGraph(canvas, data, label) {
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data),
      datasets: [
        {
          label: label,
          data: Object.values(data),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true
          }
        ],
        yAxes: [
          {
            display: true
          }
        ]
      }
    }
  });
}

function createCombinedGraph(canvas, data1, data2, label1, label2) {
  const ctx = canvas.getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Object.keys(data1),
      datasets: [
        {
          label: label1,
          data: Object.values(data1),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false
        },
        {
          label: label2,
          data: Object.values(data2),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [
          {
            display: true
          }
        ],
        yAxes: [
          {
            display: true
          }
        ]
      }
    }
  });
}
