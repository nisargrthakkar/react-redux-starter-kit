import React, { Component, PropTypes } from 'react';  //eslint-disable-line
import RaisedButton from 'material-ui/RaisedButton';

class PostPageView extends Component {

  componentWillMount() {
    this.props.emptyPost();
  }

  /**
   * Render Header
   * @return {JSX} Rendered Post Page
   */

  render() {
    return (
      <div>
        <h1>Post Page </h1>
        <RaisedButton onClick={() => { this.props.getPostbyID(); }} label="Call API" primary={true} />
        <br />
        <br />
        <p> API response : </p>
        <code>
          {JSON.stringify(this.props.post)}
        </code>
      </div>
    );
  }
}
export default PostPageView;
