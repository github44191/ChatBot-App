import React, { useEffect, useState } from 'react'
import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
import "./App.css";
import Messages from './Components/Messages';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [revResponse, setRevResponse] = useState([]);
  // const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRevResponse(messages.slice().reverse())
  },[messages])

  const handleSend = async () => {
    if (message === "") {
      alert('Please specify the desired input data')
      return
    }
    try {
      console.log(message)
      setIsLoading(true)
      axios.post("http://127.0.0.1:8000/generate-response/",{ content : message })
        .then(response => {
          // Handle the response data
          // setResponse(response.data.response);
          setMessages([...messages, { message: message, response: response.data.response }]);
          setIsLoading(false)
          setMessage('');
        })
        
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
}

  return (
    <div className="chatbot-container">
      <h1>ChatBot</h1>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message ChatBot"
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button" >Generate</button>
      </div>
      {isLoading ? <h3>Generating... </h3> : <div className='mardown-container'>
        {/* <h2>Response</h2>
        <ReactMarkdown>{response}</ReactMarkdown> */}
      </div>}
      {
        revResponse.map(mes => <Messages key={mes._id} mes={mes} />)
      }
    </div>
  );
}

export default App;