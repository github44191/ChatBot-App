import React from 'react'
// import ReactMarkdown from 'react-markdown';
import "./App.css";
import Main from './Components/Main/Main';
import History from './Components/Sidebar/History';


function App() {
  return (
    <div className="app-container">
      <History />
      <Main />
    </div>
  )
}

export default App;