import React, { Component } from 'react';  //eslint-disable-line
import { history } from '../../redux/store';
import RaisedButton from 'material-ui/RaisedButton';

class AboutView extends Component {

  render() {
    return (
      <div>
        <h1>About Page</h1>
        <div>
          <RaisedButton onClick={() => history.push('/')} label="Home" />
          <br />
          <br />
          <RaisedButton onClick={() => history.push('/postpage')} label="Call API PAGE" />
        </div>
      </div>
    );
  }
}
export default AboutView;
