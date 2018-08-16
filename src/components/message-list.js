import React from 'react';
import Message from './message.js'
import Body from './Body.js'

const MessageList = ({ messages, starChange, select, readMessage, selected }) => {
  const allMessages = messages.map((mess, i) => {
    return (<div key={mess.id}>
              <Message key={i} message={mess} starChange={starChange} select={select} readMessage={readMessage}/>
              {mess.id === selected ? <Body key={mess.id} message={mess} selected={selected} /> : ''}
            </div>)
  })
  return (
    allMessages
  )
}

export default MessageList
