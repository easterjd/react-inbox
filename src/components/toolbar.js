import React, { Component } from 'react';

class Toolbar extends Component {
  // constructor (props) {
  //   super(props)
  // }

  checkRead = (props) => {
    const unread = props.messages.reduce((acc, mess) => {
      if (mess.read === false) {
        acc++
      }
      return acc
    }, 0)
    return unread
  }

  checkIcon = (props) => {
    const allMess = props.messages.every(mess => {
      return mess.selected === true
    })
    const someMess = props.messages.some(mess => {
      return mess.selected === true
    })
    if (allMess) return 'fa-check-square-o'
    else if (someMess) return 'fa-minus-square-o'
    else return 'fa-square-o'
  }

  render () {
    return (<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{this.checkRead(this.props)}</span>
          unread messages
        </p>

        <button onClick={this.props.selectAll} className="btn btn-default">
          <i className={`fa ${this.checkIcon(this.props)}`}></i>
        </button>

        <button onClick={this.props.readBatch} className="btn btn-default">
          Mark As Read
        </button>

        <button onClick={this.props.unReadBatch} className="btn btn-default">
          Mark As Unread
        </button>

        <select onChange={(e) => this.props.applyLabel(e)} className="form-control label-select">
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={(e) => this.props.removeLabel(e)} className="form-control label-select">
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button onClick={this.props.deleteMessage} className="btn btn-default">
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}

export default Toolbar
