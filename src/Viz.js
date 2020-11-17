import React from "react";
import data from "./data/data.json"


function get_top10_trackers() { 

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

  var top_trackers_dict = {}

  for (let snitch in sorted_snitches_top) { 
    var website = sorted_snitches_top[snitch][0]
    var count = sorted_snitches_top[snitch][1]
    top_trackers_dict[website] = count;
  }

  return top_trackers_dict;
}

function Viz() {

    var top_trackers_dict = get_top10_trackers();
    console.log(top_trackers_dict)

    return (
      <div>
        <p>This is the second page.</p>
      </div>
    );

}

export default Viz;
