//this file is similar to planting a garden of circles
 function createBubbleChart(width,height) {
// Pos

    function createBubbles(chart) {
        const bubbleColor = "Position"
        //sets bubble color to player position
        const bubbleRadius = "Rank";
        //sets radii of circles proportional to total points scored
        //the radii will be scaled linearl ranging form highest point total
        //to lowest point total, based on range specified in const scaleRadius
        const svg = chart.selectAll('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('transform', 'translate(0,0)')
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
            
        const scaleRadius = d3.scaleSqrt().domain([51,1]).range([1,50]) 
        
        //widith is vertical down the page
        var forceX = d3.forceX(width / 2).strength(0.05)
        var forceY = d3.forceY(height / 2).strength(0.05)
        var forceCollide = d3.forceCollide(function(d){
            return scaleRadius(d.Rank) + 3
        });
        var forceRanks = d3.forceX(function(d){
            if(d.Rank <= 10){
                return 200
            } else if (d.Rank > 10 && d.Rank < 21){
                return 500
            } else if (d.Rank >= 21 && d.Rank < 31){
                return 750
            } else if (d.Rank >= 31 && d.Rank < 41){
                return 900
            } else {
                return 1100
            }
        })
        //.strength(1.5)
        // var forceTopTwenty = d3.forceX(function(d){
        //     if(d.Rank > 10 && d.Rank < 21){
        //         return 600
        //     }else {
        //         return 500
        //     }
        // }).strength(2)
        
        const simulation = d3.forceSimulation(player_data)
        //force simulation is a module that uses .force on 
        //each circle getting them to go to a certain place
        //forceSimulation updates the position of each node @ some time interval
        //in this case on "Tick"
            // .force("charge", d3.forceManyBody().strength([5]))
            .force("x", forceX)
            //height is horizontal across the    page
            .force("y", forceY)
            .on("tick", ticked)
            .force("collide", forceCollide);
            //force collide takes in the radius of the area you want the collision to avoid
            //so if the radius of the circle matches the radius of the force collide,
            //the circles will never collide  
            //everytime there is a tick, fire the ticked function

        function ticked(e) {
            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
                //when simulation is fed 
        }

        const colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
        //ordinal scales have a discrete domain such as a set of names or cateogries
        const node = svg.selectAll("circle")
            .data(player_data)
            .enter()
            .append("circle")
            .on("click", function(d){
                console.log(d)
            })
            .attr('r', function(d){
                return scaleRadius(d.Rank)
            })
            .style("fill", function (d) {
                return colorCircles(d[bubbleColor])
            })
            d3.select("#Ranking").on('click', function(){
                simulation.force("x", forceRanks)
                .alphaTarget(1.2)
                // .restart()
                console.log("10 button works")
            })
            // d3.select("#top_twenty").on('click', function(){
            //     simulation.force("x", forceTopTwenty)
            //     console.log("20 button works")
            // })
            d3.select("#Combine").on('click', function(){
                simulation
                // .force("xY, d3.forceY(width/2).strength(0.05))
                .force("x", d3.forceX(width/2).strength(0.05))
                // .force("y", d3.forceX(height/1.5)).strength(0.05)
                .alphaTarget(.05)
                .restart(forceX)
                // .restart(forceY)
                console.log("This Other Button Works")
                
            })
            // .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
            //that will cluster the circles in the middle of the x-y plane


        // Rank	Name	Team	Position	Bye	Best	Worst	Avg	Std Dev	ADP
            
        .on("mouseover", function (d) {
                tooltip.html(d.Name + "<br>" + "Rank: " + d.Rank + "<br>" 
                     + "Position: " + d.Position + "<br>" 
                     + "Team: " + d.Team + "<br>" 
                     + "Bye: " + d.Bye + "<br>" 
                     + "Ceiling: " + d.Best + "<br>" 
                     + "Expert Floor: " + d.Worst + "<br>" 
                );
                return tooltip.style("visibility", "visible");
            })
            .on("mousemove", function () {
                return tooltip.style("top", (d3.event.pageY - 90) + "px").style("left", (d3.event.pageX + 10) + "px");
            })
            .on("mouseout", function () {
                return tooltip.style("visibility", "hidden");
            });
    }
    return createBubbles;
    //this is called method chaining.. it allows us to create different kinds of
    //of charts using the createBubbles function 
}