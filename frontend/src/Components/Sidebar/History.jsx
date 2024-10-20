import React, { useCallback, useEffect, useState } from 'react'
import './History.css'
import HistoryContent from './HistoryContent/HistoryContent';
import axios from 'axios';

const History = () => {
  const [historyContent, setHistoryContent] = useState([]);

  const getHistory = useCallback(() => {
    axios.get("http://localhost:8000/histories/")
    .then(res => {
      // console.log(res.data);
      setHistoryContent(res.data.reverse());
    })
  },[]) 
  useEffect(() => {
    getHistory();
  },[getHistory]);
  return (
    <div className='history-container'>
      <div className='hist'>History</div>
      <div className="history-content">
      {
        historyContent?.map(content => <HistoryContent key={content._id} content={content} />)
      }
      </div>
    </div>
  )
}

export default History;
