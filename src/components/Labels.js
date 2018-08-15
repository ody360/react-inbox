import React from 'react'

const Labels = ({labels}) => {
    let setLabel = []
    labels.forEach(element => {
        setLabel.push(<span class="label label-warning">{element}</span>)
    })
    return (setLabel)
}

export default Labels