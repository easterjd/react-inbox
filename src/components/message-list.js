import React from 'react';
import Message from './message.js'

const MessageList = ({ messages, starChange, select, readMessage }) => {
  const allMessages = messages.map(mess => {
    return (<Message key={mess.id} message={mess} starChange={starChange} select={select} readMessage={readMessage}/>)
  })
  return (
    allMessages
  )
}

export default MessageList
