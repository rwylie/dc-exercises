import React, { Component } from 'react';
import HelloLi from './HelloLi.jsx';
import './Hello.css'
class HelloMessage extends Component {
  constructor (props) {
  super(props);
    this.state = {
    date: new Date(),
    people: [
      {id: 1, name: 'Paul'},
    {id: 2, name: 'Paulette'}
  ]
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
}

tick() {
  this.setState({date: new Date()});
}

handleClick(event, person) {
  if (person.selected) {
    person.selected = false;
  } else {
    person.selected = true;
  }

  this.setState({people: this.state.people});
}
  render () {
    return (
    <div>
    <h1>Hello {this.props.name}</h1>
    <h2> It is {this.state.date.toLocaleTimeString()}</h2>
    <ul>
    {this.state.people.map((p) =>
    <HelloLi item={p} key={p.id}
    callback={() => this.handleClick()}/>
  )}
    </ul>
    </div>
  )
}
}

export default HelloMessage;


// people: ['Paul', 'Paulette']
