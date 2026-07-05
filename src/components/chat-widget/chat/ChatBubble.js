import './ChatBubble.css'

const URL_REGEX = /(https?:\/\/[^\s]+)/g

function renderWithLinks(text) {
  const parts = text.split(URL_REGEX)

  return parts.map((part, index) => {
    if (URL_REGEX.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-bubble__link"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

function ChatBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : 'chat-bubble--assistant'}`}>
      <p className="chat-bubble__text">{renderWithLinks(message.content)}</p>
    </div>
  )
}

export default ChatBubble
