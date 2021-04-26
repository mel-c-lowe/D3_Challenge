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
})