import React from 'react'
import '../App.css'
import ReactMarkdown from 'react-markdown';

const Messages = ({mes}) => {
  const {message,response} = mes;
  return (
    <div>
      <p className='message-txt markdown-container'>{message}</p>
      {response && <div className='markdown-container'>
      <h2>Response</h2>
      <ReactMarkdown>{response}</ReactMarkdown>
      </div>}
    </div>
  )
}

export default Messages