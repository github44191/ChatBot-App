import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Avatar from '@mui/material/Avatar'
import Messages from '../Messages';
import './Main.css'

const Main = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [revResponse, setRevResponse] = useState([]);
  // const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRevResponse(() => messages.slice().reverse());
    // console.log(revResponse);
  },[messages])

  const saveUserData = async () => {
    try {
      // eslint-disable-next-line
      if(revResponse == 0) return
      await axios.post('http://127.0.0.1:8000/addHistory', {responseHistory: revResponse});
    } catch (error) {
      console.error('Error saving user data', error);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Optionally show a confirmation dialog
      event.preventDefault();
      // Trigger the save function
      saveUserData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    // eslint-disable-next-line
  }, [revResponse]);

  const handleSend = async () => {
    if (message === "") {
      alert('Please specify the desired input data')
      return
    }
    try {
      console.log(message)
      setIsLoading(true)
      axios.post("http://127.0.0.1:8000/generate-response/",{ content : message})
        .then(response => {
          // Handle the response data
          // setResponse(response.data.response);
          setMessages([...messages, { message: message, response: response.data.response }]);
          setIsLoading(false)
          setMessage('');
          // console.log(revResponse)
        })
        
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }

}

  return (
    <div className="chatbot-container">
      <div className='header-container'>
        <h1>ChatBot</h1>
        <Avatar className='profile-icon' />
      </div>
      {isLoading ? <div className='load-style'>Generating... </div> :
      <div className='mardown-container'>
      </div>}
      {
        revResponse.map(mes => <Messages key={mes._id} mes={mes} />)
      }
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
    </div>
  );
}

export default Main;