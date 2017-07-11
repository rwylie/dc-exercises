import React, { Component } from 'react';

class HelloLi extends Component {
  render () {
    return (
      <li key={this.props.item.id}>
      <button onClick={(e) => this.handleClick(e, this.props.item)}>
      <span className={this.props.item.selected ? 'selected' : 'not'}>
      {this.props.item.name}
      </span>
      </button>
      </li>
    )
  }
}
