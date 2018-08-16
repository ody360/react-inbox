import React, { Component } from 'react'


class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectionStatus : ''
        }

        
    }

    onClick = (e) => {
        // Cycle button to select all or none
        this.props.cycleSelection()
        

    }

    onChange = (e) => {
        console.log('E',e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    


   // const msgSelectStatus = ''
    render() {
   //     const isSelected = (this.props.toolbar.selectionStatus === 'selectAll') ? 'check-' : ''
        
        return (

        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">2</span>
                    unread messages
                </p>

                <button className="btn btn-default">
                        <i onChange={this.onChange} onClick={this.onClick} className={`fa fa-square-o`}></i>
                </button>

                <button className="btn btn-default">
                    Mark As Read
                </button>

                <button className="btn btn-default">
                    Mark As Unread
                </button>

                <select className="form-control label-select">
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select">
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default">
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
     ) }

}

export default Toolbar