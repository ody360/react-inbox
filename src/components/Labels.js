import React from 'react'

const Labels = ({labels}) => {
    let setLabel = []
    labels.forEach((element,i) => {
        setLabel.push(<span key={i} className="label label-warning">{element}</span>)
    })
    return (setLabel)
}

export default Labels