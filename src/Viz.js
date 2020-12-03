import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import  BarChart from './BarChart';
import  Bubble from './Bubble';
import  TrackerTab from './TrackerTab';

var data = require('./data/data.json');


class Viz extends Component{

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
    return (
      <div className="container viz-container" style={{ width: "750px"}}>

        <div className="viz-page">

          <h1 class="header">Let's breakdown your data!</h1><hr></hr><br></br>

          <Alert variant='danger'>
          We found a total of <b>{this.get_total_num_trackers()}
          </b> trackers throughout your browsing data.<br></br>
          Each tracker comes from a different top-level-domain.
          </Alert>
          <br></br>

          <h4 class="header" style={{marginBottom: 20}}>What websites track you the most?</h4>
          <p>You probably have A LOT of trackers peeping your activity.
          We will first focus on the websites that track you the most.
          <br></br><br></br>

          The top 10 websites based on the number of trackers they had - </p>

          <div><BarChart /></div>

          <br></br>
          <hr></hr>
          <br></br>

          <h4 class="header" style={{marginBottom: 20}}>
          What trackers were on these websites?</h4>

          <p>It might be useful to look at the list of trackers for each
          of these top tracking websites. Use the tab view below to see who was tracking
          you on these websites.</p>

          <div> <TrackerTab/> </div>

          <br></br>
          <hr></hr>
          <br></br>
          <h4 class="header" style={{marginBottom: 20}}>
          Which trackers were most prevalent?</h4>
          <p>
          What about the prevalence of trackers? Which ones appear most in your browsing?
          The following bubble chart shows the top 10 trackers based on their prevalence in
          your browsing. Clicking the bubbles will take you to the website of these trackers
          where you can find more information.
          </p>
          <Alert class="bubble_alert" variant={'info'}>
            Clicking a bubble will take you to the opt-out page of that tracker! (if it exists in our database)
          </Alert>
        <div><Bubble/></div>

        <hr></hr>
        <p>We hope this helped you understand who is tracking you and where. If you didn't do so, consider
        opting-out of your common trackers!</p>
      </div>
      </div>

    );
  }
}

export default Viz;
