import React,{Component} from 'react';



var data = require('./data/data.json');
const social = data.snitch_map;

class Viz extends Component{

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
    var sorted_snitches_top = items.slice(0, top_num)

    return sorted_snitches_top;
  }

  get_total_num_trackers() { 
    // This function returns the total number of trackers based on the info stored in the snitch_map
    // each key in the snitch map refers to the top level domain of a tracker

    var total_num = (Object.keys(data['snitch_map']).length);
    return total_num;
  }
 


  Vizu() {

    // TODO: Things get fucked if there isn't already a data.json file in the data folder. FIX THIS
    // get an array of top tracking websites with the number of trackers that were snitching to that website
    try {
      var sorted_snitches_top = this.get_top_trackers();
    } catch(err){
      console.log(err)
    }
    console.log(sorted_snitches_top)
  }

    // TODO: Function to get the names of the trackers for these top websites

    // TODO: Function to get total number of blocked trackers

    // TODO: Function to get total number of allowed trackers


render(){
  const v = this.get_top_trackers()
  console.log(this.get_total_num_trackers())
    return (
      <div className="container" style={{ width: "600px" }}>
        <div className="my-3">
        <h1> Vizualization {this.Vizu()}</h1>
        <h4>This is our breakdown of your data! </h4>
        <ul>{v.map(datas => (<li> {datas[1]}-{datas[0]}</li>))}</ul>
      </div>
      </div>

    );
}
}

export default Viz;
