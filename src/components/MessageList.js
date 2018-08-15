import React from 'react'
import Message from './Message'

const MessageList = ({ messages, starMessage, selectMessage}) => {
    return (
        messages.map((m) => <Message key={m.id} selectMessage={selectMessage} starMessage={starMessage} {...m}/>)
    )
}

export default MessageList