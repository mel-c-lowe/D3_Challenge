// @TODO: YOUR CODE HERE!
console.log("app.js loaded")

// Set up chart area
var svgWidth = 960;
var svgheight = 500;

var margin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

var width = svgWidth - margin.left - margin.right;
var height = svgheight - margin.top - margin.bottom;

// Create wrapper and append svg to index.html
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgheight);

// Translate to center the chart when it will appear on the page
var chartGroup = svg.append("g")
    .attr("transfomr", `translate(${margin.left}, ${margin.top})`);

// Import data from data.csv
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData)

    // Select and format data to be used in chart
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
    });

    // Set scales for the data
    var xPoveryScale = d3.scaleLinear().range([0, width]);
    var yAgeScale = d3.scaleLinear().range([height, 0]);

    // // Find maxes for each axis
    // var ageMax = d3.max(healthData, d => d.age);
    // var povertyMax = d3.max(healthData, d => d.poverty);

    // Create axes and append to chartGroup
    var bottomAxis = d3.axisBottom(xPoveryScale);
    var leftAxis = d3.axisLeft(yAgeScale);

    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
    chartGroup.append("g")
        .call(leftAxis);

    // Testing the data in line chart format before scatterplot
    var line1 = d3.line()
        .x(d => xPoveryScale(d.poverty))
        .y(d => yAgeScale(d.age))

    // Append the path
    chartGroup.data([healthData]).append("path")
        .attr("d", line1)
        .classed("line green", true);


})