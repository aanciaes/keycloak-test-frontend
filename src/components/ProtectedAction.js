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

  protectedFunc = () => {
    axios.get('http://ec2-54-175-112-125.compute-1.amazonaws.com:3000/protected', {
      headers: {
        "Authorization" : "Bearer " + this.props.token
      }
    })
      .then((res) => {
        this.setState({response: res.statusText})
      }).catch((err) => {
      this.setState({response: err.toString()})
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
