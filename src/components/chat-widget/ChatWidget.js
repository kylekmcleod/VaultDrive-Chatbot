import { useState } from 'react'
import { WIDGET_VIEWS } from '../../constants/config'
import FloatingButton from './launcher/FloatingButton'
import LandingScreen from './landing/LandingScreen'
import './ChatWidget.css'

const CLOSE_ANIMATION_MS = 280

function ChatWidget() {
  const [view, setView] = useState(WIDGET_VIEWS.CLOSED)
  const [isClosing, setIsClosing] = useState(false)

  const isOpen = view === WIDGET_VIEWS.LANDING

  const openWidget = () => {
    setIsClosing(false)
    setView(WIDGET_VIEWS.LANDING)
  }

  const closeWidget = () => {
    setIsClosing(true)
    window.setTimeout(() => {
      setView(WIDGET_VIEWS.CLOSED)
      setIsClosing(false)
    }, CLOSE_ANIMATION_MS)
  }

  return (
    <div className="chat-widget">
      {!isOpen && (
        <FloatingButton onClick={openWidget} />
      )}

      {isOpen && (
        <LandingScreen onClose={closeWidget} isClosing={isClosing} />
      )}
    </div>
  )
}

export default ChatWidget
