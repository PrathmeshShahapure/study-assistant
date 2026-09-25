import React from 'react'
import { useLocation } from 'react-router-dom'
const Quiz = () => {
    const location = useLocation();
    const topicContent = location.state?.topicContent;
  return (
      <div>
        Quiz
        <p>{topicContent}</p>
    </div>
  )
}

export default Quiz