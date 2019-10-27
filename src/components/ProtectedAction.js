import React from "react";
import axios from "axios";


export default class ProtectedAction extends React.Component {
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
    this.setState({response: r});
    setTimeout(() => this.setState({response: null}), 5000);
  };

  protectedFunc = () => {
    axios.get('http://ec2-13-58-116-147.us-east-2.compute.amazonaws.com:3000/protected', {
      headers: {
        "Authorization" : "Bearer " + this.props.token
      }
    })
      .then((res) => {
        this.setResponse(res.statusText);
      }).catch((err) => {
        this.setResponse(err.toString());
    })
  };

  render() {
    return (
      <div>
        <button onClick={this.protectedFunc}>Protected Operation</button>
        <p><b>GET /protected</b></p>
        {this.renderMessage()}
      </div>
    )
  }
}
