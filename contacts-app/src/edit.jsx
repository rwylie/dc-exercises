import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from './contacts.css';
import MyForm from './myform';
import database, {User} from './fsociety';

class Edit extends Component {
  constructor(props) {
    super(props);
//gets the contacts from localStorage. **change to Firebase
    var contacts = database.contacts;
    contacts = JSON.parse(contacts);

    console.log(props.match.params.index);
    //gets the contact based on the index
    this.state = {
      contact: contacts[props.match.params.index]
    };
  }

//?how to change the form from Add contact to Edit?
  render() {
    return (
      <div>
        <MyForm title="Edit Contact" contact={this.state.contact} index={this.props.match.params.index}/>
      </div>
    )
  }
}
export default Edit
