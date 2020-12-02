import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import  BarChart from './BarChart';



var data = require('./data/data.json');

const get_top_trackers = () => {

  var snitches = {};

  // Variable for Top __ websites with trackers on different websites
  var top_num = 10

  for (let tracker in data['snitch_map']) {
    var websites = data['snitch_map'][tracker];
    for (var i = 0; i < websites.length; i++) {
      if (websites[i] in snitches){
        snitches[websites[i]].push(tracker)
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

class Dropdown extends Component{
  constructor() {
    super();

      this.state = {
        showMenu: false,
      }
      this.closeMenu = this.closeMenu.bind(this);
      this.showMenu = this.showMenu.bind(this);
    }

    showMenu(event) {
      event.preventDefault();

      this.setState({ showMenu: true }, () => {
        document.addEventListener('click', this.closeMenu);
      });
    }

    closeMenu() {

       this.setState({ showMenu: false }, () => {
         document.removeEventListener('click', this.closeMenu);
       });

     }

  render(){
    const tracker = get_top_trackers()
    console.log(tracker, " hi")

    return (
      <div>
      <ul>
      {tracker.map(datas =>
          (<li>
            <button class="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              type="button" style={{fontWeight: 600}}
              onClick={this.showMenu}>
              {datas[0]}
            </button>
            {this.state.showMenu ? (
            <ul><li>{datas[1].map(line =>
            (<li style={{listStyle: 'circle'}}>{line}</li>))}</li></ul>)
            : ( null )}
          </li>))}
        </ul>
        </div>
    );
  }
}

export default Dropdown;
