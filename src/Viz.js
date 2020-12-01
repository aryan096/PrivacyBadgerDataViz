import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import  BarChart from './BarChart';
import  Bubble from './Bubble';

var data = require('./data/data.json');

class Viz extends Component{
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


  get_top_trackers() {

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

get_total_num_trackers() {
  // This function returns the total number of trackers based on the info stored in the snitch_map
  // each key in the snitch map refers to the top level domain of a tracker
  var total_num = (Object.keys(data['snitch_map']).length);
  return total_num;
}

    // TODO: Function to get the names of the trackers for these top websites

    // TODO: Function to get total number of blocked trackers

    // TODO: Function to get total number of allowed trackers


render(){

  const tracker_list = this.get_top_trackers()
  console.log(tracker_list, " hi")

    return (

      <div className="container viz-container" style={{ width: "750px"}}>
        <div className="my-3">
        <h1>Let's breakdown your data!</h1><hr></hr><br></br>
        <Alert variant='danger'>
        We found a total of <b>{this.get_total_num_trackers()} trackers</b> throughout your browsing data.<br></br>
        Each tracker comes from a different top-level-domain.
        </Alert>
        <p>You probably have A LOT of trackers peeping your activity. We will first focus on the websites that track you the most.

        <br></br><br></br>

        The top 10 websites based on the number of trackers they had - </p>
        <div><BarChart /></div>

        <br></br><br></br>

        <p>Next, it might be useful to look at the list of trackers for each of these top tracking websites.</p>
        <h4 style={{marginTop: 20}}>What trackers were on these websites?</h4>

        <ul>
        {tracker_list.map(datas =>
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

          <br></br>
          <hr></hr>
          <br></br>
          <p>
          Something more interesting to look at is how these trackers look at you across
          websites. You can imagine how easy it would be to build a profile on you based on your
          browsing activity that a tracker might gather.
          </p>

          <Bubble/>
      </div>
      </div>

    );
}
}

export default Viz;
