import React, { Component } from 'react'

class Compose extends Component {
    constructor (props) {
        super(props)
        this.state = {
            subject: null,
            body: null
        }
    }

onChange (e) {
    this.setState({
        [e.target.name]: e.target.value
    })
}

onSubmit = (e) => {
    e.preventDefault()
    this.props.send({subject: this.state.subject, body: this.state.body})
}

    render() {
        return (
            <form className="form-horizontal well">
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label for="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input onChange={(e) => this.onChange(e)} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea onChange={(e) => this.onChange(e)} name="body" id="body" className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input onClick={this.onSubmit} type="submit" value="Send" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        )
    }
}

export default Compose