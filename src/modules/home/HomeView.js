import React, { Component } from 'react';  //eslint-disable-line
import RaisedButton from 'material-ui/RaisedButton';

class HomeView extends Component {

  /**
   * Render Header
   * @return {JSX} Rendered Home
   */

  render() {
    return (
      <div>
        <h1>Home</h1>
        <img src={require('../../images/logo.svg')} className="App-logo" alt="logo" />
        <p>Count: {this.props.count}</p>
        <RaisedButton onClick={() => { this.props.increment(); }} label="Increment" primary={true} />
        <br />
        <br />
        <RaisedButton onClick={() => { this.props.decrement(); }} label="Decrement" primary={true} />
      </div>
    );
  }
}
export default HomeView;
