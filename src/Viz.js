import React from "react";

function get_top_trackers() { 
  var data = require('./data/data.json');
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

function Viz() {

    // TODO: Things get fucked if there isn't already a data.json file in the data folder. FIX THIS 
    // get an array of top tracking websites with the number of trackers that were snitching to that website 
    try {
      var sorted_snitches_top = get_top_trackers();
    } catch(err){ 
      console.log(err)
    }
    console.log(sorted_snitches_top)

    // TODO: Function to get the names of the trackers for these top websites

    // TODO: Function to get total number of blocked trackers 

    // TODO: Function to get total number of allowed trackers 


    return (
      <div>
        <p>This is the second page.</p>
      </div>
    );

}

export default Viz;
