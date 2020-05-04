<template>
<div>
  <div class="d3-geomap" id="map"></div>
</div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
  name: "UsaMap",
  data: () => ({

  }),
  mounted() {
    this.createMap()
  },
  methods: {
    async createMap() {
      // assign map width and height
      const width = window.innerWidth // Use the window's width
      const height = Math.ceil(width * 0.585)
      // assign map color
      const COLOR_MIN = "Cornsilk";
      const COLOR_MAX = "Maroon";
      // load map data
      var earthQuake = []
      var data = await Promise.all([
        d3.json("/d3-geomap/states-10m.json"),
        d3.dsv(",", "state-earthquakes.csv", function(d) {
          earthQuake.push({
            state: d.States,
            region: d.Region,
            total: parseInt(d["Total Earthquakes"])
          })
        })
      ])
      var us = data[0]
      console.log(us)
      // D3 Projection
      var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale(width); // scale things down so see entire US

      // Define path generator
      var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection);  // tell path generator to use albersUsa projection

        // load states data
        var states = topojson.feature(us, us.objects.states).features;

        var totalMax = d3.max(earthQuake.map(function(d) { return parseInt(d.total)}))

        var totalScale = d3.scaleLog()
          .domain([1,  totalMax])
          .range([1, 9]); // output

        var colorScale = d3.scaleLinear()
          .domain([1, 9])
          .range([COLOR_MIN, COLOR_MAX]);

        //var color = d3.scaleQuantize([1, 7], d3.schemeBlues[6])

        // add the line chart SVG to the page
        var svg = d3.select("#map").append("svg")
          .attr("width", width)
          .attr("height", height)
        .append("g")
          .attr("transform", "translate(0, 0)");

        var tooltip = d3.select("#map").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);


        // add states map
        svg.selectAll(".state")
          .data(states)
        .enter().append("path")
          .attr("class", "state")
          .attr("fill", function(d) {
            var current = earthQuake.find(function(element) { return element.state === d.properties.name})
            if (typeof current !== "undefined") {
              if (current.total !== 0) {
                return colorScale(totalScale(current.total))
              } else {
                return colorScale(totalScale(1))
              }
            }
          })
          .attr("d", path)
          .on("mouseover", function(d) {
            console.log(d)
            tooltip.transition()
            .duration(200)
            .style("opacity", .9);
            tooltip.html(d.properties.name)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
          .on("mouseout", function() {
            tooltip.transition()
            .duration(500)
            .style("opacity", 0);
          });

          svg.append("path")
                .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
                .attr("fill", "none")
                .attr("stroke", "white")
                .attr("stroke-linejoin", "round")
                .attr("d", path);
          var margin = {top: 50, right: 50, bottom: 50, left: 50}
          const LINE_HEIGHT = 25;
          const INDICATOR_SIZE = 20;
          var totalDomain = [1, 5, 50, 200, 500, 1000, 3000, 6000, 10000]
          // add legend
          // add legend title
          svg.append("text")
            .attr("y", 8 * margin.top)
            .attr("x", width - margin.top * 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .text("Confirmed");

          for(var i = 1; i < 10; i++) {
            // add legend indicator
            svg.append("rect")
              .attr("y", 8 * margin.top + i * LINE_HEIGHT - INDICATOR_SIZE + 3)
              .attr("x", width - margin.top * 2 - INDICATOR_SIZE - 3)
              .attr("width", INDICATOR_SIZE)
              .attr("height", INDICATOR_SIZE)
              .style("fill", colorScale(totalScale(totalDomain[i-1])));
            svg.append("text")
              .attr("y", 8 * margin.top + i * LINE_HEIGHT)
              .attr("x", width - margin.top * 2)
              .attr("text-anchor", "start")
              .style("font-size", "16px")
              .text(totalDomain[i-1]);
          }
    }
  }
}
</script>

<style>
.states {
  fill: none;
  stroke: #000;
}

path:hover {
  fill-opacity: .7;
}

div.tooltip {
  position: absolute;
  text-align: center;
  width: 80px;
  height: 14px;
  padding: 2px;
  font: 12px sans-serif;
  background: #fff;
  border: 0px;
  pointer-events: none;
}
</style>
