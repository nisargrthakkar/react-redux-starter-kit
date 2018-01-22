import React, { Component, PropTypes } from 'react';  //eslint-disable-line
import { history } from '../../redux/store';
import RaisedButton from 'material-ui/RaisedButton';

class PostPageView extends Component {

  componentWillMount() {
    this.props.emptyPost();
  }

  render() {
    return (
      <div>
        <h1>Post Page </h1>
        <RaisedButton onClick={() => { this.props.getPostbyID(); }} label="Call API" primary={true} />
        <br />
        <br />
        <code>
          {JSON.stringify(this.props.post)}
        </code>
        <br />
        <br />
        <RaisedButton onClick={() => history.push('/')} label="Home" />
        <br />
        <br />
        <RaisedButton onClick={() => history.push('/about')} label="About Us" />
      </div>
    );
  }
}
export default PostPageView;
