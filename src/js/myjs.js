const URL = "src/json/donne.json"
var eta = [];
var numNub = [];
var numVed = [];
var numCon = [];
$.getJSON(URL, function (data) {
    $.each(data.data, function (key, value) {
        eta.push(value["Classe di età"]);
        numNub.push(value.Nubili);
        numCon.push(value.Coniugate);
        numVed.push(value.Vedove);
    });
    console.log(numNub);
    var margin = {
            top: 40
            , right: 40
            , bottom: 40
            , left: 40
        }
        , width = 1000
        , height = 500;
    var x = d3.scaleBand().domain(eta).rangeRound([0, width - margin.left - margin.right]).paddingInner(0.05);
    var y = d3.scaleLinear().domain([0, 100]).range([height - margin.top - margin.bottom, 0]);
    var xAxis = d3.axisBottom(x).tickSize(6).tickPadding(8)
    var yAxis = d3.axisLeft(y).tickPadding(8);
    var svg = d3.select('#container').append('svg').attr('class', 'chart').attr('width', width).attr('height', height).append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
    var bars = svg.selectAll('.chart').data(data).enter().append('rect').attr('class', 'bar').attr('x', function (d, i) {
        return x(d.date);
    }).attr('y', function (d) {
        return height - margin.top - margin.bottom;
    }).attr('width', x).attr('height', function (d) {
        return 0;
    });
    svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')').call(xAxis);
    svg.append('g').attr('class', 'y axis').call(yAxis);
    bars.transition().duration(1000).delay(function (d, i) {
        return i * 750;
    }).attr('y', function (d) {
        return y(d.total);
    }).attr('height', function (d) {
        return height - margin.top - margin.bottom - y(d.total);
    });
});