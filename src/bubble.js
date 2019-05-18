//this file is similar to planting a garden of circles
function createBubbleChart(width,height) {

    function createBubbles(chart) {
        const bubbleColor = "Player"
        //sets bubble color to player position
        const bubbleRadius = "PTS";
        //sets radii of circles proportional to total points scored
        const svg = chart.selectAll('svg')
            .attr('width', width)
            .attr('height', height)
        //grabs all svg elements from the chart
        ;
        const player_data = chart.datum();
        //chart.datum binds 
        const tooltip = chart
            .append("div")
            .style("position", "absolute")
            .style("color", "white")
            .style("padding", "8px")
            .style("background-color", "#1D428A")
            .style("border-radius", "6px")
            .style("text-align", "center")
            .style("font-family", "monospace")
            .style("width", "200px")
            .text("");

        const simulation = d3.forceSimulation(player_data)
            .force("charge", d3.forceManyBody().strength([-90]))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        function ticked(e) {
            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
        }

        const colorCircles = d3.scaleOrdinal(d3.schemeCategory20b);
        const scaleRadius = d3.scaleLinear().domain([d3.min(player_data, function (d) {
            return +d[bubbleRadius];
        }), d3.max(player_data, function (d) {
            return +d[bubbleRadius];
        })]).range([5,50])

        const node = svg.selectAll("circle")
            .data(player_data)
            .enter()
            .append("circle")
            .attr('r', function (d) {
                return scaleRadius(d[bubbleRadius])
            })
            .style("fill", function (d) {
                return colorCircles(d[bubbleColor])
            })
            .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            .on("mouseover", function (d) {
                tooltip.html(d[bubbleColor] + "<br>" + d.title + "<br>" + d[bubbleRadius] + " hearts");
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function () {
                return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });
    }



    return createBubbles;
    //this is called method chaining.. it allows us to create different kinds of
    //of charts using the createBubbles function 
}