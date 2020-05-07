<template>
  <div class="d3-geomap" id="mapUs"></div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson";
import * as ut from '../js/utils';

export default {
  name: "UsaMap",
  props: [
    'statesList',
  ],
  watch: {
    async statesList() {
      // assign map color
      const legendLevelMin = 1
      const legendLevelMax = 10
      // the size of each indicator
      const legendMin = 1
      const legendMax = 60000
      // assign map data
      var mapSource = await d3.json("/d3-geomap/counties-albers-10m.json");
      // assign states data
      var statesData = [];
      this.statesList.forEach(state => {
        statesData.push({
          name: state.state,
          cases: state.cases,
          active: state.active,
          deaths: state.deaths,
          tests: state.tests,
          testsPerOneMillion: state.testsPerOneMillion,
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
      const svg = d3.select("#mapUs").append("svg")
        .attr("viewBox", [0, 0, 975, 610]);
      svg.append("g")
        .attr("transform", "translate(610, 20)");
      // configuration of tooltip
      var tooltip = d3.select("#mapUs").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
      // Define path generator
      var path = d3.geoPath() // path generator that will convert GeoJSON to SVG paths
      // add states map
      svg.selectAll(".state")
        .data(topojson.feature(mapSource, mapSource.objects.states).features)
      .enter().append("path")
        .attr("class", "state")
        .attr("fill", function(d) {
          var current = statesData.find(function(element) { return element.name === d.properties.name})
          if (ut.isNotUndefined(current)) {
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
            var selectedState = statesData.find(function(element) { return element.name === d.properties.name})
            var content = `
              <table style="margin-top: 2.5px;">
                <tr><td style="text-align: left">State: </td><td style="text-align: right">` + selectedState.name + `</td></tr>
                <tr><td style="text-align: left">Confirmed: </td><td style="text-align: right">` + selectedState.cases + `</td></tr>
                <tr><td style="text-align: left">Active: </td><td style="text-align: right">` + selectedState.active + `</td></tr>
                <tr><td style="text-align: left">Deceased: </td><td style="text-align: right">` + selectedState.deaths + `</td></tr>
                <tr><td style="text-align: left">Deceased Rate: </td><td style="text-align: right">` + ut.calculateRate(selectedState.deaths, selectedState.cases, 2) + '%' + `</td></tr>
                <tr><td style="text-align: left">Tests: </td><td style="text-align: right">` + selectedState.tests + `</td></tr>
                <tr><td style="text-align: left">Tests/Million: </td><td style="text-align: right">` + selectedState.testsPerOneMillion + `</td></tr>
              </table>`;
            return content;
          })
          .style("left", function() {
            var tooltipWidth = d3.select('.tooltip').node().getBoundingClientRect().width;
            if (tooltipWidth + d3.event.pageX > window.innerWidth) {
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
        .datum(topojson.mesh(mapSource, mapSource.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "gainsboro")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
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
  fill-opacity: 0.7;
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
