import React from "react";
import axios from "axios";

export default class AdminAction extends React.Component {
  state = {
    response: null
  };

  renderMessage = () => {
    if (this.state.response) {
      return (<div>{this.state.response}</div>)
    } else {
      return null;
    }
  };

  setResponse = (r) => {
    this.setResponse({response: r})
  };

  adminFunc = () => {
    axios.get('http://ec2-54-175-112-125.compute-1.amazonaws.com:3000/protectedWithRole')
      .then((res) => {
        this.setState({response: res.statusText})
      }).catch((err) => {
      this.setState({response: err.toString()})
    })
  };

  render() {
    return (

      <div>
        <button onClick={this.adminFunc}>Role Based Protected Resource</button>
        <p><b>POST /protectedWithRole</b></p>
        {this.renderMessage()}
      </div>
    )
  }
}
