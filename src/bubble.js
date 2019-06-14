function createBubbleChart(width, height) {
  function createBubbles(chart) {
    const bubbleColor = "Position";
    const bubbleRadius = "Rank";

    const svg = chart
      .selectAll("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("transform", "translate(0,0)");

    const player_data = chart.datum();

    const tooltip = d3
      .select("div")
      .append("div")
      .style("position", "absolute")
      .style("color", "black")
      .style("padding", "8px")
      .style("background-color", "#EBEDEF")
      .style("border-radius", "6px")
      .style("text-align", "center")
      .style("font-family", "monospace")
      .style("width", "200px")
      .style("font-weight", "bold")
      .text("");

    const scaleRadius = d3
      .scaleSqrt()
      .domain([120, 1])
      .range([1, 22]);

    let forceX = d3.forceX(width / 2).strength(0.05);
    let forceY = d3.forceY(height / 2).strength(0.05);
    let forceCollide = d3.forceCollide(function(d) {
      return scaleRadius(d.Rank) + 1.5;
    });
    let forceRanks = d3.forceY(function(d) {
      if (d.Rank < 20) {
        return 180;
      } else if (d.Rank >= 20 && d.Rank < 41) {
        return 340;
      } else if (d.Rank >= 41 && d.Rank < 61) {
        return 470;
      } else if (d.Rank >= 61 && d.Rank < 81) {
        return 580;
      } else if (d.Rank >= 81) {
        return 650;
      }
    });

    let forcePositions = d3.forceY(function(d) {
      if (d.Position === "RB") {
        return 170;
      } else if (d.Position === "WR") {
        return 340;
      } else if (d.Position === "QB") {
        return 470;
      } else if (d.Position === "TE") {
        return 580;
      } else {
        return 650;
      }
    });
    let forceBest = d3.forceY(function(d) {
      if (d.Best < 20) {
        return 180;
      } else if (d.Best >= 20 && d.Best < 41) {
        return 340;
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
        return 180;
      } else if (d.Worst >= 20 && d.Worst < 41) {
        return 320;
      } else if (d.Worst >= 41 && d.Worst < 61) {
        return 470;
      } else if (d.Worst >= 61 && d.Worst < 81) {
        return 580;
      } else if (d.Worst > 81) {
        return 650;
      }
    });

    const simulation = d3
      .forceSimulation(player_data)

      .force("x", forceX)

      .force("y", forceY)
      .on("tick", ticked)
      .force("collide", forceCollide);

    function ticked(e) {
      node
        .attr("cx", function(d) {
          return d.x;
        })
        .attr("cy", function(d) {
          return d.y;
        });
    }

    const colorCircles = d3.scaleOrdinal(d3.schemeCategory10);

    const node = svg
      .selectAll("circle")
      .data(player_data)
      .enter()
      .append("circle")
      .on("click", function(d) {
        console.log(d);
      })
      .on("mouseover", function(d) {
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
            "Expert's Ceiling: " +
            d.Best +
            "<br>" +
            "Expert's Floor: " +
            d.Worst +
            "<br>"
        );
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function() {
        return tooltip
          .style("top", d3.event.pageY - 90 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        return tooltip.style("visibility", "hidden");
      })
      .attr("r", function(d) {
        return scaleRadius(d.Rank);
      })
      .style("fill", function(d) {
        return colorCircles(d[bubbleColor]);
      });

    d3.select("#Ranking").on("click", function() {
      simulation
        .force("y", forceRanks)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));

      console.log("10 button works");
    });

    d3.select("#Worst").on("click", function() {
      simulation
        .force("y", forceFloor)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));

      console.log("floor button works");
    });
    d3.select("#Best").on("click", function() {
      simulation
        .force("y", forceBest)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));

      console.log("floor button works");
    });
    d3.select("#Position").on("click", function() {
      simulation
        .force("y", forcePositions)
        .alphaTarget(0.45)
        .force("x", d3.forceX(width / 2).strength(0.05));

      console.log("position button works");
    });

    d3.select("#Combine").on("click", function() {
      simulation

        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(width / 2).strength(0.05))

        .alphaTarget(0.05);

      console.log("This Other Button Works");
    });
  }
  return createBubbles;
}
