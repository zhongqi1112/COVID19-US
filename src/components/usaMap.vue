<template>
  <div class="d3-geomap" id="mapUs"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";

export default {
  name: "UsaMap",
  data: () => ({
    //
  }),
  created() {
    this.createMapUs()
  },
  methods: {
    async createMapUs() {
      // assign map width and height
      const ratioWidthHeight = 0.585
      const width = window.innerWidth // Use the window's width
      const height = Math.ceil(width * ratioWidthHeight)
      // assign map color
      const colorMin = "Cornsilk"
      const colorMax = "Maroon"
      const legendLevel = 10
      // the size of each indicator
      const legendBase = width
      const legendSize = 0.02
      const legendSpace = 0.002
      const legendX = 0.83
      const legendY = 0.7
      const legendFontSize = Math.ceil(legendBase * 0.02)
      const legendMax = 60000
      const legendDomain = [1, 5000, 10000, 30000, legendMax]
      // load map data
      var loadData = await Promise.all([
        d3.json("/d3-geomap/states-10m.json"),
        fetch('https://corona.lmao.ninja/v2/states?sort=cases')
      ]);
      var statesJson = await loadData[1].json();
      // assign map data
      var mapData = loadData[0];
      var statesMap = topojson.feature(mapData, mapData.objects.states).features;
      // assign states data
      var statesData = [];
      statesJson.forEach(state => {
        statesData.push({
          state: state.state,
          cases: state.cases
        })
      });
      // configuration of color
      // var casesMax = d3.max(statesData.map(function(d) { return parseInt(d.cases)}));
      var casesScale = d3.scaleLinear()
        .domain([1, legendMax])
        .range([1, legendLevel]); // output
      var colorScale = d3.scaleLinear()
        .domain([1, legendLevel])
        .range([colorMin, colorMax]);
      colorScale.clamp(true)
      // add the SVG to the page
      var svg = d3.select("#mapUs").append("svg")
        .attr("width", width)
        .attr("height", height);
      svg.append("g")
        .attr("transform", "translate(0, 0)");
      // configuration of tooltip
      var tooltip = d3.select("#mapUs").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
      // D3 Projection
      var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale(width); // scale things down so see entire US
      // Define path generator
      var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
        .projection(projection);  // tell path generator to use albersUsa projection
      // add states map
      svg.selectAll(".state")
        .data(statesMap)
      .enter().append("path")
        .attr("class", "state")
        .attr("fill", function(d) {
          var current = statesData.find(function(element) { return element.state === d.properties.name})
          if (typeof current !== "undefined") {
            if (current.cases !== 0) {
              return colorScale(casesScale(current.cases))
            } else {
              return colorScale(casesScale(1))
            }
          }
        })
        .attr("d", path)
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(function() {
            var selectedState = statesData.find(function(element) { return element.state === d.properties.name})
            var content = `
              <table style="margin-top: 2.5px;">
                <tr><td>State: </td><td style="text-align: right">` + selectedState.state + `</td></tr>
                <tr><td>Case: </td><td style="text-align: right">` + selectedState.cases + `</td></tr>
              </table>`;
            return content;
          })
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function() {
          tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        });
      // add mesh of states
      svg.append("path")
        .datum(topojson.mesh(mapData, mapData.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
      // add legend title
      svg.append("text")
        .attr("y", height * legendY)
        .attr("x", width * legendX)
        .attr("text-anchor", "left")
        .style("font-size", legendFontSize)
        .text("Confirmed");
      // add legend indicator
      for(let i = 0; i < legendDomain.length; i++) {
        // add legend indicator
        svg.append("rect")
          .attr("y", height * legendY + (i + 1) * legendBase * (legendSize + legendSpace) - legendBase * legendSize)
          .attr("x", width * legendX)
          .attr("width", legendBase * legendSize)
          .attr("height", legendBase * legendSize)
          .style("fill", colorScale(casesScale(legendDomain[i])));
        svg.append("text")
          .attr("y", height * legendY + (i + 1) * width * (legendSize + legendSpace))
          .attr("x", width * (legendX + legendSize + legendSpace))
          .attr("text-anchor", "start")
          .style("font-size", legendFontSize)
          .text(function() {
            if (i === legendDomain.length -1) {
              return legendDomain[i] + "+"
            } else {
              return legendDomain[i] + " - " + legendDomain[i+1]
            }
          });
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
  line-height: 1;
  padding: 6px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
}
</style>
