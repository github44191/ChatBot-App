import React from 'react'
import './HistoryContent.css'

const HistoryContent = (data) => {
  // console.log(data.content.chatHistory[0].message)
  const handleContentRender = () => {
    
  }
  return (
    <>
      <p className='content-title' onClick={() => handleContentRender()}>{data?.content?.chatHistory[0]?.message}</p> 
    </> 
  )
}

export default HistoryContent