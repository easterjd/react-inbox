import React, { Component } from 'react';
import Toolbar from './components/toolbar.js'
import MessageList from './components/message-list.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [
        {
          "id": 1,
          "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
          "read": false,
          "starred": true,
          "labels": ["dev", "personal"]
        },
        {
          "id": 2,
          "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
          "read": false,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 3,
          "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
          "read": false,
          "starred": true,
          "labels": ["dev"]
        },
        {
          "id": 4,
          "subject": "We need to program the primary TCP hard drive!",
          "read": true,
          "starred": false,
          "selected": true,
          "labels": []
        },
        {
          "id": 5,
          "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
          "read": false,
          "starred": false,
          "labels": ["personal"]
        },
        {
          "id": 6,
          "subject": "We need to back up the wireless GB driver!",
          "read": true,
          "starred": true,
          "labels": []
        },
        {
          "id": 7,
          "subject": "We need to index the mobile PCI bus!",
          "read": true,
          "starred": false,
          "labels": ["dev", "personal"]
        },
        {
          "id": 8,
          "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
          "read": true,
          "starred": true,
          "labels": []
        }
      ]
    }
  }

  starChange = (id) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.id === id) {
        mess.starred = !mess.starred
      }
      return mess
    })
    this.setState({messages: newMessages})
  }

  select = (id) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.id === id) {
        if (!mess.selected) mess.selected = true
        else mess.selected = !mess.selected
      }
      return mess
    })
    this.setState({messages: newMessages})
  }

  selectAll = () => {
    const allMess = this.state.messages.every(mess => {
      return mess.selected === true
    })
    const newMessages = this.state.messages.map(mess => {
      if (!mess.selected) mess.selected = true
      else mess.selected = allMess ? false : true
      return mess
    })
    this.setState({messages: newMessages})
  }

  readMessage = (id) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.id === id) {
        mess.read = true
      }
      return mess
    })
    this.setState({messages: newMessages})
  }

  readBatch = () => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.selected) mess.read = true
      return mess
    })
    this.setState({messages:newMessages})
  }

  unReadBatch = () => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.selected) mess.read = false
      return mess
    })
    this.setState({messages:newMessages})
  }

  applyLabel = (e) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.selected) {
        if (!mess.labels.includes(e.target.value)) mess.labels.push(e.target.value)
      }
      return mess
    })
    this.setState({messages:newMessages})
  }

  removeLabel = (e) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.selected) {
        if (mess.labels.includes(e.target.value)) {
          const index = mess.labels.indexOf(e.target.value)
          mess.labels.splice(index, 1)
          return mess
        }
      }
      return mess
    })
    this.setState({messages:newMessages})
  }

  deleteMessage = () => {
    const newMessages = this.state.messages.filter(mess => !mess.selected)
    this.setState({messages: newMessages})
  }

  render() {
    return (
      <div className="container">
        <Toolbar messages={this.state.messages} selectAll={this.selectAll} readBatch={this.readBatch} unReadBatch={this.unReadBatch} applyLabel={this.applyLabel} removeLabel={this.removeLabel} deleteMessage={this.deleteMessage}/>
        <MessageList messages={this.state.messages} starChange={this.starChange} select={this.select} readMessage={this.readMessage}/>
      </div>
    );
  }
}

export default App;
