//this file is similar to planting a garden of circles
function createBubbleChart(width, height) {
  // Pos

  function createBubbles(chart) {
    const bubbleColor = "Position";
    //sets bubble color to player position
    const bubbleRadius = "Rank";
    //sets radii of circles proportional to total points scored
    //the radii will be scaled linearl ranging form highest point total
    //to lowest point total, based on range specified in const scaleRadius
    const svg = chart
      .selectAll("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(0,0)");
    //grabs all svg elements from the chart
    const player_data = chart.datum();
    //chart.datum binds
    const tooltip = d3
      .select("svg")
      .append("svg")
      .style("position", "absolute")
      .style("color", "white")
      .style("padding", "8px")
      .style("background-color", "#1D428A")
      .style("border-radius", "6px")
      .style("text-align", "center")
      .style("font-family", "monospace")
      .style("width", "200px")
      .text("");

    const scaleRadius = d3
      .scaleSqrt()
      .domain([328, 1])
      .range([1, 30]);

    //widith is vertical down the page
    let forceX = d3.forceX(width / 2).strength(0.05);
    let forceY = d3.forceY(height / 2).strength(0.05);
    let forceCollide = d3.forceCollide(function(d) {
      return scaleRadius(d.Rank) + 1;
    });
    let forceRanks = d3.forceY(function(d) {
      if (d.Rank < 20) {
        return 150;
      } else if (d.Rank >= 20 && d.Rank < 41) {
        return 320;
      } else if (d.Rank >= 41 && d.Rank < 61) {
        return 470;
      } else if (d.Rank >= 61 && d.Rank < 81) {
        return 580;
      } else if (d.Rank >= 81) {
        return 680;
      }
    });

    let forcePositions = d3.forceY(function(d) {
      if (d.Position === "RB") {
        return 150;
      } else if (d.Position === "WR") {
        return 320;
      } else if (d.Position === "QB") {
        return 470;
      } else if (d.Position === "TE") {
        return 580;
      } else {
        return 680;
      }
    });
    let forceBest = d3.forceY(function(d) {
      if (d.Best < 20) {
        return 150;
      } else if (d.Best >= 20 && d.Best < 41) {
        return 320;
      } else if (d.Best >= 41 && d.Best < 61) {
        return 470;
      } else if (d.Best >= 61 && d.Best < 81) {
        return 580;
      } else if (d.Best >= 81) {
        return 680;
      }
    });
    let forceFloor = d3.forceY(function(d) {
      if (d.Worst < 20) {
        return 150;
      } else if (d.Worst >= 20 && d.Worst < 41) {
        return 320;
      } else if (d.Worst >= 41 && d.Worst < 61) {
        return 470;
      } else if (d.Worst >= 61 && d.Worst < 81) {
        return 580;
      } else if (d.Worst > 81) {
        return 730;
      }
    });

    //.strength(1.5)
    // let forceTopTwenty = d3.forceX(function(d){
    //     if(d.Rank > 10 && d.Rank < 21){
    //         return 600
    //     }else {
    //         return 500
    //     }
    // }).strength(2)

    const simulation = d3
      .forceSimulation(player_data)
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
      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
      //when simulation is fed
    }

    const colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
    //ordinal scales have a discrete domain such as a set of names or cateogries
    const node = svg
      .selectAll("circle")
      .data(player_data)
      .enter()
      .append("circle")
      .on("click", function(d) {
        console.log(d);
      })
      .attr("r", function(d) {
        return scaleRadius(d.Rank);
      })
      .style("fill", function(d) {
        return colorCircles(d[bubbleColor]);
      });
    // debugger
    d3.select("#Ranking").on("click", function() {
      simulation
        .force("y", forceRanks)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));

      // .restart(forceX);
      console.log("10 button works");
    });

    d3.select("#Worst").on("click", function() {
      simulation
        .force("y", forceFloor)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));
      // .restart(forceX);
      console.log("floor button works");
    });
    d3.select("#Best").on("click", function() {
      simulation
        .force("y", forceBest)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));
      // .restart(forceX);
      console.log("floor button works");
    });
    d3.select("#Position").on("click", function() {
      simulation
        .force("y", forcePositions)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));
      // .restart(forceX);
      console.log("position button works");
    });
    // d3.select("#top_twenty").on('click', function(){
    //     simulation.force("x", forceTopTwenty)
    //     console.log("20 button works")
    // })
    d3.select("#Combine").on("click", function() {
      simulation
        // .force("xY, d3.forceY(width/2).strength(0.05))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(width / 2).strength(0.05))
        // .force("y", d3.forceX(height/1.5)).strength(0.05)
        .alphaTarget(0.05);
      // .restart(forceX);
      // .restart(forceY)
      console.log("This Other Button Works");
    });
    // .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
    //that will cluster the circles in the middle of the x-y plane

    // Rank	Name	Team	Position	Bye	Best	Worst	Avg	Std Dev	ADP

    d3.select("#ToolTip").on("mouseover", function() {
      tooltip.html(
        d.Name +
          "<br>" +
          "Rank: " +
          d.Rank +
          "<br>" +
          "Position: " +
          d.Position +
          "<br>" +
          "Team: " +
          d.Team +
          "<br>" +
          "Bye: " +
          d.Bye +
          "<br>" +
          "Ceiling: " +
          d.Best +
          "<br>" +
          "Expert Floor: " +
          d.Worst +
          "<br>"
      );
      return tooltip.style("visibility", "visible");
    });
    d3.select("#ToolTip").on("mousemove", function() {
      return tooltip
        .style("top", d3.event.pageY - 90 + "px")
        .style("left", d3.event.pageX + 10 + "px");
    });
    d3.select("#ToolTip").on("mouseout", function() {
      return tooltip.style("visibility", "hidden");
    });
  }
  return createBubbles;
  //this is called method chaining.. it allows us to create different kinds of
  //of charts using the createBubbles function
}
