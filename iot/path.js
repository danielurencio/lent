/////////////////////////////////////////////////
//var n = 40,				     /// Esto genera un conjunto de números aleatorios
//    random = d3.randomNormal(20, 2),       ///  con una media de 0 y una desviación de 0.2.
//    data = d3.range(n).map(random);        ///
/////////////////////////////////////////////
var valores = [0,3500]

//var svg = d3.select("svg").attr("width",window.innerWidth).attr("height",window.innerHeight),
    var margin = {top: 5, right: 5, bottom: 5, left: 5},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
	.attr("class","main");

var x = d3.scaleLinear()
    .domain([1, n - 2])  // <--- ¿Por qué 'n - 2'?
    .range([0, width]);

var y = d3.scaleLinear()
    .domain(valores)
    .range([height, 0]);

var line = d3.area()
    .curve(d3.curveBasis)
    .x(function(d, i) { return x(i); })
    .y0(height)
    .y1(function(d, i) { return y(d); });

g.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + y(0) + ")")
    .call(d3.axisTop(x).ticks(0));

g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisRight(y).ticks(20));

g.append("g")
    .attr("clip-path", "url(#clip)")
  .append("path")
    .datum(data)
    .attr("class", "line")
  .transition()
    .duration(500)
    .ease(d3.easeLinear)
    .on("start", tick);

var b = d3.select(".main").node().getBBox();
console.log(b);

function tick() {

  // Push a new data point onto the back.
  data.push(num);

  // Redraw the line.
  d3.select(this)
      .attr("d", line)
      .attr("transform", null);

  // Slide it to the left.
  d3.active(this)
      .attr("transform", "translate(" + x(0) + ",0)")
    .transition()
      .on("start", tick);

  // Pop the old data point off the front.
  data.shift();

}
