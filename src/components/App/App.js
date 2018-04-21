import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import AddReflection from './AddReflection/AddReflection.js';
import ViewReflection from './ViewReflection/ViewReflection.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import 'typeface-roboto';

import { createMuiTheme } from 'material-ui/styles';
import blue100 from 'material-ui/colors/blue';
import grey from 'material-ui/colors/grey'; 


const theme = createMuiTheme({
  palette: {
    primary: blue100,
    secondary: grey
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reflector</h1>
        </header>

          <nav>

                <Link to="/addreflection"> Add New Reflection </Link>

                <Link to="/viewreflection"> View Reflections </Link>


          </nav>

          <br />

          <Route exact path="/" component={AddReflection} />
          <Route path="/addreflection" component={AddReflection} />
          <Route path="/viewreflection" component={ViewReflection} />

      </div>
      </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
