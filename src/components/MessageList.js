import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, selectMessage, messageBody, toggleBody}) => {
    return (
        messages.map((m) => <Message key={m.id} selectMessage={selectMessage} starMessage={starMessage} messageBody={messageBody} toggleBody={toggleBody} {...m}/>)
    )
}

export default MessageList