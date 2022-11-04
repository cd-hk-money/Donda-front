<template>
  <div id="d3chart"></div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class'  
  import * as d3 from 'd3'

  const StockStoreModule = namespace('StockStore')

  @Component
  export default class StockChartD3 extends Vue {

    @StockStoreModule.State('stockGraphAll') stockGraphAll
    @StockStoreModule.State('stockGraphVolume') stockGraphVolume
    
    MARGIN = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 45
    };

    get width () {
      return 1350 - this.MARGIN.left - this.MARGIN.right;
    }

    get height () {
      return 600 - this.MARGIN.top - this.MARGIN.bottom;
    }
              
    get chartData () {
      return Object.entries(this.stockGraphAll).map(entry => ({
        date: entry[0],
        value: entry[1]
      }))
    }

    get charts () {
      return Object.assign(this.stockGraphAll, this.stockGraphVolume)
    }

  
    mounted () {            
      const line = d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))

      const parseTime = d3.timeParse("%Y-%m-%d");
      
      const chartData = Object.entries(this.stockGraphAll).map(entry => ({
        date: entry[0],
        value: entry[1],
      }))

      const volumeData = Object.entries(this.stockGraphVolume).map(entry => ({
        date: entry[0],
        value: entry[1] / 10,        
      }))


      chartData.forEach(d => d.date = parseTime(d.date))
      volumeData.forEach(d => d.date = parseTime(d.date))

                  
      let x = d3.scaleTime()
        .domain(d3.extent(chartData, d => d.date))
        .range([0, this.width]);
      
      let y = d3.scaleLinear()
        .domain([0, d3.max(chartData, d => d.value)])
        .range([this.height, 0]);
      
      const svg = d3.select("#d3chart")
                  .append("svg")
                    .attr("width", this.width + this.MARGIN.left + this.MARGIN.right)
                    .attr("height", this.height + this.MARGIN.top + this.MARGIN.bottom)
                  .append("g")
                    .attr("transform",
                          "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");

                  

      let xAxis = svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x))
        
      let yAxis = svg.append("g")
        .call(d3.axisLeft(y))

      let clip = svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", this.width )
        .attr("height", this.height )
        .attr("x", 0)
        .attr("y", 0);

      let brush = d3.brushX()                  
                      .extent( [[0,0], [this.width,this.height] ] ) 
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

      lines.append("g")
          .attr("fill", "steelblue")
          .attr("fill-opacity", 0.8)
        .selectAll("rect")
        .data([volumeData])
        .join("rect")
          .attr("x", d => x(d.year))
          .attr("width", x.bandwidth())
          .attr("y", d => y(d.sales))
          .attr("height", d => y(0) - y(d.sales));
      


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
          .attr("d", line)
      }

        svg.on("dblclick",function(){
        x.domain(d3.extent(chartData, function(d) { return d.date}))
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