import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'
import axios from 'axios'


class App extends Component {
  constructor() {
    super()

    this.state = {
      messages: [{
          "id": '',
          "subject": '',
          "read":false, 
          "starred":false, 
          "labels": []
        }]
      // [ 
      //   {
      //     "id": 1,
      //     "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
      //     "read": false,
      //     "starred": true,
      //     "labels": ["dev", "personal"]
      //   },
      //   {
      //     "id": 2,
      //     "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
      //     "read": false,
      //     "starred": false,
      //     "selected": true,
      //     "labels": []
      //   },
      //   {
      //     "id": 3,
      //     "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
      //     "read": false,
      //     "starred": true,
      //     "labels": ["dev"]
      //   },
      //   {
      //     "id": 4,
      //     "subject": "We need to program the primary TCP hard drive!",
      //     "read": true,
      //     "starred": false,
      //     "selected": true,
      //     "labels": []
      //   },
      //   {
      //     "id": 5,
      //     "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
      //     "read": false,
      //     "starred": false,
      //     "labels": ["personal"]
      //   },
      //   {
      //     "id": 6,
      //     "subject": "We need to back up the wireless GB driver!",
      //     "read": true,
      //     "starred": true,
      //     "labels": []
      //   },
      //   {
      //     "id": 7,
      //     "subject": "We need to index the mobile PCI bus!",
      //     "read": true,
      //     "starred": false,
      //     "labels": ["dev", "personal"]
      //   },
      //   {
      //     "id": 8,
      //     "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
      //     "read": true,
      //     "starred": true,
      //     "labels": []
      //   }
      // ]
    }

  }

  componentDidMount() {
    this.getMessages()
  }

  getMessages = async () => {
    const res = await axios.get('http://localhost:8082/api/messages')
    console.log(res.data)
    this.setState({
      messages: res.data
    })
  }

  selectMessage = (id) => {
    const newMsg = this.state.messages.map((m) => {
      if(m.id === id) m.selected =!m.selected
        return m
    })
      
    this.setState({
      messages: newMsg
    })

  }
  

  starMessage = (id) => {
    const newMsg = this.state.messages.map((m) => {
      if(m.id === id) m.starred = !m.starred
      return m
    })
    this.setState({
      messages: newMsg
    })
  }


  selectAll = () => {
    const allMessages = this.state.messages.every(message => message.selected === true)

    const highlightedMsgs = this.state.messages.map(message => {
      allMessages ? delete message.selected : message.selected = true
      return message;
    });

    this.setState({
      messages: highlightedMsgs
    })
  }

  markReadStatus = () => {
    const readMsg = this.state.messages.map((m) => {
      if (m.selected === true) {
        m.read = true
        m.selected = false
      }
        return m
    })
    console.log('READMSG',readMsg)
    this.setState({
      messages: readMsg
    })

  }

  markUnReadStatus = () => {
    const readMsg = this.state.messages.map((m) => {
      if (m.selected === true) {
        m.read = false
        m.selected = false
      }
      return m
    })
    this.setState({
      messages: readMsg
    })

  }

  deleteMessage = () => {
    const toDelete = this.state.messages.filter((m) => m.selected !== true)
  
    this.setState({
      messages: toDelete
    })
  }
  

  addLabel = (label) => {
    const labelMsg = this.state.messages.map((m) => {
      if (m.selected === true) {
        if(!m.labels.includes(label)) {
          m.labels.push(label)
        }
      }
      return m
    })
    this.setState({
      messages: labelMsg
    })
  }

  removeLabel = (label) => {
    const labelMsg = this.state.messages.map((m) => {
      if (m.selected === true) {
        if(m.labels.includes(label)) {
          const idx = m.labels.indexOf(label)
          m.labels.splice(idx, 1)
        }
      }
      return m
    })
      this.setState({
      messages: labelMsg
    })
  }

  getUnreadCount = () => {
    const unReadArray = this.state.messages.filter((m) => { return m.read === false })    
    return unReadArray.length
  }

  

  render() {
    return (
      <div className="container">
        <Toolbar 
          messages={this.state.messages} 
          selectAll={this.selectAll} 
          markReadStatus={this.markReadStatus} 
          markUnReadStatus={this.markUnReadStatus} 
          deleteMessage={this.deleteMessage} 
          addLabel={this.addLabel} 
          removeLabel={this.removeLabel} 
          getUnreadCount={this.getUnreadCount}
          
        />
        <MessageList 
          messages={this.state.messages} 
          selectMessage={this.selectMessage} 
          starMessage={this.starMessage}
        />
      </div>
    );
  }
}

export default App;
