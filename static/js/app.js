Highcharts.getJSON(
	'/data',
	function (data) {
		var sensorData = data.sensor_data;
		var $chart = $("#chart");

		var arrData = {};

		const sensorElement = {};

		for (var prop in sensorData) {
			if (prop !== "class_label" && prop !== "sample index") {
				$chart.append("<div id=\"" + prop + "\"></div>")
				arrData[prop] = sensorData[prop];
				sensorElement[prop] = 1
			}
		}


		var ctr = 0;
		for (var prop in sensorElement) {
			ctr++;
			generateChart($chart.find("#" + prop)[0], arrData[prop], sensorData["sample index"], sensorData["class_label"], prop, prop, "class_label")
			
		}

	}
);


var generateChart = function ($chart, data, xAxisCategories, yAxisCategories, seriesName, xAxisLabel, yAxisLabel) {
	window.chart = new Highcharts.Chart({
		chart: {
			renderTo: $chart,
			zoomType: 'x'
		},
		title: {
			text: 'Sensor chart'
		},
		subtitle: {
			text: document.ontouchstart === undefined ?
				'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
		},
		xAxis: {
			categories: xAxisCategories,
		},
		yAxis: {
			categories: _.uniq(yAxisCategories).sort(),
			title: {
				text: yAxisLabel
			}
		},
		plotOptions: {
			area: {
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				},
				marker: {
					radius: 3
				},
				lineWidth: 1,
				states: {
					hover: {
						lineWidth: 1
					}
				},
				threshold: null
			}
		},

		series: [{
			type: 'area',
			name: xAxisLabel,
			// data: _.chain(arrData).flatten().value()
			data
		}]
	});
}