import React from 'react'
import Labels from './Labels'
const Message = ({id, subject, read, starred, labels, selected, starMessage, selectMessage}) => {
    const isRead = read ? 'read' : 'unread'
    const isStarred = starred ? 'fa-star': 'fa-star-o'
    const isSelected = selected ? 'selected' : ''
    const isChecked = selected ? 'checked' : ''

    return(
            <div className={`row message ${isRead} ${isSelected}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                        <input onClick={() => selectMessage(id)} type="checkbox" onChange={() => (id)} checked={`${isChecked}`} />
                        </div>
                        <div className="col-xs-2">
                        <i onClick={() => starMessage(id,"star")} className={`star fa ${isStarred}`}></i>
                        </div>
                    </div>
                </div>
                <Labels labels={labels} />
                <div className="col-xs-11">
                    <a href="">
                        {subject}
                    </a>
                </div>
            </div>
        )

}



export default Message