<template>
  <div class="d3-geomap" id="mapUs"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
const _ = require('lodash');

export default {
  name: "UsaMap",
  props: [
    'statesList',
  ],
  watch: {
    async statesList() {
      // assign map width and height
      const ratioWidthHeight = 0.585
      const width = window.innerWidth // Use the window's width
      const height = _.ceil(width * ratioWidthHeight)
      // assign map color
      const legendLevelMin = 1
      const legendLevelMax = 10
      // assign path color
      const pathColor = "gainsboro"
      // the size of each indicator
      const legendBase = width
      const legendSize = 0.02
      const legendSpace = 0.002
      const legendX = 0.8
      const legendY = 0.7
      const legendFontSize = _.ceil(legendBase * 0.02)
      const legendMin = 1
      const legendMax = 70000
      const legendDomain = [legendMin, 10000, 20000, 40000, legendMax]
      // assign map data
      var mapData = await d3.json("/d3-geomap/states-10m.json");
      var statesMap = topojson.feature(mapData, mapData.objects.states).features;
      // assign states data
      var statesData = [];
      this.statesList.forEach(state => {
        statesData.push({
          state: state.state,
          cases: state.cases
        })
      });
      // configuration of color
      // var casesMax = d3.max(statesData.map(function(d) { return parseInt(d.cases)}));
      var casesScale = d3.scaleLinear()
        .domain([legendMin, legendMax])  // input
        .range([legendLevelMin, legendLevelMax]); // output
      var colorScale = d3.scaleQuantize()
        .domain([legendLevelMin, legendLevelMax])
        .range(d3.schemeReds[9]); // single-hue color schemes support a size k ranging from 3 to 9.
      // add the SVG to the page
      var svg = d3.select("#mapUs").append("svg")
        .attr("width", width)
        .attr("height", height);
      svg.append("g")
        .attr("transform", "translate(0, 0)");
      // configuration of tooltip
      var tooltip = d3.select("#mapUs").append("div")
        .attr("class", "tooltip")
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
          if (!_.isUndefined(current)) {
            if (current.cases !== 0) {
              return colorScale(casesScale(current.cases))
            } else {
              return colorScale(casesScale(legendMin))
            }
          }
        })
        .attr("d", path)
        .on("mouseover", function(d) {
          tooltip.transition()
            .style("opacity", 0.9);
          tooltip.html(function() {
            var selectedState = statesData.find(function(element) { return element.state === d.properties.name})
            var content = `
              <table style="margin-top: 2.5px;">
                <tr><td style="text-align: left">State: </td><td style="text-align: right">` + selectedState.state + `</td></tr>
                <tr><td style="text-align: left">Confirmed: </td><td style="text-align: right">` + selectedState.cases + `</td></tr>
              </table>`;
            return content;
          })
          .style("left", function() {
            var tooltipWidth = d3.select('.tooltip').node().getBoundingClientRect().width;
            if (tooltipWidth + d3.event.pageX > width) {
              return (d3.event.pageX - tooltipWidth) + "px"
            } else {
              return (d3.event.pageX) + "px"
            }
          })
          .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function() {
          tooltip.transition()
            .style("opacity", 0);
        });
      // add mesh of states
      svg.append("path")
        .datum(topojson.mesh(mapData, mapData.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", pathColor)
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
            var low = _.replace(_.toString(legendDomain[i]), /\B(?=(\d{3})+(?!\d))/g, ',')
            if (i === legendDomain.length -1) {
              return low + "+"
            } else {
              var high = _.replace(_.toString(legendDomain[i+1]), /\B(?=(\d{3})+(?!\d))/g, ',')
              return low + " - " + high
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
