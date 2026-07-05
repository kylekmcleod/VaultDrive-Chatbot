import { useEffect, useRef } from 'react'
import ChatBubble from './ChatBubble'
import TypingIndicator from './TypingIndicator'
import './MessageList.css'

function MessageList({ messages, isLoading }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="message-list">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
