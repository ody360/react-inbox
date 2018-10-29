import React, { Component } from 'react';
import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList'
import MessageForm from './components/MessageForm'
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
          "selected":false,
          "labels": [],
          "body": '',
          "toggled": false,
          
          
        }],
        
        composedOn: false,
     


    }

  }

  componentDidMount() {
    this.getMessages()
    this.selectMessage()
  }

  getMessages = async () => {
    const toggled = this.state.messages.filter((m) => m.toggled === true).map((m) => m.id)
    const res = await axios.get('http://localhost:8082/api/messages')
    
    const toggleMessages = res.data.map((m) => {
      if(toggled.includes(m.id)) {
        m.toggled = true
      } else {
        m.toggled = false
      }
      
      return m
    })
    this.setState({
      messages: toggleMessages
    })
  }

  selectMessage = async (id) => {
    let tempState = this.state.messages

    tempState.map((m) => {
      if (m.id === id) m.selected = !m.selected
    })
    console.log('TEMPSTATE IS: ', tempState)
    this.setState(tempState)
   
   
  }
  

  starMessage = async (id) => {
    let msgIds = []
    const resGet = this.state
    resGet.messages.map((m) => {
      if (m.id === id) msgIds.push(m.id)
        return m
      })
     
      const body = {
        "messageIds": msgIds,
        "command": `star`
      }
      const res = await axios.patch('http://localhost:8082/api/messages',body)
      if(res) this.getMessages()
    }



  selectAll = () => {
    const allMessages = this.state.messages.every(message => message.selected === true)

    const highlightedMsgs = this.state.messages.map(message => {
      allMessages ? delete message.selected : message.selected = true
      return message
    });

    this.setState({
      messages: highlightedMsgs
    })
    
  }

  markReadStatus = async () => {
    let msgIds = []
    this.state.messages.map((m) => {
      if (m.selected === true) {
        msgIds.push(m.id)
      }
      return m
    })
    const body = {
      "messageIds": msgIds,
      "command": "read",
      "read" : true
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)
    if (res) this.getMessages()

  }

  markUnReadStatus = async () => {
    let msgIds = []
    this.state.messages.map((m) => {
      if (m.selected === true) {
        msgIds.push(m.id)
      }
      return m
    })
    const body = {
      "messageIds": msgIds,
      "command": "read",
      "read": false
    }

    const res = await axios.patch('http://localhost:8082/api/messages', body)
    if (res) this.getMessages()

  }

  deleteMessage = async () => {
    const msgIds = this.state.messages.filter((m) => m.selected === true).map(x => x.id)
    const body = {

      "messageIds": msgIds,
      "command": "delete"

    } 

    const res = await axios.patch('http://localhost:8082/api/messages', body)

    if (res) this.getMessages()
  }


  postMessage = async (e) => {
    e.preventDefault()

    const msgList = this.state.messages
    const body = {
   
      "subject": e.target.subject.value,
      "body": e.target.body.value,
      "read": false,
      "starred": false,
      "selected": false,
      "labels": [],
      "toggled": false,
    }

  
    const res = await axios.post('http://localhost:8082/api/messages', body)
    this.setState({
      ...this.state,
      "messages": [...msgList, res.data]
      
    })
    this.toggleForm()
  }


  

  addNewLabel = async (e) => {
    const msgIds = this.state.messages.filter((m) => m.selected === true).map(x => x.id)
    const body = {

      "messageIds": msgIds,
      "command": "addLabel",
      "label": e.target.value

    }
    const res = await axios.patch('http://localhost:8082/api/messages', body)
    if (res) this.getMessages()
  }


  removeLabel = async (e) => {
    const msgIds = this.state.messages.filter((m) => m.selected === true).map(x => x.id)
    const body = {

      "messageIds": msgIds,
      "command": "removeLabel",
      "label": e.target.value

    }
    const res = await axios.patch('http://localhost:8082/api/messages', body)
    if (res) this.getMessages()
  }

  getUnreadCount = () => {
    const unReadArray = this.state.messages.filter((m) => { return m.read === false })    
    return unReadArray.length
  }

  toggleForm = () => {
    this.setState({
      composedOn: !this.state.composedOn
    })
  }

  toggleBody = (id) => {
    const toggleMsg = this.state.messages.map((m) => {
      if(m.id === id) {
        m.toggled = !m.toggled
      }
      return m
    })

    this.setState({messages: toggleMsg})
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
          addNewLabel={this.addNewLabel} 
          removeLabel={this.removeLabel} 
          getUnreadCount={this.getUnreadCount}
          toggleForm={this.toggleForm}
          
        />
        {this.state.composedOn && <MessageForm postMessage={this.postMessage}/>}
      <div>
          
      </div>
        <MessageList 
          messages={this.state.messages} 
          selectMessage={this.selectMessage} 
          starMessage={this.starMessage}
          toggleBody={this.toggleBody}
        />
        
      </div>
      
    );
  }
}

export default App;
