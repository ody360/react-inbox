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
          "body": ''
        }],
        composedOn: false,
        showBody: false


    }

  }

  componentDidMount() {
    this.getMessages()
    this.selectMessage()
  }

  getMessages = async () => {
    const res = await axios.get('http://localhost:8082/api/messages')
    this.setState({
      messages: res.data
    })
  }

  selectMessage = async (id) => {
    let msgIds = []
    const resGet = await axios.get('http://localhost:8082/api/messages')
    resGet.data.map((m) => {
      if (m.id === id) msgIds.push(m.id)
      return m
    })

    const body = {
      "messageIds": msgIds,
      "command": `selected`
    }
    const res = await axios.patch('http://localhost:8082/api/messages', body)
    this.setState({
      messages: res.data
    })
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
      this.setState({
        messages: res.data
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
    console.log('RES',res)
    this.setState({
      messages: res.data
    })

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
    console.log('RES', res)
    this.setState({
      messages: res.data
    })

  }

  deleteMessage = async () => {
    const msgIds = this.state.messages.filter((m) => m.selected === true).map(x => x.id)
    console.log('DEL:', msgIds)
    const body = {

      "messageIds": msgIds,
      "command": "delete"

    } 
    console.log(body)
    const res = await axios.patch('http://localhost:8082/api/messages', body)
    console.log('RESPONSE IS:' , res)
    this.setState({
      messages: res.data
    })
  }

  messageForm = () => {

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
      "labels": []
    }

    
  //  console.log ('TRYING TO POST:', [...msgList, newMsg])
  
    const res = await axios.post('http://localhost:8082/api/messages', body)
    this.setState({
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
    this.setState({
      "messages": res.data
    })
  }


  removeLabel = async (e) => {
    const msgIds = this.state.messages.filter((m) => m.selected === true).map(x => x.id)
    const body = {

      "messageIds": msgIds,
      "command": "removeLabel",
      "label": e.target.value

    }
    const res = await axios.patch('http://localhost:8082/api/messages', body)
    this.setState({
      "messages": res.data
    })
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
    this.messageBody(id)
    this.setState({
      showBody: !this.state.showBody
      
    })
  }

  messageBody = (id) => {
    const resGet = this.state.messages
    resGet.messages.map((m) => {
      return m
    })
    return (
      <div className="row message-body">
        <div className="col-xs-11 col-xs-offset-1">
          {this.state.body}
        </div>
      </div>
    )
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
          messageBody={this.MessageBody}
          toggleBody={this.toggleBody}
        />
      </div>
      
    );
  }
}

export default App;
