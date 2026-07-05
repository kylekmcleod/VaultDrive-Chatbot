import { useState, useRef } from 'react'
import { WIDGET_VIEWS } from '../../constants/config'
import FloatingButton from './launcher/FloatingButton'
import LandingScreen from './landing/LandingScreen'
import ChatScreen from './chat/ChatScreen'
import './ChatWidget.css'

const CLOSE_ANIMATION_MS = 280

function ChatWidget() {
  const [view, setView] = useState(WIDGET_VIEWS.CLOSED)
  const [isClosing, setIsClosing] = useState(false)
  const initialMessageRef = useRef(null)

  const isOpen = view !== WIDGET_VIEWS.CLOSED

  const openWidget = () => {
    setIsClosing(false)
    setView(WIDGET_VIEWS.LANDING)
  }

  const goToChat = (message) => {
    initialMessageRef.current = message || null
    setView(WIDGET_VIEWS.CHAT)
  }

  const closeWidget = () => {
    setIsClosing(true)
    window.setTimeout(() => {
      setView(WIDGET_VIEWS.CLOSED)
      setIsClosing(false)
      initialMessageRef.current = null
    }, CLOSE_ANIMATION_MS)
  }

  return (
    <div className="chat-widget">
      {!isOpen && (
        <FloatingButton onClick={openWidget} />
      )}

      {view === WIDGET_VIEWS.LANDING && (
        <LandingScreen
          onClose={closeWidget}
          onStartChat={goToChat}
          isClosing={isClosing}
        />
      )}

      {view === WIDGET_VIEWS.CHAT && (
        <ChatScreen
          onClose={closeWidget}
          isClosing={isClosing}
          initialMessage={initialMessageRef.current}
        />
      )}
    </div>
  )
}

export default ChatWidget
