import React from 'react'
import Message from './Message'
import Body from './Body'

const MessageList = ({ messages, body, starMessage, selectMessage, toggleBody}) => {
    const displayMessages = messages.map((m) => {
        return (<div key={m.id}>
            <Message key={m.id+m.title} selectMessage={selectMessage} body={body} starMessage={starMessage} toggleBody={toggleBody} {...m}/>
            {m.toggled ? <Body key={m.id+m.body} body={m.body} /> : null}
                    
            </div>)
    })
    return displayMessages
}

export default MessageList