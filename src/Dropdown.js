import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import  BarChart from './BarChart';
import onClickOutside from 'react-onclickoutside'


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


  getIndex(value) {
      const tracker = get_top_trackers()
      for(var i = 0; i < tracker.length; i++) {
          if(tracker[i][0] === value) {
              return i;
          }
      }
  }

  constructor(props) {
    super(props);

      this.state = {
        showMenu: false,
        index: -1,
      }
      this.closeMenu = this.closeMenu.bind(this);
      this.showMenu = this.showMenu.bind(this);
      this.showIt = this.showIt.bind(this);
    }

    handleClickOutside = (e) => {
      console.log('onClickOutside() method called')
    }

    showMenu(e) {
      var value = e.target.textContent;
      var index = this.getIndex(value)
      console.log(index, "index");
      this.setState({
        showMenu: true,
        index: index }, () => {
        console.log("outside index", this.state.index)
        console.log("REACHED");

      });
      console.log(this.state);
      console.log("outside index", index);

      }

      showIt(e){
        const tracker = get_top_trackers()
        const i = this.state.index
        console.log("hihuhuhgu", this.state.index);
        console.log("top trackers", tracker[this.state.index]);
        return tracker[i][1].map(line => (
           <ul className="element"><li style={{listStyle: 'circle'}}>{line}</li></ul>)
        );

      }


      /*return (index.map(line =>
      (<li style={{listStyle: 'circle'}}>{line}</li>)))*/

    closeMenu() {
       this.setState({ showMenu: false }, () => {
         document.removeEventListener('click', this.closeMenu);
       });

     }
     /*{this.state.showMenu ? (
     <ul><li>{datas[1].map(line =>
     (<li style={{listStyle: 'circle'}}>{line}</li>))}</li></ul>)
     : ( null )}*/
  render(){
    const tracker = get_top_trackers()
    return (
      <div className="flex-container">
      <ul>
      <div className="tracker-list"> {tracker.map(datas =>
          (<li>
            <button id="track" class="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
              type="button" style={{fontWeight: 600}}
              onClick={(this.showMenu)}>
              {datas[0]}
            </button>
            </li>))}</div> </ul>
            {this.state.showMenu ? <div className="tracker-list">{this.showIt()}</div>
            : ( null )}

        </div>
    );
  }
}

export default onClickOutside(Dropdown);
