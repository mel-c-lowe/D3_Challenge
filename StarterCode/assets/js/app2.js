console.log("app2.js loaded")

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 50, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// create svg element, respecting margins
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/data.csv").then(function(healthData) {
  console.log(healthData);

  // Select and format data for chart
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.age = +data.age;
  });

  // Find maxes for axis
  var ageMax = d3.max(healthData, d => d.age);
  var povertyMax = d3.max(healthData, d => d.poverty);
  console.log(ageMax, povertyMax)

  // Add X axis
  var x = d3.scaleLinear().domain([4, (povertyMax + 5)]).range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear().domain([20, (ageMax + 5)]).range([ height, 0]);
  svg
    .append("g")
    .call(d3.axisLeft(y));

  // Add X axis label:
  svg.append("text")
      .attr("x", (width / 2))
      .attr("y", height + margin.top + 20)
      .text("Poverty (%)");

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+20)
      .attr("x", -(height / 2))
      .text("Age")

  // Add dots
  var gdots = svg.append("g")
    .selectAll("dot")
    .data(healthData)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.age); } )
        .attr("r", 10)
        .style("fill", "green")
  
  gdots.append("text")
    .selectAll("dot")
    .text("A")
      


});


