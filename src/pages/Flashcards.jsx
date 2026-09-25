import React from 'react'
import { useLocation } from 'react-router-dom'
const Flashcards = () => {
    const location = useLocation();
    const topicContent = location.state?.topicContent;
  return (
      <div>F
          <p>{ topicContent}</p>
    </div>
  )
}

export default Flashcards