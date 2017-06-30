import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from './contacts.css';
import MyForm from './myform';

class Edit extends Component {
  constructor(props) {
    super(props);
//gets the contacts from localStorage.
    var contacts = localStorage.contacts;
    contacts = JSON.parse(contacts);

    console.log(props.match.params.index);
    //gets the contact based on the index
    this.state = {
      contact: contacts[props.match.params.index]
    };
  }


  render() {
    return (
      <div>
        <MyForm contact={this.state.contact} index={this.props.match.params.index}/>
      </div>
    )
  }
}
export default Edit
