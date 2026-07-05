import './ChatBubble.css'

function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}>
      <p className="chat-bubble__text">{message.content}</p>
    </div>
  )
}

export default ChatBubble
