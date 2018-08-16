import React, { Component } from 'react';

class Toolbar extends Component {

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

  checkSelect = (props) => {
    const all = props.messages.every(mess => !mess.selected) ? 'disabled' : ''
    return all
  }

  render () {
    return (<div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{this.checkRead(this.props)}</span>
          unread messages
        </p>

        <a onClick={this.props.toggleCompose} className="btn btn-danger">
          <i className="fa fa-plus"></i>
        </a>

        <button onClick={this.props.selectAll} className="btn btn-default">
          <i className={`fa ${this.checkIcon(this.props)}`}></i>
        </button>

        <button onClick={this.props.readBatch} className="btn btn-default" disabled={this.checkSelect(this.props)}>
          Mark As Read
        </button>

        <button onClick={this.props.unReadBatch} className="btn btn-default" disabled={this.checkSelect(this.props)}>
          Mark As Unread
        </button>

        <select onChange={(e) => this.props.applyLabel(e)} className="form-control label-select" disabled={this.checkSelect(this.props)}>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select onChange={(e) => this.props.removeLabel(e)} className="form-control label-select" disabled={this.checkSelect(this.props)}>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button onClick={this.props.deleteMessage} className="btn btn-default" disabled={this.checkSelect(this.props)}>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>)
  }
}

export default Toolbar
