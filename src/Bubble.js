import React, { Component } from "react";
import * as d3 from "d3";
import "./App.css";
import BubbleChart from '@weknow/react-bubble-chart-d3';

var data = require('./data/data.json');
var optout = require('./optoutlinks.js')

class Bubble extends Component {

  sort_trackers(obj){
    // convert object into array
  	var sortable=[];
  	for(var key in obj)
  		if(obj.hasOwnProperty(key))
  			sortable.push([key, obj[key]]); // each item is an array in format [key, value]

  	// sort items by value
  	sortable.sort(function(a, b){
  	  return b[1]-a[1]; // compare numbers
  	});
  	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }
  // colors for our color scheme
  getRandomColor(){
    let colorValues = ["#44015452", "#440154b0", "#74add4a3",
    "#3e4989", "#31688e", "#26828e", "#1f9e89", "#35b779", "#6ece58",
    "#b5de2b", "#fde725cf", "#fd9d25", "#25cbfd", "#e0793cb8"];
  return colorValues[Math.floor(Math.random() * colorValues.length)];
  }

  get_top_10_trackers(){
    var snitch_map = data['snitch_map']; // get snitch_map
    var output_list = [];

    // we want to find the keys that have the most values
    for(let tracker in snitch_map){
      snitch_map[tracker] = snitch_map[tracker].length;
    }
    snitch_map = this.sort_trackers(snitch_map);

    for(let i = 0; i < 14; i++){
      if(snitch_map[i]){
        let new_entry = {label:snitch_map[i][0], value:snitch_map[i][1], color: this.getRandomColor()};
        output_list.push(new_entry);
      } else {
        break;
      }
    }

    return output_list;
  }

  bubbleClick(label){
    // This function is executed whenever a bubble is clicked. It looks through
    // our optoutlink database and opens it if it exists. Otherwise, it just
    // opens the label domain
    console.log(label, ' bubble was clicked...')
    var optoutlinks = optout['default'];

    for (let mapping in optoutlinks){
      if (optoutlinks[mapping]['Name'] == label){
        window.open(optoutlinks[mapping]['Link']);
        return 0;
      }
    }
    window.open('https://' + label, '_blank');
    return 0;
  }

  render(){
    var trackers = this.get_top_10_trackers();
    return(
      <div class="tracker_bubbles">
      <BubbleChart
        graph= {{
          zoom: 0.80,
          offsetX: 0.05,
          offsetY: -0.01,
          }}
          width={800}
          height={700}
          padding={1} // optional value, number that set the padding between bubbles
          showLegend={false} // optional value, pass false to disable the legend.
          legendPercentage={20} // number that represent the % of with that legend going to use.
          legendFont={{
            family: 'Arial',
            size: 12,
            color: '#000',
            weight: 'bold',
          }}
          valueFont={{
            family: 'Arial',
            size: 18,
            color: '#fff',
            weight: 'bold',
          }}
          labelFont={{
            family: 'Arial',
            size: 12,
            color: '#fff',
            weight: 'bold',
          }}
          //Custom bubble/legend click functions such as searching using the label, redirecting to other page
          bubbleClickFun={this.bubbleClick}
          data={trackers}
        />
        </div>
    );
  }
}

export default Bubble;
