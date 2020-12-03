import React,{Component} from 'react';
import "./App.css";
import * as d3 from 'd3';
import Alert from 'react-bootstrap/Alert'
import  BarChart from './BarChart';
import onClickOutside from 'react-onclickoutside'
import Tab from 'react-bootstrap/Tab'
import Col from 'react-bootstrap/Col'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'

var data = require('./data/data.json');

 function get_top_trackers(get_number=true) {

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


class TrackerTab extends Component{

  render(){
    var trackers_list = get_top_trackers()
    for(let thing in trackers_list){
      trackers_list.map(datas=>console.log(datas));
    }
    return (
      <div className="flex-container">
        <Tab.Container id="tracker-tabs" defaultActiveKey="first">
          <Row class="tracker-list-box">
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Website</Nav.Link>
                </Nav.Item>
                {trackers_list.map(datas =>
                  <Nav.Item>
                    <Nav.Link eventKey={datas[0]}>{datas[0]}</Nav.Link>
                  </Nav.Item>
                )}
              </Nav>
            </Col>
            <Col sm={8}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <p> Click on a tab to view a scrollable list of the trackers on that website!
                  </p>
                </Tab.Pane>
                {trackers_list.map(datas =>
                  <Tab.Pane eventKey={datas[0]}>
                    <ol class="tracker-list">
                      {datas[1].map(tracker =>
                        <li>{tracker}</li>
                      )}
                    </ol>
                  </Tab.Pane>
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}

export default TrackerTab;