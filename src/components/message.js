import React from 'react';

const Message = ({message, starChange, select, readMessage}) => {
  const status = message.read ? 'read' : 'unread'
  const selected = message.selected ? 'selected' : ''
  const star = message.starred ? 'fa-star' : 'fa-star-o'
  return (
    <div key={message.id} className={`row message ${status} ${selected}`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onChange={() => select(message.id)} type="checkbox" checked={message.selected ? 'checked' : ''}/>
          </div>
          <div className="col-xs-2">
            <i onClick={() => starChange(message.id)} className={`star fa ${star}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11" onClick={() => readMessage(message.id)}>
        {message.labels.map((label, i) => {
          return (<span key={i} className="label label-warning">{label}</span>)
        })}
        <a onClick={(e) => e.preventDefault()} href="">
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message
