import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import { Element } from 'react-faux-dom';
//import data from './data';
//var data = require('./data/data.json');
var sorted_snitches_top = []
var data = require('./data/data.json');

class BarChart extends Component{

  get_top_trackers() {

  var snitches = {};

  // Variable for Top __ websites with trackers on different websites
  var top_num = 10

  for (let tracker in data['snitch_map']) {
    var websites = data['snitch_map'][tracker];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i] in snitches){
        snitches[websites[i]] += 1
      } else {
        snitches[websites[i]] = 1;
      }
    }
  }

  // Create items array
  var items = Object.keys(snitches).map(function(key) {
    return [key, snitches[key]];
  });

  // Sort the array based on the second element
  items.sort(function(first, second) {
    return second[1] - first[1];
  });

  // Create a new array with only the first top_num items
  sorted_snitches_top = items.slice(0, top_num)

  return sorted_snitches_top;
}


  plot(chart, width, height) {
      console.log(sorted_snitches_top)
          // create scales!
          const xScale = d3.scaleBand()
              .domain(sorted_snitches_top.map(d => d[0]))
              .range([0, width]);
          const yScale = d3.scaleLinear()
              .domain([0, d3.max(sorted_snitches_top, d => d[1])])
              .range([height, 0]);
          const colorScale = d3.scaleSequential().domain([2,11])
              .interpolator(d3.interpolateViridis );

          chart.selectAll('.bar')
              .data(sorted_snitches_top)
              .enter()
              .append('rect')
              .classed('bar', true)
              .attr('x', d => xScale(d[0]))
              .attr('y', d => yScale(d[1]))
              .attr('height', d => (height - yScale(d[1])))
              .attr('width', d => xScale.bandwidth())
              .style('fill', (d, i) => colorScale(i + 2));

          chart.selectAll('.bar-label')
              .data(sorted_snitches_top)
              .enter()
              .append('text')
              .classed('bar-label', true)
              .attr('x', d => xScale(d[0]) + xScale.bandwidth()/2)
              .attr('dx', 0)
              .attr('y', d => yScale(d[1]))
              .attr('dy', -6)
              .text(d => d[1]);

          const xAxis = d3.axisBottom()
              .scale(xScale);

          chart.append('g')
              .classed('x axis', true)
              .attr('transform', `translate(0,${height})`)
              .call(xAxis);

          const yAxis = d3.axisLeft()
              .ticks(5)
              .scale(yScale);

          chart.append('g')
              .classed('y axis', true)
              .attr('transform', 'translate(0,0)')
              .call(yAxis);

          chart.select('.x.axis')
              .append('text')
              .attr('x',  width/2)
              .attr('y', 60)
              .attr('fill', '#000')
              .style('font-size', '20px')
              .style('text-anchor', 'middle')
              .text('Company');

          chart.select('.y.axis')
              .append('text')
              .attr('x', 0)
              .attr('y', 0)
              .attr('transform', `translate(-50, ${height/2}) rotate(-90)`)
              .attr('fill', '#000')
              .style('font-size', '20px')
              .style('text-anchor', 'middle')
              .text('Number of Trackers');

    /*      const yGridlines = d3.axisLeft()
              .scale(yScale)
              .ticks(5)
              .tickSize(-width,0,0)
              .tickFormat('')

          chart.append('g')
              .call(yGridlines)
              .classed('gridline', true);*/
      }

      drawChart() {
          const width = 800;
          const height = 450;

          const el = new Element('div');
          const svg = d3.select(el)
              .append('svg')
              .attr('id', 'chart')
              .attr('width', width)
              .attr('height', height);

          const margin = {
              top: 60,
              bottom: 100,
              left: 80,
              right: 40
          };

          const chart = svg.append('g')
              .classed('display', true)
              .attr('transform', `translate(${margin.left},${margin.top})`);

          const chartWidth = width - margin.left - margin.right;
          const chartHeight = height - margin.top - margin.bottom
          this.plot(chart, chartWidth, chartHeight);

          return el.toReact();
      }

      render() {
        this.get_top_trackers()
          return this.drawChart();
      }
  }


export default BarChart;
