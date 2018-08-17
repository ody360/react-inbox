import React, { Component } from 'react'


class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unread: props.getUnreadCount()
        }
    }

    addNewLabel = (e) => {
        this.props.addLabel(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    removeLabel = (e) => {
        this.props.removeLabel(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    checkMessage = (messages) => {
        const all = messages.every((m) =>  m.selected === true )
        const some = messages.some((m) => m.selected === true)
        
        if (all) return "fa fa-check-square-o"
        else if (some) return "fa fa-minus-square-o"
        else return "fa fa-square-o"
    }

    pluralMessage = () => {
        if(this.props.getUnreadCount() === 1) {
            return 'unread message'
        } else {
            return 'unread messages'
        }
    }

    disableButton = () => {
        const disableBtn = this.props.messages.every(message => message.selected === false)
        return disableBtn ? 'disabled' : ''

    }

   

    

    render() {
      
        
        return (

        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                        <span className="badge badge">{this.props.getUnreadCount()}</span>
                    {this.pluralMessage()}
                </p>

                    <button className="btn btn-default" onClick={this.props.selectAll}>
                        <i onChange={this.onChange} className={this.checkMessage(this.props.messages)}></i>
                </button>

                    <button className="btn btn-default" disabled={this.disableButton()} onClick={this.props.markReadStatus}>
                    Mark As Read
                </button>

                    <button className="btn btn-default" disabled={this.disableButton()} onClick={this.props.markUnReadStatus}>
                    Mark As Unread
                </button>

                    <select className="form-control label-select" disabled={this.disableButton()} onChange={this.addNewLabel}>
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                    <select className="form-control label-select" disabled={this.disableButton()} onChange={this.removeLabel}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                    <button className="btn btn-default" disabled={this.disableButton()} onClick={this.props.deleteMessage}>
                        <i className="fa fa-trash-o" ></i>
                </button>
            </div>
        </div>
     ) }

}

export default Toolbar