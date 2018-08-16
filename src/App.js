import React, { Component } from 'react';
import Toolbar from './components/toolbar.js'
import Compose from './components/Compose.js'
import MessageList from './components/message-list.js'
import Axios from 'axios';
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
      ],
      selected: null,
      compose: false
    }
  }

  async componentDidMount() {
    this.getMessages()
  }

  async getMessages () {
    const selected = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.get('http://localhost:8082/api/messages')
    const newMessages = response.data.map(mess => {
      if (selected.includes(mess.id)) {
        mess.selected = true
      } else {
        mess.selected = false
      }
      return mess
    })
    this.setState({messages: newMessages, selected: this.state.selected, compose: false})
  }

  starChange = async (id) => {
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command: 'star'})
    if (response) this.getMessages()
  }

  select = async (id) => {
    const newMessages = this.state.messages.map(mess => {
      if (mess.id === id) {
        if (!mess.selected) mess.selected = true
        else mess.selected = !mess.selected
      }
      return mess
    })
    this.setState({messages: newMessages, selected: this.state.selected, compose: false})
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
    this.setState({messages: newMessages, selected: this.state.selected, compose: false})
  }

  readMessage = async (id) => {
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [id], command: 'read', read: true})
    if (response) this.getMessages()
    const newSelect = id === this.state.selected ? null : id
    this.setState({messages: this.state.messages, selected: newSelect, compose: this.state.compose})
  }

  readBatch = async () => {
    const ids = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [...ids], command: 'read', read: true})
    if (response) this.getMessages()
  }

  unReadBatch = async () => {
    const ids = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [...ids], command: 'read', read: false})
    if (response) this.getMessages()
  }

  applyLabel = async (e) => {
    const ids = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [...ids], command: 'addLabel', label: e.target.value})
    if (response) this.getMessages()
  }

  removeLabel = async (e) => {
    const ids = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [...ids], command: 'removeLabel', label: e.target.value})
    if (response) this.getMessages()
  }

  deleteMessage = async () => {
    const ids = this.state.messages.filter(mess => mess.selected === true).map(mess => mess.id)
    const response = await Axios.patch('http://localhost:8082/api/messages', {messageIds: [...ids], command: 'delete'})
    if (response) this.getMessages()
  }

  toggleCompose = () => {
    this.setState({messages: this.state.messages, selected: this.state.selected, compose: !this.state.compose})
  }

  sendMessage = async ({subject, body}) => {
    let response = await Axios.post('http://localhost:8082/api/messages', {subject, body})
    console.log(response)
    if (response) {
      this.setState({
        messages: [...this.state.messages, response.data],
        selected: this.state.selected,
        compsoe: this.state.compose
      })
    }
    this.toggleCompose()
  }

  render() {
    return (
      <div className="container">
        <Toolbar messages={this.state.messages} selectAll={this.selectAll} readBatch={this.readBatch} unReadBatch={this.unReadBatch} applyLabel={this.applyLabel} removeLabel={this.removeLabel} deleteMessage={this.deleteMessage} toggleCompose={this.toggleCompose}/>
        {this.state.compose ? <Compose send={this.sendMessage} /> : ''}
        <MessageList messages={this.state.messages} starChange={this.starChange} select={this.select} readMessage={this.readMessage} selected={this.state.selected}/>
      </div>
    );
  }
}

export default App;
