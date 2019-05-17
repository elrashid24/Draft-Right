//this file is similar to planting a garden of circles
function bubbleChart(width,height) {
        
        //let these be the default width and height of the chart
        //written this way, a width and height must be passed into 
        //the callback function in index.html
        //alternatively, you can set default values of w & h & 
        //create accessor functions that default to those values definied in the closure
        // if no w & height 
        //is passed in (see line 79)
        
        
        maxRadius = 30,
        columnForColors = "Player",
        columnForRadius = "PTS";

    function chart(selection) {
        var data = selection.datum();
        var div = selection;
        var svg = div.selectAll('svg');
        svg.attr('width', width).attr('height', height);


        // var tooltip = selection
        //     .append("div")
        //     .style("position", "absolute")
        //     .style("visibility", "hidden")
        //     .style("color", "white")
        //     .style("padding", "8px")
        //     .style("background-color", "#626D71")
        //     .style("border-radius", "6px")
        //     .style("text-align", "center")
        //     .style("font-family", "monospace")
        //     .style("width", "400px")
        //     .text("");


        // var simulation = d3.forceSimulation(data)
        //     .force("charge", d3.forceManyBody().strength([-50]))
        //     .force("x", d3.forceX())
        //     .force("y", d3.forceY())
        //     .on("tick", ticked);

        // function ticked(e) {
        //     node.attr("cx", function (d) {
        //         return d.x;
        //     })
        //         .attr("cy", function (d) {
        //             return d.y;
        //         });
        // }

        // var colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
        // var scaleRadius = d3.scaleLinear().domain([d3.min(data, function (d) {
        //     return +d[columnForRadius];
        // }), d3.max(data, function (d) {
        //     return +d[columnForRadius];
        // })]).range([5, 18])

    //     var node = svg.selectAll("circle")
    //         .data(data)
    //         .enter()
    //         .append("circle")
    //         .attr('r', function (d) {
    //             return scaleRadius(d[columnForRadius])
    //         })
    //         .style("fill", function (d) {
    //             return colorCircles(d[columnForColors])
    //         })
    //         .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
    //         .on("mouseover", function (d) {
    //             tooltip.html(d[columnForColors] + "<br>" + d.title + "<br>" + d[columnForRadius] + " hearts");
    //             return tooltip.style("visibility", "visible");
    //         })
    //         .on("mousemove", function () {
    //             return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    //         })
    //         .on("mouseout", function () {
    //             return tooltip.style("visibility", "hidden");
    //         });
    // }

    // chart.width = function (value) {
    //     if (!arguments.length) {
    //         return width;
    //     }
    //     width = value;
    //     return chart;
    // };

    // chart.height = function (value) {
    //     if (!arguments.length) {
    //         return height;
    //     }
    //     height = value;
    //     return chart;
    // };


    // chart.columnForColors = function (value) {
    //     if (!arguments.columnForColors) {
    //         return columnForColors;
    //     }
    //     columnForColors = value;
    //     return chart;
    // };

    // chart.columnForRadius = function (value) {
    //     if (!arguments.columnForRadius) {
    //         return columnForRadius;
    //     }
    //     columnForRadius = value;
    //     return chart;
    };

    return chart;
    //this is called method chaining.. it allows us to create different kinds of
    //of charts using the chart function 
}