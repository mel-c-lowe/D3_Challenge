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

    // Select and format data to be used in chart
    healthData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.age = +data.age;
    });

    // Find maxes for each axis
    var ageMax = d3.max(healthData, d => d.age);
    var povertyMax = d3.max(healthData, d => d.poverty);
    console.log(ageMax, povertyMax);

    // Set scales for the data and append to graph
    var xPoveryScale = d3.scaleLinear()
        .domain([8, povertyMax])
        .range([8, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xPoveryScale));
    
    var yAgeScale = d3.scaleLinear()
        .domain([20, (ageMax + 5)])
        .range([height, 0]);
    svg.append("g")
        .attr("tranform", "translate(" + width + ")")
        .call(d3.axisLeft(yAgeScale));

    // Add x axis label    
    svg.append("text")
        .attr("x", (width/2))
        .attr("y", height + margin.top + 20)
        .text("Poverty (%)");

    // Add y axis label
    svg.append("text")
        .attr("x", -(height/2))
        .attr("y", -margin.left+20)
        .attr("transform", "rotate(-90)")
        .text("Age")

    // Create variable to hold code for circles    
    var gdots = svg.selectAll("g.dot")
                    .data(healthData)
                    .enter()
                    .append("g");

    // Add circles to gdots variable
    gdots.append("circle")
        .attr("cx", function (d) { return xPoveryScale(d.poverty); } )
        .attr("cy", function (d) { return yAgeScale(d.age); } )
        .attr("r", 5)
        .style("fill", "green");

    var labels = healthData.forEach(function(data) {
        data.abbr = +data.abbr
    });
    console.log(labels);    
    
    // Add text to circles
    gdots.append("text")
        .text(function (d) { return (d.abbr)})
        // console.log(d => d.abbr)
        // .attr("cx", function (d) { return xPoveryScale(d.poverty); } )
        // .attr("cy", function (d) { return yAgeScale(d.age); } )

    // // Add dots
    // svg.append("g")
    //     .selectAll("dot")
    //     .data(healthData)
    //     .enter()
    //     .append("circle")
    //         .attr("cx", function (d) { return xPoveryScale(d.poverty); } )
    //         .attr("cy", function (d) { return yAgeScale(d.age); } )
    //         .attr("r", 5)
    //         .style("fill", "green")


});