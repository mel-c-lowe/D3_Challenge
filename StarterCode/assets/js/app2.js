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
    data.healthcare = +data.healthcare;
  });

  // Find maxes for axis
  var yMax = d3.max(healthData, d => d.healthcare);
  var XMax = d3.max(healthData, d => d.poverty);
  console.log(yMax, XMax)

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, (XMax + 2)])
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, (yMax + 2)])
    .range([ height, 0]);
  svg
    .append("g")
    .attr("tranform", "translate(" + width + ")")
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
        .attr("cx", d => x(d["poverty"]))
        .attr("cy", d => y(d["healthcare"]))
        .attr("r", 10)
        .style("fill", "green")
        .style("opacity", .75)
    .classed("stateCircle", true)
  
  // Add abbreviations
  var dotText = gdots.append("text")
    .selectAll("dot")
    .text(d => d.abbr)
    .attr("dx", d => x(d["poverty"]))
    .attr("dy", d => y(d["healthcare"]))
    .classed("stateAbbr", true)
    // .style()
      


});


