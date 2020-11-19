import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import  BarChart from './BarChart';

var data = require('./data/data.json');

class Viz extends Component{

  get_top_trackers() {
    var snitches = {};

    // Variable for Top __ websites with trackers on different websites
    var top_num = 10

    for (let tracker in data['snitch_map']) {
      var websites = data['snitch_map'][tracker];
      for (var i = 0; i < websites.length; i++) {
        if (websites[i] in snitches){
          snitches[websites[i]] += tracker
        } else {
          snitches[websites[i]] = [tracker];
        }
      }
    }

    // Create items array
    var items = Object.keys(snitches).map(function(key) {
      return [key, snitches[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1].length - first[1].length;
    });

    // Create a new array with only the first top_num items
    var sorted_snitches_top = items.slice(0, top_num)
    return sorted_snitches_top;
  }

  get_total_num_trackers() { 
    // This function returns the total number of trackers based on the info stored in the snitch_map
    // each key in the snitch map refers to the top level domain of a tracker

    var total_num = (Object.keys(data['snitch_map']).length);
    return total_num;
  }
 
  onClick(){

  }
  
render(){

  // This will return the top websites with an array of trackers for each 
  const tracker_list = this.get_top_trackers()
  
  console.log(tracker_list)
    return (

      <div className="container" style={{ width: "600px" }}>
        <div className="my-3">
        <h1> Vizualization</h1>
        <h4>This is our breakdown of your data! </h4>
        <p>Your top 10 trackers are: </p>
        <div><BarChart /></div>
        <ul> Num : Name {tracker_list.map(datas =>
          (<li> <button class="btn btn-default dropdown-toggle" data-toggle="dropdown"
          type="button">{datas[0]}</button></li>))}</ul>
      </div>
      </div>

    );
} 
}
export default Viz;
