<template>
  <div id="d3linebar"></div>
</template>

<script>
  import { Component, Vue } from 'vue-property-decorator';
  import { namespace } from 'vuex-class'  
  import * as d3 from 'd3'

  const StockStoreModule = namespace('StockStore')
  

  @Component
  export default class  extends Vue {
    
    @StockStoreModule.State('stockGraphAll') stockGraphAll
    @StockStoreModule.State('stockGraphVolume') stockGraphVolume

    MARGIN = {
      top: 20,
      right: 50,
      bottom: 20,
      left: 30
    };


    get width () {
      return 1400 - this.MARGIN.left - this.MARGIN.right;
    }

    get height () {
      return 650 - this.MARGIN.top - this.MARGIN.bottom;
    }

    mounted () {
      const parseTime = d3.timeParse("%Y-%m-%d");

      const data = Object.entries(this.stockGraphAll).map(entry => ({
        date: entry[0],
        value: entry[1],
        close: this.stockGraphVolume[entry[0]]
      }))

      data.forEach(d => d.date = parseTime(d.date))

      
      const line = d3.line()
        .x(d => x(d.date) + x.bandwidth() / 2)
        .y(d => y2(d.close))

      const x = d3.scaleBand()
        .domain(data.map(d => d.date))
        .rangeRound([this.MARGIN.left, this.width - this.MARGIN.right])
        .padding(0.1)

      const y1 = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .rangeRound([this.height - this.MARGIN.bottom, this.MARGIN.top])

      const y2 = d3.scaleLinear()
        .domain(d3.extent(data, d => d.close))
        .rangeRound([this.height - this.MARGIN.bottom, this.MARGIN.top])
      
      const xAxis = g => g
        .attr("transform", `translate(0,${this.height - this.MARGIN.bottom})`)
        .call(d3.axisBottom(x)
            .tickValues(d3.ticks(...d3.extent(x.domain()), this.width / 40).filter(v => x(v) !== undefined))
            .tickSizeOuter(0))

      const y1Axis = g => g
        .attr("transform", `translate(${this.MARGIN.left},0)`)
        .style("color", "steelblue")
        .call(d3.axisLeft(y1).ticks(null, "s"))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", - this.MARGIN.left)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text(data.y1))

      const y2Axis = g => g
        .attr("transform", `translate(${this.width - this.MARGIN.right},0)`)
        .call(d3.axisRight(y2))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", this.MARGIN.right)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "end")
            .text(data.y2))

      const svg = d3.select("#d3linebar")
        .append("svg")
          .attr("width", this.width + this.MARGIN.left + this.MARGIN.right)
          .attr("height", this.height + this.MARGIN.top + this.MARGIN.bottom)
        .append("g")
          .attr("transform",
                "translate(" + this.MARGIN.left + "," + this.MARGIN.top + ")");
    
        svg.append("g")
            .attr("fill", "steelblue")
            .attr("fill-opacity", 0.8)
          .selectAll("rect")
          .data(data)
          .join("rect")
            .attr("x", d => x(d.date))
            .attr("width", x.bandwidth())
            .attr("y", d => y1(d.value))
            .attr("height", d => y1(0) - y1(d.value));

        svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "currentColor")
            .attr("stroke-miterlimit", 1)
            .attr("stroke-width", 3)
            .attr("d", line(data));

        svg.append("g")
            .attr("fill", "none")
            .attr("pointer-events", "all")
          .selectAll("rect")
          .data(data)
          .join("rect")
            .attr("x", d => x(d.date))
            .attr("width", x.bandwidth())
            .attr("y", 0)
            .attr("height", this.height)
          

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(y1Axis);

        svg.append("g")
            .call(y2Axis);

        let brush = d3.brushX()                  
                  .extent( [[0,0], [this.width,this.height] ] ) 
                  .on("end", e => updateChart(e)) 
                  let idleTimeout
        svg.append('g')
            .attr('class', 'brush')
            .call(brush)

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
            svg.select(".brush").call(brush.move, null)
          }

          xAxis.transition().duration(1000).call(d3.axisBottom(x))
          svg
            .select('.line')
            .transition()
            .duration(1000)
            .attr("d", line)
        }

          svg.on("dblclick",function(){
          x.domain(d3.extent(data, function(d) { return d.date}))
          xAxis.transition().call(d3.axisBottom(x))
          svg
            .select('.line')
            .transition()
            .attr("d", d3.line()
            .x(function(d) { return x(d.date) })
            .y(function(d) { return y1(d.value) })
          )       
        });
    }
  }
</script>

<style scoped>

</style>