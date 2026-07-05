import { DEALERSHIP } from '../../../constants/config'
import jessicaAvatar from '../../../assets/jessica-avatar.png'
import './FloatingButton.css'

function FloatingButton({ onClick }) {
  return (
    <button
      type="button"
      className="floating-button"
      onClick={onClick}
      aria-label={`Open chat with ${DEALERSHIP.agentName}`}
    >
      <img src={jessicaAvatar} alt={DEALERSHIP.agentName} className="floating-button__avatar" />
      <span className="floating-button__label">
        <span className="floating-button__title">Speak with me</span>
        <span className="floating-button__subtitle">
          {DEALERSHIP.agentName} · AI Agent
        </span>
      </span>
    </button>
  )
}

export default FloatingButton
