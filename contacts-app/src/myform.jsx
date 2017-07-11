import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import styles from './contacts.css';

import database, {User} from './fsociety';

//function to alphabetically sort contacts list
function compare(a, b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

class MyForm extends Component {
  constructor(props) {
    super(props);
    // creates contacts as an array in localStorage *** cgabged localStorage to firebase "database"
    var contacts = database.contacts || '[]';
    contacts = JSON.parse(contacts);

    //if it's on contact then update/edit, keep information in form
    if (props.contact) {
      this.state = props.contact;
      this.state.contacts = contacts;
      this.action = 'update';

    }
    //if not then reset the form
    else {
      this.state = {
        name: '',
        email: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        isOpened: false,
        contacts: contacts
      };

      this.state.contacts.sort(compare);
    }
  }


 update_state (event, key) {
   console.log(event.target.value);
   console.log(event.target);
   this.setState({[key]: event.target.value});
   var new_state = {};
   new_state[key] = event.target.value;
   this.setState({new_state});
   <input type="text" value={this.state.name}
   onChange={event => this.update_name(event)}/>
}

//handles the submit button, calls the handleAddContact and then resets form to null
handleSubmit(event) {
  console.log('submitted: ' + this.state);
  database.ref('contacts/' + User.user.uid).set({  //store some contacts under user id
    paul: {name: "Paul B"},
    jim: {name: "Jim"},  //save to the database for firebase, tracking it by userid
});
  event.preventDefault();

  this.handleAddContact();
  if (this.action != 'update') {
    this.setState({name: '', email: '', phone_number: '', address: '', city: '', state: '', zip: ''});
  }
}

//adds a contact by pushing user information to this.state.contacts
handleAddContact = () => {
  //if it's an edit, don't push to the contacts array.
  if (this.action == 'update') {
    this.state.contacts[this.props.index] = {
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      //sets isOpened to false, contact info is hidden
      isOpened: false
    };

  } else {
    //pushes to contacts if it's not an edit
    this.state.contacts.push({
      name: this.state.name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      //sets isOpened to false, contact info is hidden
      isOpened: false
    });
  }

  this.state.contacts.sort(compare);
  this.setState({ contacts: this.state.contacts});

  database.contacts = JSON.stringify(this.state.contacts);
}

//contact is set to false, if toggleState is used contact information is shown
toggleState (event, contact) {
 contact.isOpened = !contact.isOpened;
 this.setState({contacts: this.state.contacts });
}

//deletes a contact from contacts
doDelete (index) {
  var contacts = database.contacts || '[]';
  contacts = JSON.parse(contacts);

  //deletes from local storage
  contacts.splice(index, 1);
  database.contacts = JSON.stringify(contacts);

  //deletes from interface
  this.state.contacts.splice(index, 1);
  this.setState({contacts: this.state.contacts });
}

//renders the AppBar and the contact form using material-ui
  render() {
    return (
      <div>
       <AppBar title="Awesome"
   />
       <form onSubmit={event => this.handleSubmit(event)}>

        <Card className="md-card">
          <CardTitle title="Add Contact Form"/>
            <CardText>
               <TextField floatingLabelText="Your Name"
                 value={this.state.name}
                 onChange={event => this.update_state(event, 'name')}/>
              <TextField floatingLabelText="e-mail"
                value={this.state.email}
                onChange={event => this.update_state(event, 'email')}
              />
              <TextField floatingLabelText="phone number"
                value={this.state.phone_number}
                onChange={event => this.update_state(event, 'phone_number')}
              />
              <TextField floatingLabelText="address"
                value={this.state.address}
                onChange={event => this.update_state(event, 'address')}
              />
              <TextField floatingLabelText="city"
                value={this.state.city}
                onChange={event => this.update_state(event, 'city')}
              />
              <TextField floatingLabelText="state"
                value={this.state.state}
                onChange={event => this.update_state(event, 'state')}
              />
              <TextField floatingLabelText="zip-code"
                value={this.state.zip}
                onChange={event => this.update_state(event, 'zip')}
              />


            </CardText>
          <CardActions>
           <RaisedButton type="submit" label='submit' primary={true}/>
          </CardActions>
        </Card>
       </form>



          {this.state.contacts.map((c, index) => {
            return (

              <ul>
                <li onClick={event => this.toggleState(event)} >{"Name: " + c.name + " "}</li>
                  {
                    c.isOpened ?
                    <div>
                      <li>{"Email: " + c.email + " "}</li>
                      <li>{"Phone Number: " + c.phone_number + " "}</li>
                      <li>{"Address: " + c.address + " "}</li>
                      <li>{"City: " + c.city + " "}</li>
                      <li>{"State: " + c.state + " "}</li>
                      <li>{"Zip-code: " + c.zip + " "}</li>
                    </div>
                    :
                    null
                  }
                  {"Show Contact Information: "} <input type="checkbox"
                  checked={c.isOpened} onClick={event => this.toggleState(event, c)} /> <br/>
                  <FlatButton label="Delete" primary={true}  onClick={() => this.doDelete(index)}/>
                  <FlatButton label="Edit" primary={true} href={"/edit/" + index}/>

              </ul>
            )
          })}


      </div>
    );
  }
}

export default MyForm
