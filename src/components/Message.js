import React from 'react'

const Message = ({id, subject, read, starred, labels}) => {
    const isRead = read ? 'read' : 'unread'
    const isStarred = starred ? 'fa-star': 'fa-star-o'

    return(
            <div className={`row message ${isRead}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" />
                        </div>
                        <div className="col-xs-2">
                        <i className={`star fa ${isStarred}`}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    <a href="#">
                        {subject}
                    </a>
                </div>
            </div>
        )

}



export default Message