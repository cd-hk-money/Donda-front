<template>
  <div id="d3chart"></div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class'  
  import * as d3 from 'd3'

  const StockStoreModule = namespace('StockStore')
  const MARGIN = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 45
  };

  const width = 1350 - MARGIN.left - MARGIN.right;
  const height = 600 - MARGIN.top - MARGIN.bottom;

  @Component
  export default class  extends Vue {

    @StockStoreModule.State('stockGraphAll') stockGraphAll
            
    get chartData () {
      return Object.entries(this.stockGraphAll).map(entry => ({
        date: entry[0],
        value: entry[1]
      }))
    }
    
    mounted () {            
      let line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))

      var parseTime = d3.timeParse("%Y-%m-%d");
      let chartData = Object.entries(this.stockGraphAll).map(entry => ({
        date: entry[0],
        value: entry[1]
      }))

      chartData.forEach(d => d.date = parseTime(d.date))
                  
      let x = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([0, width]);
      
      let y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.value)])
        .range([height, 0]);
      
      let svg = d3.select("#d3chart")
            .append("svg")
              .attr("width", width + MARGIN.left + MARGIN.right)
              .attr("height", height + MARGIN.top + MARGIN.bottom)
            .append("g")
              .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")")
                  

      let xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        
      let yAxis = svg.append("g")
        .call(d3.axisLeft(y))

      let clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

      let brush = d3.brushX()                  
                      .extent( [[0,0], [width,height] ] ) 
                      .on("end", e => updateChart(e)) 

      var lines = svg.append('g')
                      .attr("clip-path", "url(#clip)")

      
      lines.append("path")
              .data([chartData])
              .attr("class", "line")
              .attr("fill", "none")
              .attr("stroke", "#00BCD4")
              .attr("stroke-width", 3)
              .attr("d", line)

      lines.append('g')
            .attr('class', 'brush')
            .call(brush)

      let idleTimeout

      function idled() {
        idleTimeout = null
      }

      function updateChart (e) {        
        let extent = e.selection
        
        if(!extent) {
          if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
          x.domain([4,8])
        } else{
          x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
          lines.select(".brush").call(brush.move, null)
        }

        xAxis.transition().duration(1000).call(d3.axisBottom(x))
        lines
          .select('.line')
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y(d.value) })
          )
      }

      svg.on("dblclick",function(){
      x.domain(d3.extent(chartData, function(d) { return d.date; }))
      xAxis.transition().call(d3.axisBottom(x))
      lines
        .select('.line')
        .transition()
        .attr("d", d3.line()
          .x(function(d) { return x(d.date) })
          .y(function(d) { return y(d.value) })
      )
    });

    
                  
    }
        
  }
</script>

<style scoped>

</style>