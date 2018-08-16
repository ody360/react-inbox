import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'

class App extends Component {
  constructor() {
    super()

    this.state = {
      messages:
      [ 
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
      toolbar: [{ 
                  id: 1, 
                  selectAll: false
              }]
    }
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

  cycleSelection = (id) => {
    const allMessages = Array.from(this.state.messages)
    const allStatus = Array.from(this.state.toolbar)
    console.log(allStatus)

    if(this.state.toolbar[0].selectAll === false) {
      allMessages.forEach((m) => m.selected = true)
      allStatus.forEach((s) => s.selectAll = true)

      console.log('ALLSTATUS:' ,allStatus)
      this.setState({messages: allMessages})
      this.setState({toolbar: allStatus})
    } else {
      allMessages.forEach((m) => m.selected = false)
      allStatus.forEach((s) => s.selectAll = false)
      this.setState({messages: allMessages})
      this.setState({ toolbar: allStatus })
    }
  }



  render() {
    return (
      <div className="container">
        <Toolbar cycleSelection={this.cycleSelection} />
        <MessageList messages={this.state.messages} selectMessage={this.selectMessage} starMessage={this.starMessage}/>
      </div>
    );
  }
}

export default App;
