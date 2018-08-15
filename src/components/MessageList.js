import React from 'react'
import Message from './Message'

const MessageList = ({messages}) => {
    return (
        messages.map((m) => <Message key={m.id} {...m}/>)
    )
}

export default MessageList