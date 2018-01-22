import React, { Component } from 'react';  //eslint-disable-line
import { history } from '../../redux/store';
import RaisedButton from 'material-ui/RaisedButton';

class HomeView extends Component {

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
        <br />
        <br />
        <RaisedButton onClick={() => history.push('/about')} label="About Us" />
        <br />
        <br />
        <RaisedButton onClick={() => history.push('/postpage')} label="Call API PAGE" />
      </div>
    );
  }
}
export default HomeView;
