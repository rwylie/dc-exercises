import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import styles from './contacts.css'

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
    this.state = {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      city: '',
      state: '',
      zip: '',

      contacts: [{
      name: 'Ronda',
      email: 'something@jkl.com',
      phone_number: '0987654323',
      address: '123 somerihtn',
      city: 'boo',
      state: 'ban',
      zip: 'numbers',
    },
      {
      name: 'Abbie',
      email: 'something@jkl.com',
      phone_number: '0987654323',
      address: '123 somerihtn',
      city: 'boo',
      state: 'ban',
      zip: 'numbers',
  }]


    };

    this.state.contacts.sort(compare);
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


handleSubmit(event) {
  console.log('submitted: ' + this.state);
  event.preventDefault();

  this.handleAddContact();
  this.setState({name: '', email: '', phone_number: '', address: '', city: '', state: '', zip: ''});
}

handleAddContact = () => {
  this.state.contacts.push({
    name: this.state.name,
    email: this.state.email,
    phone_number: this.state.phone_number,
    address: this.state.address,
    city: this.state.city,
    state: this.state.state,
    zip: this.state.zip

  });
  this.state.contacts.sort(compare);
  this.setState({ contacts: this.state.contacts});
}

  render() {
    return (
      <div>
       <AppBar title="My Awesome" />
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


          {this.state.contacts.map((c) => {
            return (
              <ul>
                  <li>{"Name: " + c.name + " "}</li>
                  <li>{"Email: " + c.email + " "}</li>
                  <li>{"Phone Number: " + c.phone_number + " "}</li>
                  <li>{"Address: " + c.address + " "}</li>
                  <li>{"City: " + c.city + " "}</li>
                  <li>{"State: " + c.state + " "}</li>
                  <li>{"Zip-code: " + c.zip + " "}</li>
              </ul>

            )
          })}


      </div>
    );
  }
}

export default MyForm
