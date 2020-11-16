import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import * as D3 from 'd3';
import { useHistory } from 'react-router'


class App extends Component{

  constructor(props) {
      super(props);
        this.state = {
          isDisabled: false,
          selectedFile: null
        }
    }

    onChangeHandler=event=>{
       this.setState({
         selectedFile: event.target.files[0],
         loaded: 0,
       })
     }

     onClickHandler = () => {
       this.setState({
         isDisabled: true
          });
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8000/upload", data, {
           // receive two    parameter endpoint url ,form data
       })
     .then(res => { // then print response status
         console.log(res.statusText)
      })
     }


  render() {
  return (

      <Router>
    <div className="container" style={{ width: "600px" }}>
      <div className="my-3">
        <h1>Data Privacy </h1>
          <p> Welcome! Have you ever felt that the internet knows too much about you?
          Or have you felt ads that have just been too invasive? We are here to help you
          learn what the internet knows about you!
          Upload your tracking data from Privacy Badger and we will find the answers
          you're looking for
          </p>
        <h4>Choose file to upload</h4>
    </div>

    <div class="container">
    	<div class="row">
    	  <div class="col-md-6">
    	      <form method="post" action="#" id="#">
              <div class="form-group files">
              <label>Upload Your File </label>
              <input type="file" name="file" onChange={this.onChangeHandler}/>
              </div>
            </form>
            </div>
          <button disabled={this.state.isDisabled} type="button"
          class="btn btn-success btn-block" onClick={this.onClickHandler}> Upload </button>
          <button type="button" class="btn btn-success btn-block" style={{backgroundColor: '#FFFFFF', borderColor: 'white'}}>
          <a href="/viz"> <button type="button" class="btn btn-success btn-block"
          style={{backgroundColor: 'blue',  borderColor: 'blue'}}> Show Viz!</button></a></button>
        </div>
      </div>
    </div>
    </Router>
  );
}}

export default App;
