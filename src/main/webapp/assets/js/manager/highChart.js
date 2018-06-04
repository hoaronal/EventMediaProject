$(function () {

	$('#container').highcharts({
			chart: {
				type: 'column'
			},

		title: {
			text: 'Statistical'
		},

		data: {
			csv: document.getElementById('csv').innerHTML
		},

		plotOptions: {
			series: {
				marker: {
					enabled: false
				}
			}
		},
		series:[]
	});
});