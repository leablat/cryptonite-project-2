var reportData = [];

function liveReportsScreen() {
  removeCoins();
  reportData = []
  drowLiveReports();
}

setInterval(async () => {
  const coinData = await getData();
  updateReportData(coinData);

  if ($("#ReportContainer")[0]) drowLiveReports();
}, 2000);
function drowLiveReports() {
  if (!reportData) return;

  addReport();

  var options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Sale vs profit",
    },
    subtitles: [
      {
        text: "Click Legend to Hide or Unhide Data Series",
      },
    ],
    axisX: {
      title: "States",
    },
    axisY: {
      title: "Units Sold",
      titleFontColor: "#4F81BC",
      lineColor: "#4F81BC",
      labelFontColor: "#4F81BC",
      tickColor: "#4F81BC",
    },
    axisY2: {
      title: "Profit in USD",
      titleFontColor: "#C0504E",
      lineColor: "#C0504E",
      labelFontColor: "#C0504E",
      tickColor: "#C0504E",
    },
    toolTip: {
      shared: true,
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },
    data: reportData,
  };

  $("#ReportContainer").CanvasJSChart(options);

  function toggleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.report.render();
  }
}

function addReport() {
  const div = document.createElement("div");
  div.style = "height: 300px; width: 90%;";
  div.id = "ReportContainer";

  DOM.information.innerHTML = "";
  DOM.information.appendChild(div);
}
async function getData() {
  const coins = coinToRrport
    .map((x) => x.coin.symbol.toUpperCase())
    .join(",")
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins}&tsyms=USD`
  );
  const data = await response.text();

  return JSON.parse(data);
}
function updateReportData(data) {
  const coinsNames = Object.keys(data);
  reportData = reportData.filter((x) => coinsNames.includes(x.name));

  Object.keys(data).forEach((key) => {
    let report = reportData.find((x) => key === x.name);
    const newPoint = { x: new Date(), y: data[key].USD };

    if (report) {
      report.dataPoints.push(newPoint);
    } else {
      reportData.push({
        type: "spline",
        name: key,
        showInLegend: true,
        xValueFormatString: "mm:ss",
        yValueFormatString: "$#,##0.#",
        dataPoints: [
          newPoint,
        ],
      });
    }
  });
}
