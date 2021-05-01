// @TODO: YOUR CODE HERE!
console.log("app.js loaded")

// Set up chart area
var svgWidth = 460;
var svgheight = 400;

var margin = {
    top: 20,
    right: 20,
    bottom: 50,
    left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgheight - margin.top - margin.bottom;

// Create wrapper and append svg to index.html
var svg = d3.select("#scatter")
    .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgheight)
    .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from data.csv
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData)

    // Select and format data for chart
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Find maxes for axis
    var yMax = d3.max(healthData, d => d.healthcare);
    var xMax = d3.max(healthData, d => d.poverty);
    console.log(yMax, xMax)

    // Set scales for the data and append to graph
    var xScale = d3.scaleLinear()
        .domain([0, (xMax + 2)])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));
    
    var yScale = d3.scaleLinear()
        .domain([0, (yMax + 2)])
        .range([height, 0]);
    svg.append("g")
        .attr("tranform", "translate(" + width + ")")
        .call(d3.axisLeft(yScale));

    // Add x axis label    
    svg.append("text")
        .attr("x", (width/2))
        .attr("y", height + margin.top + 20)
        .text("In Poverty (%)");

    // Add y axis label
    svg.append("text")
        .attr("x", -(height/1.5))
        .attr("y", -margin.left+20)
        .attr("transform", "rotate(-90)")
        .text("Lacks Healthcare (%)")

    // Create variable to hold code for circles    
    var circleGroup = svg.selectAll("g circle")
                    .data(healthData)
                    .enter()
                    .append("g");

    // Describe the circles to plot and where
    var circleLoc = circleGroup.append("circle")
        .attr("cx", function (d) { return xScale(d.poverty); } )
        .attr("cy", function (d) { return yScale(d.healthcare); } )
        .attr("r", 10)
        .attr("opacity", .60)
        .style("fill", "green");   
    
    // Add text to circles
    var circleText = circleGroup.append("text")
        .text(d => d.abbr)
        .attr("dx", d => xScale(d.poverty))
        .attr("dy", d => yScale(d.healthcare))
        .classed("stateText", true)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("alignment-baseline", "central")


});