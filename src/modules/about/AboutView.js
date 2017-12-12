import React, { Component } from 'react';
import { history } from '../../redux/store';
import RaisedButton from 'material-ui/RaisedButton';

class AboutView extends Component {

    render() {
        return (
            <div>
                <h1>About Page</h1>
                <p>This About Page</p>
                <div>
                    <RaisedButton onClick={() => history.push('/')} label="Home" />
                </div>
            </div>
        );
    }
}
export default AboutView;
