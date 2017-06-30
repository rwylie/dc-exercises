import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import logo from './logo.svg';
//import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal200} from 'material-ui/styles/colors';
import MyForm from './myform';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Edit from './edit';

const Home = () => (<h2>Home Page</h2>);   //quick component

const theme = getMuiTheme({
  palette: {primary1Color: teal200}
});

  // route of /edit/:index is based on the index of the contacts list
class App extends Component {
  render() {
    return (

      <MuiThemeProvider muiTheme={theme}>

        <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/form">Form</Link></li>
          </ul>
          <Route exact path="/" component={Home}/>
          <Route path="/form" component={MyForm}/>

          <Route path="/edit/:index" component={Edit}/>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
