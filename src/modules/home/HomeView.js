import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../redux/store';
import RaisedButton from 'material-ui/RaisedButton';
import logo from '../../images/logo.svg';

class HomeView extends Component {

    static propTypes = {
        value: PropTypes.any
    };

    render() {
        return (
            <div>
                <h1>Home</h1>
                <img src={logo} className="App-logo" alt="logo" />
                <p>Count: {this.props.count}</p>
                <RaisedButton onClick={this.props.increment} label="Increment" primary={true} />
                <br />
                <br />
                <RaisedButton onClick={this.props.decrement} label="Decrement" primary={true} />
                <br />
                <br />
                <RaisedButton onClick={() => history.push('/about')} label="About Us" />
            </div>
        );
    }
}
export default HomeView;
