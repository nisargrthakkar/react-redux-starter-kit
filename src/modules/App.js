import React, { Component } from 'react';   
import { Route } from 'react-router-dom';   
import './../css/style.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';   

import HomeViewContainer from './home/HomeViewContainer';
import AboutView from './about/AboutView';

class App extends Component {

    render() {
        return (
            <div className="App">
                <MuiThemeProvider>
                    <main>
                        <Route exact path="/" component={HomeViewContainer} />
                        <Route exact path="/about" component={AboutView} />
                    </main>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;

